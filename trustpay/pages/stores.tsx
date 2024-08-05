// pages/stores.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/navabr';
import StoreModal from '@/components/storeModal';

interface Store {
  id: number;
  name: string;
  unique_id: string;
  items: { id: number; name: string; price: number; quantity: number }[];
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    // In a real application, you would fetch this data from your API
    const response = await fetch('/api/lists/stores');
    const data = await response.json();
    setStores(data);
  };

  const handleCreateStore = async (storeData: { name: string; items: any[] }) => {
    // In a real application, you would send this data to your API
    const response = await fetch('/api/lists/stores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeData),
    });
    const newStore = await response.json();
    setStores([...stores, newStore]);
  };

  const handleEditStore = async (storeData: { name: string; items: any[] }) => {
    if (!editingStore) return;
    // In a real application, you would send this data to your API
    const response = await fetch(`/api/lists/stores/${editingStore.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeData),
    });
    const updatedStore = await response.json();
    setStores(stores.map(store => store.id === updatedStore.id ? updatedStore : store));
    setEditingStore(null);
  };

  const handleDeleteStore = async (id: number) => {
    // In a real application, you would send this request to your API
    await fetch(`/api/lists/stores/${id}`, { method: 'DELETE' });
    setStores(stores.filter(store => store.id !== id));
  };

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
              <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create New Store
              </button>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {stores.map((store) => (
                    <li key={store.id}>
                      <div className="px-4 py-4 flex items-center sm:px-6">
                        <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900 truncate">{store.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">ID: {store.unique_id}</p>
                          </div>
                        </div>
                        <div className="ml-5 flex-shrink-0">
                          <button
                            onClick={() => { setEditingStore(store); setIsModalOpen(true); }}
                            className="mr-2 font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteStore(store.id)}
                            className="font-medium text-red-600 hover:text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      <StoreModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingStore(null); }}
        onSave={editingStore ? handleEditStore : handleCreateStore}
        store={editingStore || undefined}
      />
    </div>
  );
}