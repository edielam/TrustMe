// components/StoreModal.tsx
import React, { useState, useEffect } from 'react';

interface StoreItem {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (store: { name: string; items: StoreItem[] }) => void;
  store?: { id: number; name: string; items: StoreItem[] };
}

export default function StoreModal({ isOpen, onClose, onSave, store }: StoreModalProps) {
  const [storeName, setStoreName] = useState('');
  const [items, setItems] = useState<StoreItem[]>([]);
  const [newItem, setNewItem] = useState<StoreItem>({ name: '', price: 0, quantity: 0 });

  useEffect(() => {
    if (store) {
      setStoreName(store.name);
      setItems(store.items || []); // Use an empty array if store.items is undefined
    } else {
      resetForm();
    }
  }, [store]);

  const resetForm = () => {
    setStoreName('');
    setItems([]);
    setNewItem({ name: '', price: 0, quantity: 0 });
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', price: 0, quantity: 0 });
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave({ name: storeName, items });
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {store ? 'Edit Store' : 'Create New Store'}
        </h3>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Store Name"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md text-blue-700"
        />
        <h4 className="font-medium text-gray-700 mb-2">Items</h4>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span className='text-blue-700'>{item.name} - ${item.price.toFixed(2)} (Qty: {item.quantity})</span>
            <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <div className="flex flex-col mb-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
            className="mb-2 px-3 py-2 border border-gray-300 rounded-md text-blue-700"
          />
          <div className="flex justify-between">
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: Math.max(0, parseFloat(e.target.value)) })}
              placeholder="Price"
              className="w-1/2 mr-2 px-3 py-2 border border-gray-300 rounded-md text-blue-700"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: Math.max(0, parseInt(e.target.value)) })}
              placeholder="Qty"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-blue-700"
            />
          </div>
          <button onClick={handleAddItem} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Item</button>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={!storeName || items.length === 0}>Save</button>
        </div>
      </div>
    </div>
  );
}