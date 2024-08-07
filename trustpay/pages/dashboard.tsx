import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../app/globals.css'
import Navbar from '@/components/navabr';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: string;
  date: string;
}

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  { id: 1, type: 'sale', amount: 250.00, status: 'completed', date: '2023-08-01' },
  { id: 2, type: 'purchase', amount: 120.50, status: 'pending', date: '2023-07-29' },
  { id: 3, type: 'sale', amount: 75.00, status: 'completed', date: '2023-07-25' },
]

export default function Home() {
  const [transactions] = useState<Transaction[]>(mockTransactions)

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activePage="home" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Box */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <img className="h-16 w-16 rounded-full" src="/placeholder-avatar.jpg" alt="Profile" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                <p className="text-gray-500">john@example.com</p>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="twitter" />
              <SocialIcon icon="linkedin" />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <ActionButton text="Pay" bgColor="bg-teal-500" hoverColor="hover:bg-teal-600" />
              <ActionButton text="Receive" bgColor="bg-cyan-600" hoverColor="hover:bg-cyan-700" />
            </div>

            {/* Additional Actions */}
            <div className="grid grid-cols-3 gap-4">
              <IconButton icon={FundraiseIcon} text="Fundraise" />
              <IconButton icon={InvoiceIcon} text="Create Invoice" />
              <IconButton icon={DisputeIcon} text="Resolve Dispute" />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface ActionButtonProps {
  text: string;
  bgColor: string;
  hoverColor: string;
}

function ActionButton({ text, bgColor, hoverColor }: ActionButtonProps) {
  return (
    <button className={`${bgColor} ${hoverColor} text-white font-semibold py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out`}>
      {text}
    </button>
  )
}

interface IconButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

function IconButton({ icon: Icon, text }: IconButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out">
      <Icon className="h-6 w-6 mb-2" />
      {text}
    </button>
  )
}

interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</p>
        <p className={`text-sm ${transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
          {transaction.status}
        </p>
      </div>
    </div>
  )
}

interface SocialIconProps {
  icon: string;
}

function SocialIcon({ icon }: SocialIconProps) {
  return (
    <a href="#" className="text-gray-400 hover:text-gray-500">
      <span className="sr-only">{icon}</span>
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        {/* Add appropriate SVG path for each social icon */}
      </svg>
    </a>
  )
}

function FundraiseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function InvoiceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function DisputeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
    </svg>
  )
}