export type ContactIntent = 'brief' | 'calendar' | 'application'

export type ContactAttachment = {
  filename: string
  contentType: string
  content: string
}

export type ContactPayload = {
  name: string
  email: string
  phone: string
  company: string
  volume: string
  bottleneck: string
  role: string
  portfolio: string
  intent: ContactIntent
  attachment?: ContactAttachment
}

export const cvMaxBytes = 3 * 1024 * 1024
export const cvAccept = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'

const cvTypes: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export function cvFilename(name: string) {
  const raw = name.replace(/^.*[\\/]/, '')
  const ext = (raw.match(/\.(pdf|doc|docx)$/i) || [])[1]?.toLowerCase() || ''
  const stem = raw.replace(/\.[^.]+$/, '').replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
  return ext ? `${stem || 'cv'}.${ext}` : ''
}

function hasPrefix(bytes: Uint8Array, prefix: number[]) {
  return prefix.every((value, index) => bytes[index] === value)
}

export function inspectCv(file: { name: string; size: number }, bytes: Uint8Array) {
  if (file.size <= 0 || bytes.byteLength <= 0) return { error: 'Please attach a CV or resume.' }
  if (file.size > cvMaxBytes || bytes.byteLength > cvMaxBytes) {
    return { error: 'Please keep the file under 3 MB.' }
  }

  const filename = cvFilename(file.name)
  const ext = filename.split('.').pop() || ''
  const contentType = cvTypes[ext]
  if (!filename || !contentType) return { error: 'Please attach a PDF or Word document.' }

  const valid = ext === 'pdf'
    ? hasPrefix(bytes, [0x25, 0x50, 0x44, 0x46])
    : ext === 'doc'
      ? hasPrefix(bytes, [0xd0, 0xcf, 0x11, 0xe0])
      : hasPrefix(bytes, [0x50, 0x4b])

  if (!valid) return { error: 'That file does not look like a PDF or Word document.' }
  return { filename, contentType }
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phonePattern = /^\+?[\d\s().-]{7,24}$/

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15 && phonePattern.test(value)
}
