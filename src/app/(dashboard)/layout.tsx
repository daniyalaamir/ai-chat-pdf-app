import DashboardBar from '@/components/DashboardBar'
import React from 'react'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <DashboardBar />
      {children}
    </>
  )
}
