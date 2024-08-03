import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../app/globals.css'

export default function InitiatePayment() {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    amount: '',
    description: '',
    refundableAmount: '',
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // Here you would typically send the form data to your API
    console.log('Payment initiated:', formData)
    // Add your payment initiation logic here
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Initiate Payment - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-sm">
        {/* Navigation bar content (same as in dashboard) */}
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Initiate Payment</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">
                      Recipient Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="recipientEmail"
                        name="recipientEmail"
                        type="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.recipientEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Total Amount ($)
                    </label>
                    <div className="mt-1">
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="refundableAmount" className="block text-sm font-medium text-gray-700">
                      Refundable Amount ($)
                    </label>
                    <div className="mt-1">
                      <input
                        id="refundableAmount"
                        name="refundableAmount"
                        type="number"
                        step="0.01"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.refundableAmount}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">This is the amount that can be refunded if necessary.</p>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <Link href="/dashboard" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Cancel and return to dashboard
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Initiate Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}