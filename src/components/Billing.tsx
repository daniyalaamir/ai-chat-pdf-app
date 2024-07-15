import React from 'react'
import { Button } from './ui/button'
import { generateBillingLink } from '@/lib/subscription'

const Billing = async () => {
  const portalUrl = await generateBillingLink()

  return (
    <>
      {portalUrl && (
        <a href={portalUrl}>
          <Button variant="link">🧲 Billing</Button>
        </a>
      )}
    </>
  )
}

export default Billing
