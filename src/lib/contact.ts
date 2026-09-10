export type ContactIntent = 'brief' | 'calendar'

export type ContactPayload = {
  name: string
  email: string
  phone: string
  company: string
  volume: string
  bottleneck: string
  intent: ContactIntent
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phonePattern = /^\+?[\d\s().-]{7,24}$/

export function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15 && phonePattern.test(value)
}
