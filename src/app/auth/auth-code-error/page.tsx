'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuthErrorPage() {
  const [errorDetails, setErrorDetails] = useState<string>('')

  useEffect(() => {
    // Extract error from hash if it exists
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        const params = new URLSearchParams(hash.substring(1)) // remove the '#'
        const description = params.get('error_description')
        if (description) {
          setErrorDetails(decodeURIComponent(description.replace(/\+/g, ' ')))
        }
      }
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md border-red-900 bg-black/50 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-red-500">Authentication Error</CardTitle>
          <CardDescription className="text-gray-400">
            There was a problem signing you in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-950/50 border border-red-900 p-4 rounded-md text-sm text-red-200">
            <p className="font-semibold mb-1">Error details:</p>
            <p className="break-words">{errorDetails || "Could not complete the authentication process. This is usually caused by a misconfiguration."}</p>
          </div>
          
          <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
            <Link href="/login">
              Return to Login
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
