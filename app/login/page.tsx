'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/authStore';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    const messageParam = searchParams.get('message');
    if (messageParam) {
      setMessage(messageParam);
    }
    
    // Clear any previous auth errors when component mounts
    clearError();
  }, [searchParams, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    try {
      await login(formData.email, formData.password);
      
      // Check authentication state after login
      const authState = useAuthStore.getState();
      console.log('Auth state after login:', {
        isAuthenticated: authState.isAuthenticated,
        error: authState.error,
        user: authState.user
      });
      
      // If no error after login attempt, redirect to dashboard
      if (!authState.error) {
        console.log('Redirecting to dashboard...');
        // Add a small delay to ensure state is updated before redirect
        setTimeout(() => {
          router.push('/dashboard');
        }, 100);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full mb-4">
              <i className="ri-plane-line text-3xl text-white"></i>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-lg">Sign in to continue your journey</p>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-4 px-4 rounded-xl hover:from-violet-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <i className="ri-login-box-line"></i>
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">New to Tripy?</span>
              </div>
            </div>
            <Link href="/signup" className="block w-full text-center py-3 px-4 border-2 border-violet-600 text-violet-600 font-semibold rounded-xl hover:bg-violet-50 transition-all duration-200">
              Create an Account
            </Link>
          </div>
          
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: 'suraj@gmail.com',
                  password: 'password123'
                });
              }}
              className="w-full bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-200 text-sm"
            >
              <i className="ri-test-tube-line mr-2"></i>
              Use Demo Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600 mx-auto"></div>
              <p className="mt-6 text-gray-600 font-medium">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
