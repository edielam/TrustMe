import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import '../app/globals.css'
import { useRouter } from 'next/router'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    countryCode: '+233', // Default to Ghana
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Form submitted:', data)
      router.push('/login')
    } else {
      const errorData = await response.json()
      console.error('Error:', errorData.message)
    }
  }

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Register - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    
      <div className="relative overflow-hidden">
        <header className="relative">
          <div className="bg-gray-900 py-6">
            <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <span className="sr-only">TrustPay</span>
                    <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg" alt="" />
                  </Link>
                  <div className="-mr-2 flex items-center md:hidden">
                    <button
                      type="button"
                      className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link href="/login" className="text-base font-medium text-white hover:text-gray-300">
                  Log in
                </Link>
              </div>
            </nav>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
              <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="px-5 pt-4 flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-600-cyan-600.svg" alt="" />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close main menu</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          )}
        </header>

        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Join TrustPay</span>
                      <span className="block text-cyan-400">Start Secure Transactions</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Create your account and join thousands of entrepreneurs who trust us with their online payments.
                    </p>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    {/* Registration Form */}
                    <div className="mt-10 sm:mt-12">
                      <form onSubmit={handleSubmit} className="sm:max-w-xl sm:mx-auto lg:mx-0 space-y-4">
                        <div>
                          <label htmlFor="username" className="sr-only">Username</label>
                          <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <label htmlFor="countryCode" className="sr-only">Country Code</label>
                            <select
                              id="countryCode"
                              name="countryCode"
                              required
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                              value={formData.countryCode}
                              onChange={handleChange}
                            >
                              <option value="+233">Ghana (+233)</option>
                              {/* Add more country options as needed */}
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label htmlFor="phoneNumber" className="sr-only">Phone Number</label>
                            <input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="tel"
                              placeholder="Phone Number"
                              required
                              className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="sr-only">Email address</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address"
                            required
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">Password</label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <button type="submit" className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900 transition duration-150 ease-in-out">
                            Create Account
                          </button>
                        </div>
                      </form>
                      <p className="mt-3 text-sm text-gray-300 sm:mt-4">By signing up, you agree to our <a href="#" className="font-medium text-white hover:underline">terms of service</a> and <a href="#" className="font-medium text-white hover:underline">privacy policy</a>.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-50" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="mt-12 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-400 xl:text-center">&copy; 2024 TrustPay, Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}