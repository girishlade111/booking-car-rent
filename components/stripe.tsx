"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import type { StripeElementsOptions } from "@stripe/stripe-js"

interface StripeProps {
  children: React.ReactNode
  options: {
    mode: "payment" | "subscription"
    amount: number
    currency: string
  }
  className?: string
}

// Mock Stripe public key - in a real app, this would be your actual Stripe public key
const stripePromise = loadStripe("pk_test_mock_key")

export function Stripe({ children, options, className }: StripeProps) {
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // In a real app, you would make an API call to your backend to create a payment intent
    // and get the client secret
    const mockClientSecret = "pi_mock_secret_" + Math.random().toString(36).substring(2, 15)
    setClientSecret(mockClientSecret)
  }, [options])

  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  }

  return (
    <div className={className}>
      {clientSecret && (
        <Elements options={stripeOptions} stripe={stripePromise}>
          {children}
        </Elements>
      )}
    </div>
  )
}
