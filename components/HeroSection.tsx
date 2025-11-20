'use client';

import { useState } from 'react';
import Globesec from './Globesec';

interface HeroSectionProps {
  onActivateAssistant: () => void;
  isListening: boolean;
}

export default function HeroSection({ onActivateAssistant, isListening }: HeroSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/b4.png')`,
          backgroundPosition: 'center -45%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b]/90 via-[#3b0764]/85 to-[#312e81]/90" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left Side */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-block">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold text-violet-200 mb-4 inline-block">
                ✨ AI-Powered Travel Planning
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white via-violet-100 to-purple-200 bg-clip-text text-transparent">
              Discover. Plan. Travel.
            </h1>
            <p className="text-xl lg:text-2xl text-violet-200 font-semibold">
              Your Intelligent Travel Companion
            </p>
            <p className="text-base lg:text-lg text-violet-100/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the future of travel planning with AI. From personalized itineraries to instant bookings, Tripy makes every journey effortless.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
              <div className="relative group">
                <button
                  onClick={onActivateAssistant}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative z-10 px-8 py-5 text-lg font-bold rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-2xl transition-all duration-300 transform ${
                    isListening ? 'animate-pulse scale-105' : 'hover:scale-110'
                  }`}
                >
                  <div className="flex items-center gap-3 justify-center">
                    <i className="ri-mic-line text-2xl"></i>
                    {isListening ? 'Listening...' : 'Start Planning'}
                  </div>
                </button>
                {(isListening || isHovered) && (
                  <div className="absolute inset-0 z-0 rounded-2xl bg-white/20 blur-2xl animate-ping" />
                )}
              </div>
              <button className="px-8 py-5 text-lg font-bold rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center gap-2">
                  <i className="ri-play-circle-line text-2xl"></i>
                  Watch Demo
                </div>
              </button>
            </div>
            <p className="text-sm text-violet-200/80 flex items-center gap-2 justify-center lg:justify-start">
              <i className="ri-sparkling-line"></i>
              Try: &ldquo;Plan my trip from Delhi to Manali&rdquo;
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                ['50K+', 'Trips Planned', 'ri-flight-takeoff-line'],
                ['4.9★', 'User Rating', 'ri-star-line'],
                ['24/7', 'AI Support', 'ri-customer-service-2-line'],
              ].map(([value, label, icon]) => (
                <div
                  key={label}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                >
                  <i className={`${icon} text-3xl text-violet-300 mb-2`}></i>
                  <div className="text-3xl font-extrabold">{value}</div>
                  <div className="text-sm text-violet-200 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Assistant Visual */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Main Orb */}
              <div className="min-h-screen flex items-center justify-center bg-transparent">
                <Globesec />
              </div>

              {/* Floating Icons */}
              {[
                { icon: 'ri-flight-takeoff-line', position: '-top-4 -right-4', color: 'from-blue-500 to-cyan-500' },
                { icon: 'ri-hotel-line', position: '-bottom-4 -left-4', delay: 'delay-200', color: 'from-pink-500 to-rose-500' },
                { icon: 'ri-map-pin-line', position: 'top-1/2 -left-8', delay: 'delay-500', color: 'from-green-500 to-emerald-500' },
                { icon: 'ri-restaurant-line', position: 'top-1/2 -right-8', delay: 'delay-700', color: 'from-orange-500 to-amber-500' },
              ].map(({ icon, position, delay, color }) => (
                <div
                  key={icon}
                  className={`absolute ${position} w-16 h-16 bg-gradient-to-br ${color} backdrop-blur-md rounded-2xl flex items-center justify-center animate-float ${delay || ''} shadow-2xl border border-white/20`}
                >
                  <i className={`${icon} text-white text-2xl`}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Icon */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-violet-200 font-semibold">Explore More</span>
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
            <i className="ri-arrow-down-line text-white text-xl"></i>
          </div>
        </div>
      </div>
    </section>
  );
}
