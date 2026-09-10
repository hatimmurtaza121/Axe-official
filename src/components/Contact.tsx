'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { emailPattern, isValidPhone, type ContactIntent } from '@/lib/contact'
import { volumeOptions } from '@/lib/site'
import { Arrow } from './Arrow'

type FieldName = 'name' | 'email' | 'phone' | 'company' | 'bottleneck'

function VolumeSelect() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<(typeof volumeOptions)[number]>('Not sure yet')
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  const choose = (option: (typeof volumeOptions)[number]) => {
    setValue(option)
    setOpen(false)
  }

  return (
    <div
      ref={selectRef}
      className={`custom-select ${open ? 'is-open' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false)
          selectRef.current?.querySelector('button')?.focus()
        }
      }}
    >
      <input type="hidden" name="volume" value={value} />
      <button
        className="custom-select__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Approximate monthly volume: ${value}`}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{value}</span><i aria-hidden="true" />
      </button>
      {open && (
        <div className="custom-select__menu" role="listbox" aria-labelledby="volume-label">
          {volumeOptions.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                choose(option)
              }}
            >
              {option}
            </button>
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

  const clearError = (field: FieldName) => {
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
        ? 'Request sent. We’ll reply with a calendar link.'
        : 'Brief sent. We’ll review it and get back to you.')
      form.reset()
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
            <span id="volume-label">Approximate monthly volume</span>
            <VolumeSelect />
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
          {statusMessage && (
            <p className={`brief-form__status ${status === 'error' ? 'is-error' : ''}`} role="status">
              {statusMessage}
            </p>
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
