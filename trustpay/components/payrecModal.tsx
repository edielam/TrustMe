import { useState, useEffect } from 'react'
import { FaSearch, FaCopy, FaMobileAlt, FaCreditCard } from 'react-icons/fa'

interface User {
  username: string;
  profileImage: string;
}

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PayModal({ isOpen, onClose }: PayModalProps) {
  const [trustpayLink, setTrustpayLink] = useState('');
  const [recipient, setRecipient] = useState<User | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTrustpayLink('');
      setRecipient(null);
      setAmount('');
      setPaymentMethod(null);
      setPhoneNumber('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
    }
  }, [isOpen]);

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/auth/user?trustpayLink=${trustpayLink}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const user = await response.json();
        setRecipient(user);
      } else {
        setRecipient(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setRecipient(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement payment logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-2xl font-bold mb-4">Send Payment</h3>
        <div className="mb-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              value={trustpayLink}
              onChange={(e) => setTrustpayLink(e.target.value)}
              placeholder="Enter Trustpay link"
              className="flex-grow p-2 focus:outline-none text-blue-500"
            />
            <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
              <FaSearch />
            </button>
          </div>
        </div>
        {recipient ? (
          <div className="mb-4 flex items-center space-x-4">
            <img src={recipient.profileImage} alt={recipient.username} className="w-12 h-12 rounded-full" />
            <span className="font-semibold">{recipient.username}</span>
          </div>
        ) : trustpayLink && (
          <p className="text-red-500 mb-4">No recipient found</p>
        )}
        {recipient && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('momo')}
                className={`flex-1 flex items-center justify-center space-x-2 p-2 border rounded ${paymentMethod === 'momo' ? 'bg-blue-500 text-white' : ''}`}
              >
                <FaMobileAlt />
                <span>MoMo</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 flex items-center justify-center space-x-2 p-2 border rounded ${paymentMethod === 'card' ? 'bg-blue-500 text-white' : ''}`}
              >
                <FaCreditCard />
                <span>Card</span>
              </button>
            </div>
            {paymentMethod === 'momo' && (
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
                required
              />
            )}
            {paymentMethod === 'card' && (
              <>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-1/2 p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    className="w-1/2 p-2 border rounded"
                    required
                  />
                </div>
              </>
            )}
            <div className="flex space-x-4">
              <button type="submit" className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                Pay
              </button>
              <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition duration-200">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiveModal({ isOpen, onClose }: ReceiveModalProps) {
  const [trustpayLink, setTrustpayLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchTrustpayLink();
    }
  }, [isOpen]);

  const fetchTrustpayLink = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/auth/users/trustpaylink', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTrustpayLink(data.trustpayLink);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trustpayLink);
    // You might want to show a tooltip or notification here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h3 className="text-2xl font-bold mb-4">Receive Payment</h3>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Your Trustpay Link:</p>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              value={trustpayLink}
              readOnly
              className="flex-grow p-2 bg-gray-100 text-blue-500"
            />
            <button onClick={copyToClipboard} className="bg-blue-500 text-white p-2">
              <FaCopy />
            </button>
          </div>
        </div>
        <button onClick={onClose} className="w-full bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition duration-200">
          Close
        </button>
      </div>
    </div>
  );
}

// trustpay.com/@john_doe_456