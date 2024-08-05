import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../app/globals.css'
import Navbar from '@/components/navabr'

export default function InitiatePayment() {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    amount: '',
    purpose: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Payment initiated:', formData)
    // Add your payment initiation logic here
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Initiate Payment - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activePage="transactions" />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Initiate Payment</h1>
          </div>
        </header>
        <main>
          <div className="max-w-lg mx-auto mt-10 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">
                      Recipient Email
                    </label>
                    <input
                      id="recipientEmail"
                      name="recipientEmail"
                      type="email"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.recipientEmail}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount ($)
                    </label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
                      Purpose
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      required
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={formData.purpose}
                      onChange={handleChange}
                    >
                      <option value="">Select a purpose</option>
                      <option value="goods">Goods</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end">
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