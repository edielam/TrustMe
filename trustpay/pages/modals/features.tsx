import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import '../../app/globals.css'

const modalVariants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.75, transition: { duration: 0.2 } }
}

interface FundsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FundraiseModal({ isOpen, onClose }: FundsModalProps) {
  const [title, setTitle] = useState('')
  const [goal, setGoal] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ title, goal, description })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Start a Fundraiser</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                  Fundraiser Title
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="title"
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="goal">
                  Fundraising Goal
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="goal"
                  type="number"
                  placeholder="Enter amount"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="description"
                  placeholder="Enter description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-blue-500 text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Start Fundraiser
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-800 p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DisputeModal({ isOpen, onClose }: DisputeModalProps) {
  const [transactionId, setTransactionId] = useState('')
  const [reason, setReason] = useState('')
  const [evidence, setEvidence] = useState<File | null>(null)
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ transactionId, reason, evidence, description })
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidence(e.target.files[0])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Resolve Dispute</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="transactionId">
                  Transaction ID
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="transactionId"
                  type="text"
                  placeholder="Enter transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="reason">
                  Reason for Dispute
                </label>
                <select
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="item_not_received">Item not received</option>
                  <option value="item_not_as_described">Item not as described</option>
                  <option value="unauthorized_transaction">Unauthorized transaction</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="evidence">
                  Upload Evidence
                </label>
                <input
                  className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                  id="evidence"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Dispute Details
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="description"
                  placeholder="Provide more details about the dispute"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-red-600 text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Submit Dispute
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-800 p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceModal({ isOpen, onClose }: InvoiceModalProps) {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ recipient, amount, description })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
            <h3 className="text-4xl font-bold text-gray-800 mb-6">Send Invoice</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="recipient">
                  Recipient Email
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="recipient"
                  type="email"
                  placeholder="Enter recipient email"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="amount">
                  Invoice Amount
                </label>
                <input
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
                  id="description"
                  placeholder="Enter description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex-1 bg-green-600 text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Send Invoice
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-800 p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
