import { useState, useRef  } from 'react'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa'
import jsPDF from 'jspdf'
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

interface FormData {
  recipient: string;
  item: string;
  note: string;
}

export function InvoiceModal({ isOpen, onClose }: InvoiceModalProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    recipient: '',
    item: '',
    note: '',
  });
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  const handleDownload = () => {
    if (pdfRef.current) {
      const pdf = new jsPDF('p', 'pt', 'a4');
      pdf.html(pdfRef.current, {
        callback: (doc) => {
          doc.save('invoice.pdf');
        },
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4 sm:p-0"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.div className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-2xl w-full max-w-lg p-6 sm:p-8 relative">
            <CloseButton onClose={onClose} />
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Send Invoice</h3>
            <InvoiceForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} onClose={onClose} />
            <InvoicePreview formData={formData} pdfRef={pdfRef} handleDownload={handleDownload} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CloseButton({ onClose }: { onClose: () => void }): JSX.Element {
  return (
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
      <FaTimes size={24} />
    </button>
  );
}

interface InvoiceFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

function InvoiceForm({ formData, handleChange, handleSubmit, onClose }: InvoiceFormProps): JSX.Element {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InvoiceHeader />
      <InputField
        label="Who are you billing?"
        id="recipient"
        type="text"
        placeholder="Customer name or email"
        value={formData.recipient}
        onChange={handleChange}
        required
      />
      <InputField
        label="What are they paying for?"
        id="item"
        type="text"
        placeholder="Item name"
        value={formData.item}
        onChange={handleChange}
        required
      />
      <TextAreaField
        label="Notes and attachments"
        id="note"
        placeholder="Note to your customer"
        value={formData.note}
        onChange={handleChange}
        maxLength={700}
      />
      <FormButtons onClose={onClose} />
    </form>
  );
}

function InvoiceHeader(): JSX.Element {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <span className="text-lg font-medium">Invoice No. 0002</span>
        <span className="text-sm">Date: 08/08/2024</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <span className="text-sm">Due: On receipt</span>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <button type="button" className="text-sm text-blue-600 hover:underline">Edit</button>
          <button type="button" className="text-sm text-blue-600 hover:underline">More actions</button>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function InputField({ label, id, type, placeholder, value, onChange, required }: InputFieldProps): JSX.Element {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
}

function TextAreaField({ label, id, placeholder, value, onChange, maxLength }: TextAreaFieldProps): JSX.Element {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-300 focus:border-blue-300 sm:text-sm"
        id={id}
        name={id}
        placeholder={placeholder}
        rows={3}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      ></textarea>
    </div>
  );
}

function FormButtons({ onClose }: { onClose: () => void }): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <MotionButton type="submit" className="bg-green-600 text-white">
        Send Invoice
      </MotionButton>
      <MotionButton type="button" onClick={onClose} className="bg-gray-300 text-gray-800">
        Cancel
      </MotionButton>
    </div>
  );
}

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  className?: string;
}

function MotionButton({ children, className, ...props }: MotionButtonProps): JSX.Element {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex-1 p-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface InvoicePreviewProps {
  formData: FormData;
  pdfRef: React.RefObject<HTMLDivElement>;
  handleDownload: () => void;
}

function InvoicePreview({ formData, pdfRef, handleDownload }: InvoicePreviewProps): JSX.Element {
  return (
    <div ref={pdfRef} className="mt-8 p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Invoice Preview</h3>
      <p className="text-sm">Invoice No. 0002</p>
      <p className="text-sm">Date: 08/08/2024</p>
      <p className="text-sm">Due: On receipt</p>
      <p className="mt-4 text-lg font-medium">Billing to: {formData.recipient}</p>
      <p className="mt-2 text-lg font-medium">Item: {formData.item}</p>
      <p className="mt-4 text-sm">Note: {formData.note}</p>
      <MotionButton
        onClick={handleDownload}
        className="mt-6 flex items-center justify-center bg-blue-500 text-white"
      >
        <FaDownload className="mr-2" />
        Download PDF
      </MotionButton>
    </div>
  );
}