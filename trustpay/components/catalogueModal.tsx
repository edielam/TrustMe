// components/CatalogueModal.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CatalogueItem {
  id?: number;
  name: string;
  price: number;
  quantity?: number;
  type: 'product' | 'service';
  description: string;
}

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (catalogue: { name: string; items: CatalogueItem[] }) => void;
  catalogue?: { id: number; name: string; items: CatalogueItem[] };
}

export default function CatalogueModal({ isOpen, onClose, onSave, catalogue }: CatalogueModalProps) {
  const [catalogueName, setCatalogueName] = useState('');
  const [items, setItems] = useState<CatalogueItem[]>([]);
  const [newItem, setNewItem] = useState<CatalogueItem>({ name: '', price: 0, type: 'product', description: '' });

  useEffect(() => {
    if (catalogue) {
      setCatalogueName(catalogue.name);
      setItems(catalogue.items || []);
    } else {
      resetForm();
    }
  }, [catalogue]);

  const resetForm = () => {
    setCatalogueName('');
    setItems([]);
    setNewItem({ name: '', price: 0, quantity: 0, type: 'product', description: '' });
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', price: 0, type: 'product', description: '' });
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ name: catalogueName, items });
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="p-8 border w-full max-w-md shadow-lg rounded-lg bg-white"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {catalogue ? 'Edit Catalogue' : 'Create New Catalogue'}
        </h3>
        <input
          type="text"
          value={catalogueName}
          onChange={(e) => setCatalogueName(e.target.value)}
          placeholder="Catalogue Name"
          className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h4 className="font-semibold text-lg text-gray-700 mb-4">Items & Services</h4>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-between items-center mb-4 p-3 bg-gray-100 rounded-md"
          >
            <div>
              <span className='font-medium text-blue-700'>{item.name}</span>
              <p className='text-sm text-gray-600'>${item.price.toFixed(2)} - {item.type}</p>
            </div>
            <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        ))}
        <div className="mb-6">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item/Service Name"
            className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between mb-2">
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: Math.max(0, parseFloat(e.target.value)) })}
              placeholder="Price"
              className="w-1/2 mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Math.max(0, parseFloat(e.target.value)) })}
              placeholder="Quantity/Hours"
              className="w-1/2 mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'product' | 'service' })}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="product">Product</option>
              <option value="service">Service</option>
            </select>
          </div>
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button onClick={handleAddItem} className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
            Add Item/Service
          </button>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300" disabled={!catalogueName || items.length === 0}>
            Save Catalogue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}