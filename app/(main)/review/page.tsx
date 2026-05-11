"use client"
import Image from 'next/image'; // Import Next.js Image component
import {  Star, ThumbsUp } from 'lucide-react';

export default function ReviewPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      date: "March 15, 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Absolutely amazing! The Chicken Roll with Ricotta was phenomenal. Fresh ingredients, perfect seasoning, and delivered right on time. Will definitely order again!",
      helpfulCount: 24,
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      date: "March 15, 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Absolutely amazing! The Chicken Roll with Ricotta was phenomenal. Fresh ingredients, perfect seasoning, and delivered right on time. Will definitely order again!",
      helpfulCount: 24,
    },
    {
      id: 3,
      name: "Sarah Mitchell",
      date: "March 15, 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Absolutely amazing! The Chicken Roll with Ricotta was phenomenal. Fresh ingredients, perfect seasoning, and delivered right on time. Will definitely order again!",
      helpfulCount: 24,
    },
    {
      id: 4,
      name: "Sarah Mitchell",
      date: "March 15, 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      text: "Absolutely amazing! The Chicken Roll with Ricotta was phenomenal. Fresh ingredients, perfect seasoning, and delivered right on time. Will definitely order again!",
      helpfulCount: 24,
    }
  ];

  return (
    <div className="bg-white font-sans overflow-x-hidden text-gray-900 mx-auto w-full flex-1">
      {/* Navigation removed - using global Header */}

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFF5F0]/60 to-white pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <p className="text-[#E86F24] font-semibold text-[11px] mb-4 tracking-widest uppercase">Customer Reviews</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight font-medium">What Our Customers Say</h1>

          <div className="flex items-center justify-center gap-4">
            <div className="flex text-[#FFC107] gap-1">
              <Star size={20} fill="currentColor" strokeWidth={0} />
              <Star size={20} fill="currentColor" strokeWidth={0} />
              <Star size={20} fill="currentColor" strokeWidth={0} />
              <Star size={20} fill="currentColor" strokeWidth={0} />
              <Star size={20} fill="none" className="text-gray-300" strokeWidth={2} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-semibold text-gray-900">4.7</span>
              <span className="text-[12px] text-gray-400 font-medium">(24 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-6 py-8 md:py-16 min-h-[60vh]">

        {/* Breadcrumb excluded per request (Image 2) */}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mt-4">

          {/* Reviews List */}
          <div className="w-full lg:w-[65%] space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border text-left border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8">

                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {/* Replaced <img> with Next.js <Image> component */}
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48} // w-12 is 48px, use this as explicit width
                      height={48} // h-12 is 48px, use this as explicit height
                      objectFit="cover" // Matches your "object-cover" class
                      className="rounded-full shadow-sm bg-gray-100"
                    />
                    <div>
                      <h3 className="text-[15px] font-semibold text-gray-900">{review.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex text-[#FFC107] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-200" : ""} strokeWidth={i >= review.rating ? 2 : 0} />
                    ))}
                  </div>
                </div>

                <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
                  {review.text}
                </p>

                <div className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer w-fit">
                   <ThumbsUp size={14} strokeWidth={2} />
                   <span className="text-[11px] font-medium">Helpful ({review.helpfulCount})</span>
                </div>

              </div>
            ))}
          </div>

          {/* Leave a Review Form */}
          <div className="w-full lg:w-[35%] bg-[#FAF9F8] border border-gray-100 rounded-[1.5rem] p-8 sticky top-8 shadow-sm">
             <h2 className="text-[1.25rem] font-serif font-medium text-gray-900 mb-6">Leave a Review</h2>

             <form className="space-y-5" onSubmit={e => e.preventDefault()}>
               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-800">Your Name *</label>
                 <input type="text" className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px]" />
               </div>

               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-800">Email Address *</label>
                 <input type="email" className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px]" />
               </div>

               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-gray-800">Rating *</label>
                 <div className="flex text-[#FFC107] gap-1.5">
                    <Star size={24} fill="currentColor" strokeWidth={0} className="cursor-pointer hover:scale-110 transition-transform" />
                    <Star size={24} fill="currentColor" strokeWidth={0} className="cursor-pointer hover:scale-110 transition-transform" />
                    <Star size={24} fill="currentColor" strokeWidth={0} className="cursor-pointer hover:scale-110 transition-transform" />
                    <Star size={24} fill="currentColor" strokeWidth={0} className="cursor-pointer hover:scale-110 transition-transform" />
                    <Star size={24} fill="currentColor" strokeWidth={0} className="cursor-pointer hover:scale-110 transition-transform" />
                 </div>
               </div>

               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-800">Your Review *</label>
                 <textarea
                   rows={4}
                   placeholder="Share your experience..."
                   className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-300 resize-none"
                 ></textarea>
               </div>

               <button type="submit" className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-3.5 rounded-xl font-medium transition-colors shadow-sm text-[13px] mt-2">
                 Submit a review
               </button>
             </form>
          </div>
        </div>
      </main>
    </div>
  );
}