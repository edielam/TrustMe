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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          {store ? 'Edit Store' : 'Create New Store'}
        </h3>
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Store Name"
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800"
        />
        <h4 className="font-medium text-gray-700 mb-2">Items</h4>
        {items && items.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span className='text-gray-800'>{item.name} - ${item.price.toFixed(2)} (Qty: {item.quantity})</span>
            <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <div className="flex mb-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
            className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
          />
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
            placeholder="Price"
            className="w-20 mr-2 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            placeholder="Qty"
            className="w-20 mr-2 px-3 py-2 border border-gray-300 rounded-md text-gray-800"
          />
          <button onClick={handleAddItem} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
}