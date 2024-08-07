import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '@/components/navabr';

interface User {
  id: number;
  username: string;
  email: string;
  profile_image: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/user/profile-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(prevUser => prevUser ? { ...prevUser, profile_image: data.profile_image } : null);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Profile - TrustPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar activePage="settings" />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
          <div className="mt-8">
            <div className="max-w-xl">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <img className="h-24 w-24 rounded-full" src={user.profile_image || '/default-avatar.png'} alt={user.username} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
                  <p className="text-sm font-medium text-gray-500">{user.email}</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="mt-8">
                <div>
                  <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Profile Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}