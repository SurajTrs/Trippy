'use client';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Adventure Traveler',
      location: 'New York, USA',
      content: 'Tripy made my solo trip to Japan absolutely seamless! The AI assistant booked everything perfectly.',
      rating: 5,
      image: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Business Executive',
      location: 'Singapore',
      content: 'Real-time updates and voice commands save me hours of planning time. Best travel assistant ever!',
      rating: 5,
      image: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Travel Blogger',
      location: 'Barcelona, Spain',
      content: 'The personalized itineraries are incredible! Found hidden gems I would never have discovered.',
      rating: 5,
      image: 'ER'
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 right-20 w-96 h-96 bg-violet-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-bold inline-block mb-6">
            💬 TESTIMONIALS
          </span>
          <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Loved by Travelers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join 50,000+ travelers who trust Tripy for their journeys
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-violet-300 hover:-translate-y-2 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                  {testimonial.image}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-violet-600 flex items-center gap-1">
                    <i className="ri-map-pin-line"></i>
                    {testimonial.location}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-yellow-400 text-xl"></i>
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center text-sm text-green-600 font-semibold">
                <i className="ri-check-double-line mr-2 text-lg"></i>
                Verified Traveler
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold mb-2">4.9★</div>
              <div className="text-violet-100 text-lg">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">50K+</div>
              <div className="text-violet-100 text-lg">Happy Travelers</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">150+</div>
              <div className="text-violet-100 text-lg">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
