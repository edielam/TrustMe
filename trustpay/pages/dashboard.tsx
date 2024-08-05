import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../app/globals.css'

// Mock data for demonstration
const mockTransactions = [
  { id: 1, type: 'sale', amount: 250.00, status: 'completed', date: '2023-08-01' },
  { id: 2, type: 'purchase', amount: 120.50, status: 'pending', date: '2023-07-29' },
  { id: 3, type: 'sale', amount: 75.00, status: 'completed', date: '2023-07-25' },
  { id: 4, type: 'purchase', amount: 300.00, status: 'completed', date: '2023-07-20' },
  { id: 5, type: 'sale', amount: 180.00, status: 'pending', date: '2023-07-18' },
]

export default function Dashboard() {
  const [transactions] = useState(mockTransactions)

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-sm">
        {/* Navigation content (same as before) */}
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0 flex">
              <div className="flex-grow border-4 border-dashed border-gray-200 rounded-lg h-96">
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                  <div className="mt-4">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              {/* Table content (same as before) */}
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-4 w-1/4 flex flex-col space-y-4">
                <Link href="/pay" className="w-full">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                    Pay
                  </button>
                </Link>
                <Link href="/receive" className="w-full">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Receive
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}