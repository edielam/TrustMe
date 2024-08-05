import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../app/globals.css'
import Navbar from '@/components/navabr';

export default function Stores() {
    interface Store {
        id: string;
        name: string;
        // other store properties
      };
      const [stores, setStores] = useState<Store[]>([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Stores - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activePage="stores" />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Stores</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">Your Stores</h2>
                  <div className="mt-4">
                    {stores.length === 0 ? (
                      <p className="text-gray-500">No stores created</p>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {stores.map((store, index) => (
                          <li key={index} className="py-4">
                            <Link href={`/stores/${store.id}`} className="text-indigo-600 hover:text-indigo-900">
                              {store.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 px-4 sm:px-0">
              <button
                onClick={() => {/* Add logic to create new store */}}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create New Store
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}