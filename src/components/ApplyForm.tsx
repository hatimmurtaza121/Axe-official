'use client'

import { FormEvent, Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { cvAccept, cvMaxBytes, emailPattern } from '@/lib/contact'
import { jobs, site } from '@/lib/site'
import { Arrow } from './Arrow'

const roleOptions = ['General / other', ...jobs.map((job) => job.title)] as const
type FieldName = 'name' | 'email' | 'role' | 'note' | 'portfolio' | 'cv'

function publicStatusMessage(status: number, error?: string) {
  if (status === 503) {
    return `We could not send the application just now. Email ${site.careersEmail} and we’ll pick it up.`
  }
  if (error && !/configured|worker|secret/i.test(error)) return error
  return 'We could not send the application. Please try again.'
}

function ApplyFormFields() {
  const searchParams = useSearchParams()
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [role, setRole] = useState<(typeof roleOptions)[number]>('General / other')
  const [cvName, setCvName] = useState('')
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const requested = searchParams.get('role')
    if (requested && roleOptions.includes(requested as (typeof roleOptions)[number])) {
      setRole(requested as (typeof roleOptions)[number])
    }
  }, [searchParams])

  useEffect(() => {
    if (status === 'sent' || status === 'error') statusRef.current?.focus()
  }, [status, statusMessage])

  const clearError = (field: FieldName) => {
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const sendApplication = async (form: HTMLFormElement) => {
    const data = new FormData(form)
    const nextErrors: Partial<Record<FieldName, string>> = {}
    const email = String(data.get('email') ?? '').trim()
    const portfolio = String(data.get('portfolio') ?? '').trim()
    const selectedRole = String(data.get('role') ?? '').trim()
    const cv = data.get('cv')

    if (!String(data.get('name') ?? '').trim()) nextErrors.name = 'Please enter your name.'
    if (!email) nextErrors.email = 'Please enter your email.'
    else if (!emailPattern.test(email)) nextErrors.email = 'Please enter a valid email address.'
    if (!selectedRole || !roleOptions.includes(selectedRole as (typeof roleOptions)[number])) {
      nextErrors.role = 'Please choose a role.'
    }
    if (portfolio && !/^https?:\/\/\S+$/i.test(portfolio)) {
      nextErrors.portfolio = 'Please enter a full URL, starting with https://'
    }
    if (!(cv instanceof File) || cv.size === 0) nextErrors.cv = 'Please attach a CV or resume.'
    else if (cv.size > cvMaxBytes) nextErrors.cv = 'Please keep the file under 3 MB.'
    else if (!/\.(pdf|doc|docx)$/i.test(cv.name)) nextErrors.cv = 'Please attach a PDF or Word document.'
    if (!String(data.get('note') ?? '').trim()) nextErrors.note = 'Tell us briefly why this role fits.'

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
      const payload = new FormData()
      payload.set('name', String(data.get('name') ?? ''))
      payload.set('email', String(data.get('email') ?? ''))
      payload.set('role', selectedRole)
      payload.set('portfolio', portfolio)
      payload.set('bottleneck', String(data.get('note') ?? ''))
      payload.set('website', String(data.get('website') ?? ''))
      payload.set('intent', 'application')
      if (cv instanceof File) payload.set('cv', cv)

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      })
      const result = await response.json().catch(() => ({})) as { error?: string }

      if (!response.ok) {
        setStatus('error')
        setStatusMessage(publicStatusMessage(response.status, result.error))
        return
      }

      setStatus('sent')
      setStatusMessage('We’ll read it and reply if there’s a fit.')
      form.reset()
      setRole('General / other')
      setCvName('')
    } catch {
      setStatus('error')
      setStatusMessage('We could not send the application. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="brief-form">
        <div className="brief-form__confirm" ref={statusRef} role="status" tabIndex={-1}>
          <p className="section-label">RECEIVED</p>
          <h3>Application sent</h3>
          <p>{statusMessage}</p>
          <button
            className="button button--lime"
            type="button"
            onClick={() => {
              setStatus('idle')
              setStatusMessage('')
              setCvName('')
            }}
          >
            Apply for another role <Arrow />
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="brief-form"
      noValidate
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        void sendApplication(event.currentTarget)
      }}
    >
      <div className="field-row">
        <label>Name
          <input name="name" autoComplete="name" placeholder="Alex Rivera" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'apply-name-error' : undefined} onInput={() => clearError('name')} />
          {errors.name && <span className="field-error" id="apply-name-error">{errors.name}</span>}
        </label>
        <label>Email
          <input name="email" type="email" autoComplete="email" placeholder="alex@email.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'apply-email-error' : undefined} onInput={() => clearError('email')} />
          {errors.email && <span className="field-error" id="apply-email-error">{errors.email}</span>}
        </label>
      </div>
      <div className="field-row">
        <label>Role
          <select
            name="role"
            value={role}
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? 'apply-role-error' : undefined}
            onChange={(event) => {
              setRole(event.target.value as (typeof roleOptions)[number])
              clearError('role')
            }}
          >
            {roleOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.role && <span className="field-error" id="apply-role-error">{errors.role}</span>}
        </label>
        <label>Portfolio or LinkedIn <span className="field-optional">optional</span>
          <input
            name="portfolio"
            type="url"
            inputMode="url"
            placeholder="https://"
            aria-invalid={Boolean(errors.portfolio)}
            aria-describedby={errors.portfolio ? 'apply-portfolio-error' : undefined}
            onInput={() => clearError('portfolio')}
          />
          {errors.portfolio && <span className="field-error" id="apply-portfolio-error">{errors.portfolio}</span>}
        </label>
      </div>
      <label className="file-field">CV or resume
        <input
          className="file-field__input"
          name="cv"
          type="file"
          accept={cvAccept}
          required
          aria-invalid={Boolean(errors.cv)}
          aria-describedby={errors.cv ? 'apply-cv-error' : undefined}
          onChange={(event) => {
            const file = event.target.files?.[0]
            setCvName(file?.name ?? '')
            clearError('cv')
          }}
        />
        <span className="file-field__ui">
          <span className={`file-field__name${cvName ? ' is-chosen' : ''}`}>
            {cvName || 'PDF or Word, up to 3 MB'}
          </span>
          <span className="file-field__action">{cvName ? 'Replace' : 'Choose file'}</span>
        </span>
        {errors.cv && <span className="field-error" id="apply-cv-error">{errors.cv}</span>}
      </label>
      <label>Why this role
        <textarea
          name="note"
          rows={3}
          placeholder="A short note on the work you’ve done and why this role fits."
          required
          aria-invalid={Boolean(errors.note)}
          aria-describedby={errors.note ? 'apply-note-error' : undefined}
          onInput={() => clearError('note')}
        />
        {errors.note && <span className="field-error" id="apply-note-error">{errors.note}</span>}
      </label>
      <input className="honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === 'error' && statusMessage && (
        <div ref={statusRef} className="brief-form__banner is-error" role="status" tabIndex={-1}>
          <strong>Could not send</strong>
          <p>{statusMessage}</p>
        </div>
      )}
      <button className="button button--lime" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending application' : 'Send application'} <Arrow />
      </button>
      <p className="brief-form__note">We’ll review it at {site.careersEmail}. No ads, no tracking.</p>
    </form>
  )
}

export function ApplyForm() {
  return (
    <Suspense fallback={<div className="brief-form" />}>
      <ApplyFormFields />
    </Suspense>
  )
}
