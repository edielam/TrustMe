// pages/stores.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import StoreModal from '@/components/storeModal';
import { toast } from 'react-toastify';
import { Store, StoreItem } from '@/types/store';
import { useRouter } from 'next/router';
import Navbar from '@/components/navabr';

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchStores();
    }
  }, []);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/lists/stores', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch stores');
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast.error('Failed to load stores. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateStore = async (storeData: { name: string; items: StoreItem[] }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/lists/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error('Failed to create store');
      const newStore = await response.json();
      setStores([...stores, newStore]);
      toast.success('Store created successfully');
    } catch (error) {
      console.error('Error creating store:', error);
      toast.error('Failed to create store. Please try again.');
    }
  };

  const handleEditStore = async (storeData: { name: string; items: StoreItem[] }) => {
    if (!editingStore) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lists/stores/${editingStore.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error('Failed to update store');
      const updatedStore = await response.json();
      setStores(stores.map(store => store.id === updatedStore.id ? updatedStore : store));
      setEditingStore(null);
      toast.success('Store updated successfully');
    } catch (error) {
      console.error('Error updating store:', error);
      toast.error('Failed to update store. Please try again.');
    }
  };
  
  const handleDeleteStore = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lists/stores?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete store');
      setStores(stores.filter(store => store.id !== id));
      toast.success('Store deleted successfully');
    } catch (error) {
      console.error('Error deleting store:', error);
      toast.error('Failed to delete store. Please try again.');
    }
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