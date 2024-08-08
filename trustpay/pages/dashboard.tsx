import Head from 'next/head'
import { useEffect, useState } from 'react'
import '../app/globals.css'
import Navbar from '@/components/navabr'
import { PayModal, ReceiveModal } from '@/components/payrecModal';
import { User } from './profile';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay';


interface Transaction {
  id: number;
  amount: number;
  refundableAmount: number;
  type: 'sent' | 'received';
  status: 'pending' | 'completed' | 'failed';
  counterparty: string;
  date: string;
}

// Mock data for demonstration
// const mockTransactions: Transaction[] = [
//   { id: 1, type: 'sale', amount: 250.00, status: 'completed', date: '2023-08-01' },
//   { id: 2, type: 'purchase', amount: 120.50, status: 'pending', date: '2023-07-29' },
//   { id: 3, type: 'sale', amount: 75.00, status: 'completed', date: '2023-07-25' },
// ]

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false)
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null);
  // const [trustpayLink, setTrustpayLink] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleOpenPayModal = () => setIsPayModalOpen(true)
  const handleClosePayModal = () => setIsPayModalOpen(false)

  const handleOpenReceiveModal = () => setIsReceiveModalOpen(true)
  const handleCloseReceiveModal = () => setIsReceiveModalOpen(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoading(true);
    fetch('/api/activity/transaction', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };

    fetchUserData();
  }, []);

  // useEffect(() => {
  //   const fetchTrustpayLink = async () => {
  //     const token = localStorage.getItem('token');
  //     try {
  //       const response = await fetch('/api/auth/trustpaylink', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setTrustpayLink(data.trustpayLink);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchTrustpayLink();
  // })

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Home - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activePage="home" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Box */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-teal-500 to-cyan-600">
              <img
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-32 w-32 rounded-full border-4 border-white shadow-lg"
                src="https://raw.githubusercontent.com/edielam/about_me/portfolio/src/assets/b5.png"
                alt="Profile"
              />
            </div>
            <div className="pt-16 pb-8 px-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">{user.username}</h2>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <div className="mt-6 flex justify-center space-x-4">
                <SocialIcon icon="facebook" />
                <SocialIcon icon="twitter" />
                <SocialIcon icon="linkedin" />
              </div>
            </div>
            {/* <div className="bg-gray-50 px-6 py-4">
              <div className="text-sm font-medium text-gray-500">Member since</div>
              <div className="text-lg font-semibold text-gray-900">January 2023</div>
            </div> */}
            {/* News Slider */}
            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg overflow-hidden">
              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="h-48"
              >
                <SwiperSlide>
                  <div className="relative h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 transform -skew-y-6"></div>
                    <img 
                      src="/Users/eddie/Desktop/Rust School/TrustMe/trustpay/assets/coins.jpg" 
                      alt="Secure Transactions" 
                      className="absolute top-0 right-0 h-full w-2/3 object-cover transform skew-y-6"
                    />
                    <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Secure Transactions</h3>
                      <p>TrustPay ensures your payments are protected with state-of-the-art encryption.</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-teal-500 transform -skew-y-6"></div>
                    <img 
                      src="/path-to-your-image2.jpg" 
                      alt="Low Fees" 
                      className="absolute top-0 right-0 h-full w-2/3 object-cover transform skew-y-6"
                    />
                    <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Low Fees</h3>
                      <p>Enjoy competitive rates for all your transactions, both domestic and international.</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="relative h-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 transform -skew-y-6"></div>
                    <img 
                      src="/path-to-your-image3.jpg" 
                      alt="24/7 Support" 
                      className="absolute top-0 right-0 h-full w-2/3 object-cover transform skew-y-6"
                    />
                    <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                      <p>Our dedicated team is always ready to assist you with any questions or concerns.</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div> 
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <ActionButton text="Pay" bgColor="bg-teal-500" hoverColor="hover:bg-teal-600" onClick={handleOpenPayModal} />
              <ActionButton text="Receive" bgColor="bg-cyan-600" hoverColor="hover:bg-cyan-700" onClick={handleOpenReceiveModal} />
            </div>

            {/* Additional Actions */}
            <div className="grid grid-cols-3 gap-4">
              <IconButton icon={FundraiseIcon} text="Fundraise" />
              <IconButton icon={InvoiceIcon} text="Create Invoice" />
              <IconButton icon={DisputeIcon} text="Resolve Dispute" />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <PayModal isOpen={isPayModalOpen} onClose={handleClosePayModal} />
      <ReceiveModal isOpen={isReceiveModalOpen} onClose={handleCloseReceiveModal} />
    </div>
  )
}

interface ActionButtonProps {
  text: string;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

function ActionButton({ text, bgColor, hoverColor, onClick }: ActionButtonProps) {
  return (
    <button onClick={onClick} className={`${bgColor} ${hoverColor} text-white font-semibold py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out`}>
      {text}
    </button>
  )
}

interface IconButtonProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

function IconButton({ icon: Icon, text }: IconButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md shadow-sm transition duration-150 ease-in-out">
      <Icon className="h-6 w-6 mb-2" />
      {text}
    </button>
  )
}

interface TransactionItemProps {
  transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <div className="px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">{transaction.type}</p>
        <p className="text-sm text-gray-500">{transaction.date}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</p>
        <p className={`text-sm ${transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
          {transaction.status}
        </p>
      </div>
    </div>
  )
}

interface SocialIconProps {
  icon: 'facebook' | 'twitter' | 'linkedin';
};

function SocialIcon({ icon }: SocialIconProps) {
  const icons = {
    facebook: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.908v-3.622h2.911V8.413c0-2.888 1.76-4.461 4.33-4.461 1.23 0 2.288.091 2.594.132v3.011l-1.782.001c-1.397 0-1.667.664-1.667 1.637v2.148h3.332l-.435 3.622h-2.897V24h5.675c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z" />
      </svg>
    ),
    twitter: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 4.557a9.938 9.938 0 01-2.828.775A4.93 4.93 0 0023.337 3.4a9.865 9.865 0 01-3.127 1.195A4.92 4.92 0 0016.62 3c-2.737 0-4.95 2.214-4.95 4.952 0 .388.043.766.127 1.13C7.688 8.894 4.064 6.93 1.64 3.99a4.932 4.932 0 00-.666 2.484c0 1.714.872 3.23 2.188 4.123a4.904 4.904 0 01-2.242-.619v.063c0 2.393 1.704 4.387 3.965 4.837a4.92 4.92 0 01-2.235.085c.63 1.963 2.46 3.392 4.625 3.433a9.868 9.868 0 01-6.102 2.105c-.396 0-.788-.023-1.175-.069a13.94 13.94 0 007.548 2.213c9.057 0 14.008-7.505 14.008-14.008 0-.214-.005-.426-.014-.637A9.978 9.978 0 0024 4.557z" />
      </svg>
    ),
    linkedin: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.616 3.004H4.383A1.375 1.375 0 003.004 4.383v15.233a1.375 1.375 0 001.379 1.379h15.233a1.375 1.375 0 001.379-1.379V4.383a1.375 1.375 0 00-1.379-1.379zM8.994 19.585H6.243V10.19h2.751v9.395zM7.619 8.902c-.88 0-1.589-.71-1.589-1.588 0-.878.71-1.588 1.589-1.588s1.589.71 1.589 1.588c0 .878-.709 1.588-1.589 1.588zm12.298 10.683h-2.75v-4.56c0-1.09-.02-2.487-1.516-2.487-1.515 0-1.746 1.182-1.746 2.407v4.64H11.154v-9.395h2.636v1.285h.038c.367-.696 1.258-1.43 2.59-1.43 2.768 0 3.278 1.822 3.278 4.194v5.345z" />
      </svg>
    ),
  };

  return (
    <a href="#" className="text-gray-400 hover:text-gray-500">
      <span className="sr-only">{icon}</span>
      {icons[icon]}
    </a>
  );
}


function FundraiseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function InvoiceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function DisputeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
    </svg>
  )
}
