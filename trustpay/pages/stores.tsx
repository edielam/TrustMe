// pages/stores.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import StoreModal from '@/components/catalogueModal';
import { toast } from 'react-toastify';
import { Catalogue, CatalogueItem} from '@/types/store';
import { useRouter } from 'next/router';
import Navbar from '@/components/navabr';
import CatalogueModal from '@/components/catalogueModal';

export default function Stores() {
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCatalogue, setEditingCatalogue] = useState<Catalogue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchCatalogues();
    }
  }, [router]);

  const fetchCatalogues = async () => {
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
      setCatalogues(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast.error('Failed to load stores. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCatalogue = async (catalogueData: { name: string; items: CatalogueItem[] }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/lists/stores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(catalogueData),
      });
      if (!response.ok) throw new Error('Failed to create store');
      const newCatalogue = await response.json();
      setCatalogues([...catalogues, newCatalogue]);
      toast.success('Store created successfully');
    } catch (error) {
      console.error('Error creating store:', error);
      toast.error('Failed to create store. Please try again.');
    }
  };

  const handleEditCatalogue = async (catalogueData: { name: string; items: CatalogueItem[] }) => {
    if (!editingCatalogue) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lists/stores?id=${editingCatalogue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(catalogueData),
      });
      if (!response.ok) throw new Error('Failed to update store');
      const updatedStore = await response.json();
      setCatalogues(catalogues.map(store => store.id === updatedStore.id ? updatedStore : store));
      setEditingCatalogue(null);
      toast.success('Store updated successfully');
    } catch (error) {
      console.error('Error updating store:', error);
      toast.error('Failed to update store. Please try again.');
    }
  };
  
  const handleDeleteCatalogue = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/lists/stores?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete store');
      setCatalogues(catalogues.filter(store => store.id !== id));
      toast.success('Store deleted successfully');
    } catch (error) {
      console.error('Error deleting store:', error);
      toast.error('Failed to delete store. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Catalogues - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activePage="stores" />

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Your Marketplace Listings</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
              >
                Create New Catalogue
              </button>
              {isLoading ? (
                <div className="text-center">Loading catalogues...</div>
              ) : catalogues.length === 0 ? (
                <div className="text-center text-gray-500">No catalogues found. Create a new one to get started!</div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    {catalogues.map((catalogue) => (
                      <li key={catalogue.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <div className="px-4 py-4 flex items-center sm:px-6">
                          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-lg font-medium leading-6 text-gray-900 truncate">{catalogue.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">ID: {catalogue.unique_id}</p>
                              <p className="mt-1 text-sm text-gray-500">{catalogue.items.length} items/services</p>
                            </div>
                          </div>
                          <div className="ml-5 flex-shrink-0">
                            <button
                              onClick={() => { setEditingCatalogue(catalogue); setIsModalOpen(true); }}
                              className="mr-2 font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCatalogue(catalogue.id)}
                              className="font-medium text-red-600 hover:text-red-500 transition duration-150 ease-in-out"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <CatalogueModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingCatalogue(null); }}
        onSave={editingCatalogue ? handleEditCatalogue : handleCreateCatalogue}
        catalogue={editingCatalogue || undefined}
      />
    </div>
  );
}