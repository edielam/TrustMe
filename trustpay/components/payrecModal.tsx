import { useState, useEffect } from 'react';
import { FaSearch, FaCopy, FaMobileAlt, FaCreditCard, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [noRecipientFound, setNoRecipientFound] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };


  useEffect(() => {
    if (!isOpen) {
      setTrustpayLink('');
      setRecipient(null);
      setNoRecipientFound(false);
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
        setNoRecipientFound(false);
      } else {
        setRecipient(null);
        setNoRecipientFound(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setRecipient(null);
      setNoRecipientFound(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement payment logic here
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-2xl w-full max-w-md p-8 relative"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <FaTimes size={24} />
          </button>
          <h3 className="text-4xl font-bold text-gray-800 mb-6">Send Payment</h3>
          <div className="mb-6">
            <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden shadow-md">
              <input
                type="text"
                value={trustpayLink}
                onChange={(e) => setTrustpayLink(e.target.value)}
                placeholder="Enter Trustpay link"
                className="flex-grow p-3 focus:outline-none text-gray-700 bg-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="bg-blue-500 text-white p-3 rounded-r-full"
              >
                <FaSearch />
              </motion.button>
            </div>
          </div>
          {!recipient && noRecipientFound && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 mb-4"
            >
              No recipient found
            </motion.p>
          )}
          {recipient && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center space-x-4 bg-gray-100 p-4 rounded-lg"
            >
              <img src={recipient.profileImage || 'https://raw.githubusercontent.com/edielam/about_me/portfolio/src/assets/b5.png'} alt={recipient.username} className="w-16 h-16 rounded-full border-4 border-white shadow-md" />
              <span className="font-semibold text-gray-800 text-lg">{recipient.username}</span>
            </motion.div>
          )}
          {recipient && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
              <div className="flex space-x-4">
                <PaymentMethodButton
                  method="momo"
                  icon={<FaMobileAlt />}
                  label="MoMo"
                  selected={paymentMethod === 'momo'}
                  onClick={() => setPaymentMethod('momo')}
                />
                <PaymentMethodButton
                  method="card"
                  icon={<FaCreditCard />}
                  label="Card"
                  selected={paymentMethod === 'card'}
                  onClick={() => setPaymentMethod('card')}
                />
              </div>
              {paymentMethod === 'momo' && (
                <motion.input
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              )}
              {paymentMethod === 'card' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  </div>
                </motion.div>
              )}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Pay
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
interface PaymentMethodButtonProps {
    method: 'momo' | 'card';
    icon: React.ReactNode;
    label: string;
    selected: boolean;
    onClick: () => void;
}

function PaymentMethodButton({ method, icon, label, selected, onClick }: PaymentMethodButtonProps) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={onClick}
        className={`flex-1 flex items-center justify-center space-x-2 p-3 border-2 rounded-lg text-lg font-semibold transition duration-300 ${
          selected
            ? 'bg-blue-500 text-white border-blue-600'
            : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
        }`}
      >
        {icon}
        <span>{label}</span>
      </motion.button>
    );
  }

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiveModal({ isOpen, onClose }: ReceiveModalProps) {
  const [trustpayLink, setTrustpayLink] = useState('');
  const [copied, setCopied] = useState(false);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTrustpayLink();
    }
  }, [isOpen]);

  const fetchTrustpayLink = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/auth/trustpaylink', {
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-2xl w-full max-w-md p-8 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Receive Payment</h3>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Trustpay Link:</p>
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden shadow-md">
                <input
                  type="text"
                  value={trustpayLink}
                  readOnly
                  className="flex-grow p-3 bg-gray-50 text-gray-700"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="bg-blue-500 text-white p-3 rounded-r-lg"
                >
                  <FaCopy />
                </motion.button>
              </div>
              <AnimatePresence>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-500 mt-2"
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



// trustpay.com/@john_doe_456