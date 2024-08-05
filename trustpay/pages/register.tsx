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
  })

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      // Redirect to the login
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
      </Head>
    
      <div className="relative overflow-hidden">
        <header className="relative">
          <div className="bg-gray-900 pt-6">
            <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
              <div className="flex items-center flex-1">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <span className="sr-only">TrustPay</span>
                    <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg" alt="" />
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link href="/login" className="text-base font-medium text-white hover:text-gray-300">
                  Log in
                </Link>
              </div>
            </nav>
          </div>
        </header>

        <main>
          <div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">Join TrustPay</span>
                      <span className="block text-teal-400">Start Secure Transactions</span>
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
                      <form onSubmit={handleSubmit} className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex-col">
                          <div className="min-w-0 flex-1 mb-3">
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
                          <div className="min-w-0 flex-1 mb-3">
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
                          <div className="min-w-0 flex-1 mb-3">
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
                          <div className="min-w-0 flex-1 mb-3">
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
                          <div className="mt-3">
                            <button type="submit" className="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900">
                              Create Account
                            </button>
                          </div>
                        </div>
                      </form>
                      <p className="mt-3 text-sm text-gray-300 sm:mt-4">By signing up, you agree to our <a href="#" className="font-medium text-white">terms of service</a> and <a href="#" className="font-medium text-white">privacy policy</a>.</p>
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