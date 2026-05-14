"use client"
import Image from 'next/image';
import { ShoppingCart as CartIcon, Trash2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ShoppingCartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.totalPrice);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const isLoading = useCartStore((state) => state.isLoading);
  const error = useCartStore((state) => state.error);
  const charges = useCartStore((state) => state.charges);
  const coupon = useCartStore((state) => state.coupon);
  const finalAmount = useCartStore((state) => state.finalAmount);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  
  const router = useRouter();
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      return;
    }
    setIsApplyingCoupon(true);
    try {
      await applyCoupon(couponInput);
      setCouponInput('');
    } catch (err) {
      console.error("Coupon error:", err);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setIsApplyingCoupon(true);
    try {
      await removeCoupon();
    } catch (err) {
      console.error("Remove coupon error:", err);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const deliveryFee = 0; // subtotal > 0 ? 4.99 : 0;
  const tax = 0; // subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-[#E86F24]">
          <CartIcon size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Browse our menu to find something delicious!</p>
        <Link 
          href="/"
          className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-200"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Header Space for layout Header */}
      <div className="bg-gradient-to-b from-[#FFF5F0]/60 to-white pt-32 pb-12">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="text-[13px] font-medium mb-6 text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link> / <span className="text-[#E86F24]">Cart</span>
          </div>
          <h1 className="text-4xl md:text-[2.75rem] font-serif font-bold text-gray-900 tracking-tight">Your Shopping Cart</h1>
        </div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Cart Items */}
          <div className="w-full lg:w-[60%] space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 relative group transition-all hover:border-orange-100">
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={20} strokeWidth={1.5} />
                </button>

                <div className="w-full sm:w-[150px] h-[150px] shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-gray-50">
                  <Image
                    src={item.image || "/images/GOJ_3134.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/GOJ_3134.jpg"; // Reliable fallback
                    }}
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E86F24] mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-serif text-gray-900 mb-2 leading-tight font-bold">{item.title}</h3>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => item.quantity <= 1 ? removeItem(item.id) : updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                      >
                        -
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#E86F24] mb-1">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="text-[11px] text-gray-400 font-medium">${item.price.toFixed(2)} each</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[40%] bg-white border border-gray-100 rounded-[2.5rem] p-10 sticky top-32 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-10 tracking-tight">Order Summary</h2>

            <div className="space-y-5 mb-10 pb-10 border-b border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              
              {/* Display Charges */}
              {charges.map((charge) => (
                <div key={charge.name} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium capitalize">
                    {charge.name === 'delivery_fee' ? 'Delivery Fee' : charge.name}
                  </span>
                  <span className="text-gray-900 font-bold">${parseFloat(charge.value).toFixed(2)}</span>
                </div>
              ))}
              
              {/* Display Coupon Discount */}
              {coupon && (
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span className="font-medium">Coupon ({coupon.code})</span>
                  <span className="font-bold">-${parseFloat(coupon.discount_value).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Promo Code Input */}
            {!coupon && (
              <div className="mb-8 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Promo code" 
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm"
                  disabled={isApplyingCoupon}
                />
                <button 
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon}
                  className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-bold transition-all text-sm disabled:opacity-50"
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              </div>
            )}

            {coupon && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Coupon <strong>{coupon.code}</strong> applied!</span>
                <button 
                  type="button"
                  onClick={handleRemoveCoupon}
                  disabled={isApplyingCoupon}
                  className="text-xs text-green-600 hover:text-green-700 font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="flex justify-between items-end mb-12">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <div className="text-right">
                <span className="text-4xl font-bold text-[#E86F24] tracking-tight block">${finalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-5 rounded-2xl font-bold transition-all shadow-[0_15px_30px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] text-[15px]"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/"
                className="w-full bg-white text-gray-500 hover:text-[#E86F24] py-5 rounded-2xl font-bold transition-all text-[15px] border border-gray-100 hover:border-orange-100 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
