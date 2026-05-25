"use client";

import React, { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";

const faqs = [
  {
    question: "What is Varivo?",
    answer: "Varivo is a premium food delivery service dedicated to bringing you fresh, traditional dishes prepared daily with the finest ingredients. We bridge the gap between high-quality bistro dining and the convenience of your home.",
  },
  {
    question: "How do I place an order?",
    answer: "Placing an order is simple! Browse our menu, add your favorite items to the cart, and proceed to checkout. You can pay securely using your credit or debit card.",
  },
  {
    question: "What are your delivery hours?",
    answer: "We deliver every day from 11:00 AM to 10:00 PM. You can also schedule orders in advance through our checkout system.",
  },
  {
    question: "Is there a minimum order amount?",
    answer: "No, we don't have a minimum order amount. However, delivery fees may vary based on your location and the size of your order.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is placed, you'll be redirected to the Order Success page where you can see the status of your meal preparation.",
  },
  {
    question: "Can I cancel my order?",
    answer: "After order placed, our chefs start preparing your meal, and we can no longer process cancellations.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-32">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
          Frequently Asked <span className="text-[#E86F24]">Questions</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
          Everything you need to know about our service, delivery, and quality standards.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-[#E86F24] focus:ring-4 focus:ring-orange-500/5 transition-all text-gray-900 outline-none shadow-sm"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div 
              key={index}
              className={`border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-xl shadow-orange-500/5 border-orange-100' : 'hover:border-gray-200'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-7 text-left bg-white hover:bg-gray-50/50 transition-colors"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-[#E86F24]' : 'text-gray-900'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-[#E86F24] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-7 pb-8 text-gray-500 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-24 text-center p-12 bg-[#FDF7F2] rounded-[3rem] border border-[#FBE9D9]">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 mb-8">We're here to help! Contact our support team for any further assistance.</p>
          <a 
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#E86F24] hover:bg-[#d4621c] text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
