import React from 'react'

export interface IToast {
  severity: 'success' | 'info' | 'warn' | 'error' | undefined
  summary: string
  detail: React.ReactNode
  life: number
}
