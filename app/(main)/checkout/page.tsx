"use client"
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, CreditCard, Truck, User } from 'lucide-react';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        firstName: session.user.name?.split(' ')[0] || '',
        lastName: session.user.name?.split(' ')[1] || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  const subtotal = useCartStore((state) => state.totalPrice);
  const deliveryFee = subtotal > 0 ? 4.99 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend
    // For now, clear cart and redirect to home
    alert("Order placed successfully!");
    clearCart();
    router.push('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">You need to add some delicious food to your cart before checking out.</p>
        <Link href="/" className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-8 py-3.5 rounded-xl font-bold transition-all">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans min-h-screen">
      <div className="bg-gradient-to-b from-[#FFF5F0]/60 to-white pt-32 pb-12">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="text-[13px] font-medium mb-6 text-gray-400 flex items-center gap-1.5">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link> 
            <span>/</span> 
            <Link href="/cart" className="hover:text-gray-700 transition-colors">Cart</Link> 
            <span>/</span> 
            <span className="text-[#E86F24]">Checkout</span>
          </div>
          <h1 className="text-4xl md:text-[2.75rem] font-serif font-bold text-gray-900 mb-10 tracking-tight">Checkout</h1>
        </div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto px-6 pb-24">
        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-[60%] space-y-8">
            {/* Personal Information */}
            <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#E86F24]">
                  <User size={20} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">First Name</label>
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} type="text" placeholder="John" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Last Name</label>
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} type="text" placeholder="Doe" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Email Address</label>
                  <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder="john@example.com" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Phone Number</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" placeholder="+1 (555) 000-0000" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#E86F24]">
                  <Truck size={20} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Delivery Address</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Street Address</label>
                  <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} type="text" placeholder="123 Main St, Apt 4B" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">City</label>
                  <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" placeholder="New York" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">ZIP Code</label>
                  <input required value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} type="text" placeholder="10001" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] rounded-[2rem] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#E86F24]">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">Payment Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Cardholder Name</label>
                  <input required value={formData.cardName} onChange={e => setFormData({...formData, cardName: e.target.value})} type="text" placeholder="JOHN DOE" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm uppercase" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Card Number</label>
                  <input required value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} type="text" placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm tracking-widest" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Expiry Date</label>
                  <input required value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} type="text" placeholder="MM/YY" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">CVV</label>
                  <input required value={formData.cvv} onChange={e => setFormData({...formData, cvv: e.target.value})} type="password" placeholder="***" maxLength={3} className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="w-full lg:w-[40%] bg-white border border-gray-100 rounded-[2.5rem] p-10 sticky top-32 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 tracking-tight">Your Order</h2>
            
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                   <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-50 relative border border-gray-50">
                     <Image
                       src={item.image}
                       alt={item.title}
                       fill
                       className="object-cover"
                     />
                   </div>
                   <div className="flex-1">
                     <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.title}</h4>
                     <p className="text-[11px] text-gray-400 mt-1 font-medium">Quantity: {item.quantity}</p>
                   </div>
                   <div className="text-sm font-bold text-gray-900">
                     ${(item.price * item.quantity).toFixed(2)}
                   </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-10 pb-10 border-b border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Delivery</span>
                <span className="text-gray-900 font-bold">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Tax</span>
                <span className="text-gray-900 font-bold">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-10">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-[#E86F24] tracking-tight">${total.toFixed(2)}</span>
            </div>

            <button type="submit" className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-5 rounded-2xl font-bold transition-all shadow-[0_15px_30px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] text-[15px]">
              Complete Purchase
            </button>
            <Link href="/cart" className="w-full mt-4 bg-white text-gray-500 hover:text-gray-900 py-3 rounded-xl font-bold transition-all text-xs flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> Edit Cart
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}