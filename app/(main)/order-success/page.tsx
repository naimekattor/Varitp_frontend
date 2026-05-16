"use client";

import React from "react";
import Link from "next/link";
import { Check, MapPin, Phone, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  const lastOrder = useCartStore((state) => state.lastOrder);
  const router = useRouter();

  useEffect(() => {
    if (!lastOrder) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [lastOrder, router]);

  if (!lastOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E86F24]"></div>
        <p className="text-gray-400 font-medium">Loading order details...</p>
      </div>
    );
  }

  const subtotal = lastOrder.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceCharge = parseFloat(lastOrder.charges?.find(c => c.name.toLowerCase().includes('service'))?.value || "0");
  const deliveryFee = parseFloat(lastOrder.charges?.find(c => c.name.toLowerCase().includes('delivery'))?.value || "0");
  const tax = parseFloat(lastOrder.charges?.find(c => c.name.toLowerCase().includes('tax'))?.value || "0");

  return (
    <div className="bg-white font-sans min-h-screen pb-24">
      {/* 1. Header Section */}
      <div className="pt-20 pb-12 text-center bg-gradient-to-b from-[#F0FDF4] to-white">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-green-100">
              <div className="w-12 h-12 bg-[#22C55E] rounded-full flex items-center justify-center text-white">
                <Check size={28} strokeWidth={3} />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-[3.25rem] font-serif font-bold text-gray-900 mb-4 tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Thank you for your order! Your delicious meal is being prepared and will be <br className="hidden md:block" /> delivered within 30-45 minutes.
          </p>
        </div>
      </div>

      <main className="w-full max-w-[1200px] mx-auto px-6">
        {/* 2. Map Section (Full Width) */}
        <div className="relative w-full h-[320px] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 mb-10 group">
          <iframe 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            allowFullScreen 
            src={`https://maps.google.com/maps?q=1033%20West%20Glebe%20Road%20Alexandria%20VA%2022305&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
          
          {/* Subtle labels like on the image */}
          <div className="absolute top-10 left-10 text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">Alexandria, VA</div>
        </div>

        {/* 3. Action Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/cart" className="hover:text-gray-600 transition-colors">Cart</Link>
              <span>/</span>
              <Link href="/checkout" className="hover:text-gray-600 transition-colors">Checkout</Link>
              <span>/</span>
              <span className="text-[#E86F24]">Order Tracking</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Order <span className="text-gray-400">#</span>{lastOrder.order_id}
            </h2>
          </div>

          {/* <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-500 font-bold text-sm hover:bg-gray-50 transition-all">
              <Phone size={18} className="text-gray-300" />
              +1 101 9249 9293 192
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#E86F24] hover:bg-[#d4621c] text-white font-bold text-sm transition-all shadow-[0_10px_20px_-5px_rgba(232,111,36,0.3)]">
              Mark as complete
            </button>
          </div> */}
        </div>

        {/* 4. Status Bar */}
        {/* <div className="w-full bg-[#E8F9EE] border border-[#D1FAE5] py-5 px-8 rounded-2xl mb-12 flex items-center justify-center text-[#10B981] font-bold text-[15px] shadow-sm">
          Your order is ready for pickup
        </div> */}

        {/* 5. Details Section (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Order Details */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Order Details</h3>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10 space-y-8">
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Order ID</p>
                <p className="text-lg font-bold text-gray-900">{lastOrder.order_id}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Order Time</p>
                <p className="text-lg font-bold text-gray-900">
                  {lastOrder.created_at ? new Date(lastOrder.created_at).toLocaleDateString('en-GB').replace(/\//g, '-') : '08-01-2024'} • {lastOrder.created_at ? new Date(lastOrder.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : '01:55 PM'}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Payment Method</p>
                <p className="text-lg font-bold text-gray-900">{lastOrder.payment_method || "Card"}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Store Address</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  1033 West Glebe Road Alexandria VA 22305
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Utensils & Condiments</p>
                <p className="text-lg font-bold text-gray-900">Included</p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Order Summary</h3>
            <div className="bg-[#F9FAFB] rounded-[2rem] p-10">
              <div className="space-y-6 mb-10 pb-10 border-b border-gray-200/60">
                {lastOrder.order_items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-[15px] font-bold text-gray-900">
                      <span className="text-gray-400 mr-2">x{item.quantity}</span> {item.title}
                    </p>
                    <p className="text-[15px] font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-500 font-bold">Subtotal</span>
                  <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>
                {serviceCharge > 0 && (
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-bold">Service Charges</span>
                    <span className="text-gray-900 font-bold">${serviceCharge.toFixed(2)}</span>
                  </div>
                )}
                {deliveryFee > 0 && (
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-bold">Delivery Fee</span>
                    <span className="text-gray-900 font-bold">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                {tax > 0 && (
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-bold">Tax</span>
                    <span className="text-gray-900 font-bold">${tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200/60">
                  <span className="text-2xl font-serif font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">
                    ${parseFloat(lastOrder.total_amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 px-10 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 hover:text-[#E86F24] border border-gray-100 hover:border-orange-100 py-4 px-10 rounded-xl font-bold transition-all active:scale-[0.98]"
          >
            <ArrowLeft size={18} />
            View Order History
          </Link>
        </div>
      </main>
    </div>
  );
}
