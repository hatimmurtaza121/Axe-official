'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { emailPattern, isValidPhone, type ContactIntent } from '@/lib/contact'
import { volumeOptions } from '@/lib/site'
import { Arrow } from './Arrow'

type FieldName = 'name' | 'email' | 'phone' | 'company' | 'bottleneck'

type VolumeOption = (typeof volumeOptions)[number]

function VolumeSelect({ value, onChange }: { value: VolumeOption; onChange: (value: VolumeOption) => void }) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => volumeOptions.indexOf(value))
  const selectRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const openMenu = (index = volumeOptions.indexOf(value)) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const choose = (option: VolumeOption) => {
    onChange(option)
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      ref={selectRef}
      className={`custom-select ${open ? 'is-open' : ''}`}
      onKeyDown={(event) => {
        const currentIndex = activeIndex < 0 ? 0 : activeIndex
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault()
          if (!open) {
            openMenu(event.key === 'ArrowDown' ? volumeOptions.indexOf(value) : volumeOptions.length - 1)
            return
          }
          const direction = event.key === 'ArrowDown' ? 1 : -1
          setActiveIndex((currentIndex + direction + volumeOptions.length) % volumeOptions.length)
        } else if (event.key === 'Home' || event.key === 'End') {
          if (!open) return
          event.preventDefault()
          setActiveIndex(event.key === 'Home' ? 0 : volumeOptions.length - 1)
        } else if ((event.key === 'Enter' || event.key === ' ') && open) {
          event.preventDefault()
          choose(volumeOptions[currentIndex])
        } else if (event.key === 'Escape' && open) {
          event.preventDefault()
          setOpen(false)
          triggerRef.current?.focus()
        } else if (event.key === 'Tab') {
          setOpen(false)
        }
      }}
    >
      <input type="hidden" name="volume" value={value} />
      <button
        ref={triggerRef}
        className="custom-select__trigger"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="volume-options"
        aria-labelledby="volume-label volume-value"
        aria-activedescendant={open ? `volume-option-${activeIndex}` : undefined}
        onClick={() => {
          if (open) setOpen(false)
          else openMenu()
        }}
      >
        <span id="volume-value">{value}</span><i aria-hidden="true" />
      </button>
      {open && (
        <div id="volume-options" className="custom-select__menu" role="listbox" aria-labelledby="volume-label">
          {volumeOptions.map((option, index) => (
            <div
              key={option}
              id={`volume-option-${index}`}
              role="option"
              aria-selected={value === option}
              className={activeIndex === index ? 'is-active' : ''}
              onPointerMove={() => setActiveIndex(index)}
              onPointerDown={(event) => {
                event.preventDefault()
                choose(option)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Contact() {
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [volume, setVolume] = useState<VolumeOption>('Not sure yet')

  const clearError = (field: FieldName) => {
    if (status !== 'sending' && status !== 'idle') {
      setStatus('idle')
      setStatusMessage('')
    }
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const validate = (data: FormData, intent: ContactIntent) => {
    const nextErrors: Partial<Record<FieldName, string>> = {}
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()

    if (!String(data.get('name') ?? '').trim()) nextErrors.name = 'Please enter your name.'
    if (!email) nextErrors.email = 'Please enter your work email.'
    else if (!emailPattern.test(email)) nextErrors.email = 'Please enter a valid email address.'
    if (phone && !isValidPhone(phone)) nextErrors.phone = 'Please enter a valid phone number.'
    if (!String(data.get('company') ?? '').trim()) nextErrors.company = 'Please enter your company name.'
    if (intent === 'brief' && !String(data.get('bottleneck') ?? '').trim()) {
      nextErrors.bottleneck = 'Tell us briefly which workflow you want to improve.'
    }

    return nextErrors
  }

  const sendBrief = async (form: HTMLFormElement, intent: ContactIntent) => {
    const data = new FormData(form)
    const nextErrors = validate(data, intent)
    const firstError = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstError) {
      setStatus('idle')
      setErrors(nextErrors)
      const field = form.elements.namedItem(firstError)
      if (field instanceof HTMLElement) field.focus()
      return
    }

    setErrors({})
    setStatus('sending')
    setStatusMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          company: data.get('company'),
          volume: data.get('volume'),
          bottleneck: data.get('bottleneck'),
          website: data.get('website'),
          intent,
        }),
      })
      const result = await response.json().catch(() => ({})) as { error?: string }

      if (!response.ok) {
        setStatus('error')
        setStatusMessage(result.error || 'We could not send the brief. Please try again.')
        return
      }

      setStatus('sent')
      setStatusMessage(intent === 'calendar'
        ? 'We’ll send a scheduling link to your work email so you can choose a suitable time.'
        : 'Your brief is safely with Axe Official. We’ll review the workflow and reply with the clearest next step.')
      form.reset()
      setVolume('Not sure yet')
    } catch {
      setStatus('error')
      setStatusMessage('We could not send the brief. Please try again.')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void sendBrief(event.currentTarget, 'brief')
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact__glow" />
      <div className="wrap contact__grid">
        <div className="contact__content reveal">
          <p className="section-label">YOUR NEXT BOTTLENECK</p>
          <h2>Show us the work<br />your team <em>hates doing.</em></h2>
          <p>We’ll help identify the first workflow worth automating—based on time saved, risk removed, and value created.</p>
          <div className="contact__promise">
            <span>01</span><p>We review the workflow and volume</p>
            <span>02</span><p>A short call clarifies constraints and value</p>
            <span>03</span><p>You receive a free workflow opportunity map</p>
          </div>
        </div>
        <form className="brief-form reveal" onSubmit={handleSubmit} noValidate>
          <div className="field-row">
            <label>Name
              <input name="name" autoComplete="name" placeholder="Jordan Hale" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} onInput={() => clearError('name')} />
              {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
            </label>
            <label>Work email
              <input name="email" type="email" autoComplete="email" placeholder="jordan@company.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} onInput={() => clearError('email')} />
              {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
            </label>
          </div>
          <div className="field-row">
            <label>Company
              <input name="company" autoComplete="organization" placeholder="Northstar Logistics" required aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? 'company-error' : undefined} onInput={() => clearError('company')} />
              {errors.company && <span className="field-error" id="company-error">{errors.company}</span>}
            </label>
            <label>Phone <span className="field-optional">optional</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+1 415 555 0132"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                onInput={() => clearError('phone')}
              />
              {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
            </label>
          </div>
          <div className="field">
            <span id="volume-label">Workflow volume per month</span>
            <span className="field-help" id="volume-help">Estimated runs, records, or items handled each month.</span>
            <VolumeSelect value={volume} onChange={(nextVolume) => {
              setVolume(nextVolume)
              if (status !== 'sending' && status !== 'idle') {
                setStatus('idle')
                setStatusMessage('')
              }
            }} />
          </div>
          <label>Describe the workflow
            <textarea
              name="bottleneck"
              rows={1}
              placeholder="What happens today, and where does it slow down?"
              required
              aria-invalid={Boolean(errors.bottleneck)}
              aria-describedby={errors.bottleneck ? 'bottleneck-error' : undefined}
              onInput={(event) => {
                clearError('bottleneck')
                const field = event.currentTarget
                const lineHeight = Number.parseFloat(getComputedStyle(field).lineHeight)
                const maxHeight = (lineHeight * 4) + 24
                field.style.height = 'auto'
                field.style.height = `${Math.min(field.scrollHeight, maxHeight)}px`
                field.style.overflowY = field.scrollHeight > maxHeight ? 'auto' : 'hidden'
              }}
            />
            {errors.bottleneck && <span className="field-error" id="bottleneck-error">{errors.bottleneck}</span>}
          </label>
          <input className="honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="button button--lime" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending brief' : 'Prepare project brief'} <Arrow />
          </button>
          {status === 'sent' && statusMessage && (
            <div className="brief-form__success" role="status" aria-live="polite">
              <span className="brief-form__success-icon" aria-hidden="true">✓</span>
              <div>
                <strong>{statusMessage.startsWith('We’ll send') ? 'Calendar request received' : 'Project brief received'}</strong>
                <p>{statusMessage}</p>
              </div>
            </div>
          )}
          {status === 'error' && statusMessage && (
            <p className="brief-form__status is-error" role="alert">{statusMessage}</p>
          )}
          <p className="brief-form__note">Your brief is sent to Axe Official. Nothing is used for ads or tracking.</p>
          <button
            className="brief-form__calendar"
            type="button"
            disabled={status === 'sending'}
            onClick={(event) => {
              const form = event.currentTarget.form
              if (form) void sendBrief(form, 'calendar')
            }}
          >
            Prefer to choose a time? Request the calendar link <Arrow diagonal />
          </button>
        </form>
      </div>
    </section>
  )
}
