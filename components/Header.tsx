'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/authStore';

// User interface is now imported from authStore

export default function Header() {
  const { user, isLoading, isAuthenticated, logout, checkAuth } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);



  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-violet-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-violet-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <i className="ri-plane-line text-white text-xl"></i>
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight" style={{ fontFamily: 'Pacifico, serif' }}>
            Tripy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 text-white font-medium text-sm">
          <Link href="#features" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200">Features</Link>
          <Link href="#how-it-works" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200">How It Works</Link>
          <Link href="#contact" className="px-4 py-2 hover:bg-white/10 rounded-lg transition-all duration-200">Contact</Link>
          <button
            onClick={() => {
              const event = new CustomEvent('activateVoiceAssistant');
              window.dispatchEvent(event);
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 ml-2 border border-white/20 backdrop-blur-sm"
          >
            <i className="ri-mic-line text-lg"></i>
            <span className="font-semibold">Voice AI</span>
          </button>
        </nav>

        {/* Auth/Profile (Desktop) */}
        <div className="hidden md:flex items-center gap-3 relative">
          {!isLoading && isAuthenticated && user ? (
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-3 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 border border-white/20 backdrop-blur-sm"
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center">
                  <i className="ri-user-3-line text-white" aria-hidden="true"></i>
                </div>
                <span className="font-semibold">{user.firstName}</span>
                <i className="ri-arrow-down-s-line"></i>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 bg-white/95 backdrop-blur-xl text-sm text-gray-800 rounded-xl shadow-2xl p-2 w-48 z-10 border border-gray-200">
                  <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3 hover:bg-violet-50 rounded-lg transition-colors">
                    <i className="ri-dashboard-line text-violet-600"></i>
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-left px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <i className="ri-logout-box-line"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-200 font-semibold backdrop-blur-sm"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-full bg-white text-purple-800 font-bold hover:bg-violet-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle menu"
        >
          <i className={menuOpen ? 'ri-close-line' : 'ri-menu-line'} aria-hidden="true"></i>
        </button>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 text-white text-sm">
          <Link href="#features" className="block">Features</Link>
          <Link href="#how-it-works" className="block">How It Works</Link>
          <Link href="#contact" className="block">Contact</Link>
          <hr className="border-white/20" />
          {!isLoading && user ? (
            <>
              <Link href="/dashboard" className="block">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block">Login</Link>
              <Link href="/signup" className="block">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
