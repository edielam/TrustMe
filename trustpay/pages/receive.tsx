import Head from 'next/head'
import { useState, useEffect } from 'react'
import '../app/globals.css'
import Navbar from '@/components/navabr'

export default function Receive() {
  const [username, setUsername] = useState('')
  const [paymentLink, setPaymentLink] = useState('')

  useEffect(() => {
    // In a real application, you would fetch the username from your authentication system
    const mockUsername = 'john_doe'
    setUsername(mockUsername)
    setPaymentLink(`https://trustpay.com/pay/${mockUsername}`)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink)
    alert('Payment link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Receive Payment - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar activePage="transactions" />

      <nav className="bg-white shadow-sm">
        {/* Navigation content (same as in Dashboard) */}
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Receive Payment</h1>
          </div>
        </header>
        <main>
          <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Your Payment Link
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Share this link to receive payments:</p>
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    readOnly
                    value={paymentLink}
                    className="mt-1 block w-full border border-gray-300 text-indigo-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-5">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Copy Link
                  </button>
                </div>
                <div className="mt-5">
                  <h4 className="text-md font-medium text-gray-900">Important Details</h4>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                    <li>Your username: {username}</li>
                    <li>Payments are processed securely through TrustPay</li>
                    <li>You&apos;ll be notified when you receive a payment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}