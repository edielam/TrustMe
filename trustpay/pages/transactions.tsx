import Navbar from '@/components/navabr';
import Head from 'next/head'
import { useEffect, useState } from 'react';

interface Transaction {
    id: number;
    amount: number;
    refundableAmount: number;
    type: 'sent' | 'received';
    status: 'pending' | 'completed' | 'failed';
    counterparty: string;
    date: string;
  }

// const transactions: Transaction[] = [
//   { id: '1', type: 'sent', amount: 100, sender: 'John Doe', recipient: 'Jane Smith', date: '2023-08-01 14:30', status: 'completed' },
//   { id: '2', type: 'received', amount: 50, sender: 'Alice Johnson', recipient: 'John Doe', date: '2023-07-30 09:15', status: 'completed' },
//   { id: '3', type: 'sent', amount: 75, sender: 'John Doe', recipient: 'Bob Brown', date: '2023-07-28 16:45', status: 'pending' },
//   { id: '4', type: 'received', amount: 200, sender: 'Eve Wilson', recipient: 'John Doe', date: '2023-07-25 11:00', status: 'completed' },
//   { id: '5', type: 'sent', amount: 150, sender: 'John Doe', recipient: 'Charlie Davis', date: '2023-07-22 13:20', status: 'failed' },
// ];

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoading(true);
        fetch('/api/activity/transaction', {
          headers: {
            'Authorization': `Bearer ${token}` // Make sure to include the token
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (Array.isArray(data)) {
              setTransactions(data);
            } else {
              throw new Error('Invalid data format');
            }
          })
          .catch(err => {
            console.error('Fetch error:', err);
            setError(err.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, []);
  
    return (
      <div className="min-h-screen bg-gray-100">
        <Head>
          <title>Transactions - TrustPay</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Navbar activePage="transactions" />
  
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Counterparty</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'sent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${transaction.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.counterparty}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(transaction.date).toLocaleString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }