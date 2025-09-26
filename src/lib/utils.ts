import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fetcher(url: string, options: RequestInit = {}) {
  return fetch(url, options).then(res => res.json())
}
