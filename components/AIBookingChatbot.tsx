'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2, Plane, Hotel, Car, Calendar, Users, DollarSign } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tripData?: any;
}

export default function AIBookingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI travel assistant. Tell me where you want to go, and I\'ll help you book your entire trip!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages })
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        tripData: data.tripData
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = async (tripData: any) => {
    // Check if user is logged in
    const sessionToken = document.cookie.split('; ').find(row => row.startsWith('session_token='));
    if (!sessionToken) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Please login to complete your booking. Redirecting to login page...',
        timestamp: new Date()
      }]);
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/book-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tripPlan: tripData })
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = `/booking-success?id=${result.bookingId}`;
      } else {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'assistant',
          content: `Booking failed: ${result.message}`,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Booking failed. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
        >
          <div className="relative">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white p-5 rounded-t-2xl flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <i className="ri-robot-2-line text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Travel Assistant</h3>
                <p className="text-xs text-purple-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online • Real-time booking
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-all hover:rotate-90 duration-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  {msg.tripData && (
                    <div className="mt-3 space-y-2 bg-white/10 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-xs">
                        <Plane className="w-4 h-4" />
                        <span>{msg.tripData.from} → {msg.tripData.to}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-4 h-4" />
                        <span>{msg.tripData.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <DollarSign className="w-4 h-4" />
                        <span>₹{msg.tripData.total?.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleBook(msg.tripData)}
                        className="w-full mt-2 bg-white text-purple-600 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                      >
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl p-3">
                  <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
