import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import '../app/globals.css'
import Navbar from '@/components/navabr'

// Mock data - replace with actual API call
const mockTransaction: Transaction = {
  id: '12345',
  status: 'in_escrow',
  amount: 500.00,
  refundableAmount: 450.00,
  description: 'Purchase of vintage camera',
  seller: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  buyer: {
    name: 'Jane Smith',
    email: 'jane@example.com'
  },
  createdAt: '2023-08-01T12:00:00Z',
  updatedAt: '2023-08-02T09:30:00Z'
}
type Transaction = {
    id: string;
    status: 'pending' | 'in_escrow' | 'completed' | 'refunded' | 'cancelled';
    amount: number;
    refundableAmount: number;
    description: string;
    seller: {
      name: string;
      email: string;
    };
    buyer: {
      name: string;
      email: string;
    };
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };

  type TransactionAction = 'confirm_delivery' | 'request_refund' | 'cancel' | 'release_funds';

export default function TransactionStatus() {
  const router = useRouter()
  const { id } = router.query
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  useEffect(() => {
    // Replace this with an actual API call
    setTransaction(mockTransaction)
  }, [id])

  const handleAction = (action: TransactionAction) => {
    // Implement the logic for different actions (confirm delivery, request refund, etc.)
    console.log(`Action ${action} for transaction ${id}`)
  }

  if (!transaction) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Transaction Status - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Transaction Status</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Transaction Details</h2>
                    <dl className="mt-2 text-sm text-gray-500">
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">ID:</dt>
                        <dd className="inline ml-1">{transaction.id}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">Status:</dt>
                        <dd className="inline ml-1">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            transaction.status === 'in_escrow' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </dd>
                      </div>
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">Amount:</dt>
                        <dd className="inline ml-1">${transaction.amount.toFixed(2)}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">Refundable Amount:</dt>
                        <dd className="inline ml-1">${transaction.refundableAmount.toFixed(2)}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">Description:</dt>
                        <dd className="inline ml-1">{transaction.description}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">Created:</dt>
                        <dd className="inline ml-1">{new Date(transaction.createdAt).toLocaleString()}</dd>
                      </div>
                      <div className="mt-1">
                        <dt className="inline font-medium text-gray-700">Last Updated:</dt>
                        <dd className="inline ml-1">{new Date(transaction.updatedAt).toLocaleString()}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Parties Involved</h2>
                    <div className="mt-2">
                      <h3 className="text-sm font-medium text-gray-700">Seller</h3>
                      <p className="text-sm text-gray-500">{transaction.seller.name}</p>
                      <p className="text-sm text-gray-500">{transaction.seller.email}</p>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700">Buyer</h3>
                      <p className="text-sm text-gray-500">{transaction.buyer.name}</p>
                      <p className="text-sm text-gray-500">{transaction.buyer.email}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Actions</h2>
                  <div className="mt-2 space-x-4">
                    <button
                      onClick={() => handleAction('confirm_delivery')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Confirm Delivery
                    </button>
                    <button
                      onClick={() => handleAction('request_refund')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Request Refund
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}