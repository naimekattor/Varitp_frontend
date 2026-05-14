"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, Loader2 } from 'lucide-react';
import api from '@/lib/api';

type Review = {
  id: string;
  likes: number;
  is_like: boolean;
  name: string;
  email: string;
  rating: number;
  review: string;
  created_at: string;
};

export default function ReviewPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'warning' | null, message: string | null }>({ type: null, message: null });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    review: '',
  });

  const fetchReviews = async () => {
    try {
      const response = await api.get('/other/api/v1/feedback/');
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: null });

    if (!formData.name || !formData.email || !formData.review) {
      setStatus({ type: 'warning', message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post('/other/api/v1/feedback/', formData);
      if (response.data) {
        setReviews([response.data, ...reviews]);
        setFormData({ name: '', email: '', rating: 5, review: '' });
        setStatus({ type: 'success', message: 'Review Submitted! Thank you for your feedback.' });
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
      setStatus({ type: 'error', message: 'Submission Failed. Something went wrong. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await api.post(`/other/api/v1/feedback/like/${id}/`);
      if (response.data) {
        setReviews(reviews.map((r) => {
          if (r.id === id) {
            return {
              ...r,
              likes: response.data.likes,
              is_like: !r.is_like // Toggle local state based on expected behavior
            };
          }
          return r;
        }));
      }
    } catch (error) {
      console.error('Failed to like review:', error);
      // Optional: Add a small toast if like fails, but usually silent is fine
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="bg-white font-sans overflow-x-hidden text-gray-900 mx-auto w-full flex-1">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#FFF5F0]/60 to-white pt-24 pb-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <p className="text-[#E86F24] font-semibold text-[11px] mb-4 tracking-widest uppercase">Customer Reviews</p>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight font-medium">What Our Customers Say</h1>

          <div className="flex items-center justify-center gap-4">
            <div className="flex text-[#FFC107] gap-1">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill={i < Math.round(Number(avgRating)) ? "currentColor" : "none"} className={i >= Math.round(Number(avgRating)) ? "text-gray-300" : ""} strokeWidth={i >= Math.round(Number(avgRating)) ? 2 : 0} />
               ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-semibold text-gray-900">{avgRating}</span>
              <span className="text-[12px] text-gray-400 font-medium">({reviews.length} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1100px] mx-auto px-6 py-8 md:py-16 min-h-[60vh]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start mt-4">
          {/* Reviews List */}
          <div className="w-full lg:w-[65%] space-y-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-[#E86F24]" size={32} />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                No reviews yet. Be the first to leave one!
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-white border text-left border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-2xl p-6 sm:p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#E86F24] text-white rounded-full flex items-center justify-center font-bold text-lg uppercase">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-gray-900">{review.name}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {new Date(review.created_at).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex text-[#FFC107] gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-200" : ""} strokeWidth={i >= review.rating ? 2 : 0} />
                      ))}
                    </div>
                  </div>

                  <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
                    {review.review}
                  </p>

                  <button 
                    onClick={() => handleLike(review.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer w-fit ${review.is_like ? 'text-[#E86F24]' : 'text-gray-400 hover:text-gray-700'}`}
                  >
                     <ThumbsUp size={14} strokeWidth={2} fill={review.is_like ? "currentColor" : "none"} />
                     <span className="text-[11px] font-medium">Helpful ({review.likes})</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Leave a Review Form */}
          <div className="w-full lg:w-[35%] bg-[#FAF9F8] border border-gray-100 rounded-[1.5rem] p-8 sticky top-8 shadow-sm">
             <h2 className="text-[1.25rem] font-serif font-medium text-gray-900 mb-6">Leave a Review</h2>

             <form className="space-y-5" onSubmit={handleSubmit}>
               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-800">Your Name *</label>
                 <input 
                   type="text" 
                   required
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px]" 
                 />
               </div>

               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-800">Email Address *</label>
                 <input 
                   type="email" 
                   required
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px]" 
                 />
               </div>

               <div className="space-y-2">
                 <label className="text-[11px] font-bold text-gray-800">Rating *</label>
                 <div className="flex text-[#FFC107] gap-1.5">
                   {[1, 2, 3, 4, 5].map((star) => (
                     <Star 
                       key={star}
                       size={24} 
                       fill={star <= formData.rating ? "currentColor" : "none"}
                       className={`cursor-pointer transition-transform ${star <= formData.rating ? "" : "text-gray-300"}`}
                       strokeWidth={star <= formData.rating ? 0 : 2}
                       onClick={() => setFormData({...formData, rating: star})}
                     />
                   ))}
                 </div>
               </div>

               <div className="space-y-1.5">
                 <label className="text-[11px] font-bold text-gray-800">Your Review *</label>
                 <textarea
                   rows={4}
                   required
                   value={formData.review}
                   onChange={(e) => setFormData({...formData, review: e.target.value})}
                   placeholder="Share your experience..."
                   className="w-full bg-white px-4 py-3 rounded-xl border border-gray-200/60 outline-none focus:border-[#E86F24] transition-all text-[13px] placeholder:text-gray-300 resize-none"
                 ></textarea>
               </div>

               <button 
                 type="submit" 
                 disabled={submitting}
                 className="w-full bg-[#E86F24] hover:bg-[#d4621c] disabled:bg-gray-400 text-white py-3.5 rounded-xl font-medium transition-colors shadow-sm text-[13px] mt-2 flex justify-center items-center gap-2"
               >
                 {submitting ? (
                   <><Loader2 className="animate-spin" size={16} /> Submitting...</>
                 ) : (
                   'Submit a review'
                 )}
               </button>

               {status.message && (
                 <div className={`mt-4 p-4 rounded-xl text-sm font-medium text-center ${
                   status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 
                   status.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                   'bg-red-50 text-red-700 border border-red-100'
                 }`}>
                   {status.message}
                 </div>
               )}
             </form>
          </div>
        </div>
      </main>
    </div>
  );
}