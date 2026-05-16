"use client"
import api from '@/lib/api';
import { Send } from 'lucide-react';
import Image from 'next/image'; 
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [error, setError] = useState("");

  const handleSubscribe = async () => {
  setMessage("");
  setError("");

  if (!email.trim()) {
    setError("Please enter your email");
    return;
  }

  try {
    setLoading(true);

    const response = await api.post("/other/api/v1/subscribe-newsletter/", {
      email,
    });

    setMessage(
      response?.data?.message ||
        "Subscribed successfully"
    );

    setEmail("");
  } catch (error: any) {
    setError(
      error?.response?.data?.message ||
        "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <footer className="bg-[#FAF9F8] pt-20 pb-8 mt-auto border-t border-gray-100 shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.03)] w-full flex-shrink-0">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        
        {/* Top part of footer */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-20 gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left text-gray-900">
             <div className="flex justify-center mb-4">
               {/* Replaced <img> with Next.js <Image> component */}
               <Image
                 src={"/images/Varivo_LOGO_RGB_boja.png"} // Use the imported image object directly
                 alt="Varivo Bistro Logo"
                 width={160} // You need to provide appropriate width
                 height={176} // You need to provide appropriate height
                 className="h-40 lg:h-44 w-auto object-contain"
               />
            </div>
             <p className="text-[14px] text-gray-400 font-light max-w-[200px] mt-2 leading-relaxed">
               Discover a World of food with Varivo bistro.
             </p>
          </div>
          
          <div className="md:w-1/2 w-full pt-4">
             <h2 className="text-xl md:text-2xl tracking-tight text-gray-800 text-center md:text-right border-b border-gray-200 pb-6 md:pb-8 font-medium">
               hello@varivobristro.com
             </h2>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-12 gap-x-6 mb-16 pt-6 border-t border-gray-200">
          {/* <div className="space-y-6">
            <h4 className="text-[16px] font-semibold text-gray-900">Booking Plan</h4>
            <div className="flex flex-col gap-4 text-[14px] text-gray-400 font-medium">
              <a href="#" className="hover:text-[#E86F24] transition-colors">Healthy food</a>
              <a href="#" className="hover:text-[#E86F24] transition-colors">Group Trip</a>
              <a href="#" className="hover:text-[#E86F24] transition-colors">Vlog</a>
            </div>
          </div> */}
          <div className="space-y-6">
            <h4 className="text-[16px] font-semibold text-gray-900">Support</h4>
            <div className="flex flex-col gap-4 text-[14px] text-gray-400 font-medium">
              <Link href="/faq" className="hover:text-[#E86F24] transition-colors">FAQ&apos;s</Link>
              <Link href="/privacy" className="hover:text-[#E86F24] transition-colors">Privacy Policy</Link>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[16px] font-semibold text-gray-900">Company</h4>
            <div className="flex flex-col gap-4 text-[14px] text-gray-400 font-medium">
              <Link href="/about" className="hover:text-[#E86F24] transition-colors">About Us</Link>
            </div>
          </div>
          
          <div className="col-span-2 space-y-6 md:ml-auto">
            <h4 className="text-[16px] font-semibold text-gray-900">Subscribe Our Newsletter</h4>
            <div className="flex w-full bg-white rounded-full overflow-hidden shadow-sm border border-gray-100 p-1.5 focus-within:ring-2 focus-within:ring-[#E86F24]/20 transition-all max-w-[400px]">
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" className="flex-1 bg-transparent px-4 py-2 outline-none text-[14px] placeholder:text-gray-300" />
              <button onClick={()=>handleSubscribe()} className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-8 py-2.5 rounded-full text-[14px] font-medium transition-colors">
                Book a Demo
              </button>
            </div>
            {message && (
  <p className="text-green-600 text-sm mt-3 px-2">
    {message}
  </p>
)}

{error && (
  <p className="text-red-500 text-sm mt-3 px-2">
    {error}
  </p>
)}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-gray-500 font-medium">&copy; Varivo Bristo 2026 All right reserved.</p>
          <div className="flex items-center gap-6 text-[#E86F24]">
            <a href="#" className="hover:scale-110 transition-transform"><FaFacebook size={18} fill="currentColor" strokeWidth={0}/></a>
            <a href="#" className="hover:scale-110 transition-transform"><FaTwitter size={18} fill="currentColor" strokeWidth={0}/></a>
            <a href="#" className="hover:scale-110 transition-transform"><FaLinkedin size={18} fill="currentColor" strokeWidth={0}/></a>
            <a href="#" className="hover:scale-110 transition-transform"><Send size={18} fill="currentColor" strokeWidth={0}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}