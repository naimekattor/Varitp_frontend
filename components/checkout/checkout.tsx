"use client"
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, CreditCard, Truck, User } from 'lucide-react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from '@/lib/api';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const setLastOrder = useCartStore((state) => state.setLastOrder);
  const charges = useCartStore((state) => state.charges);
  const coupon = useCartStore((state) => state.coupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);
  const finalAmount = useCartStore((state) => state.finalAmount);
  const fetchCart = useCartStore((state) => state.fetchCart);
  
  const router = useRouter();
  const { data: session } = useSession();
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardholderName: '',
  });
  const [couponInput, setCouponInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        firstName: session.user.first_name?.split(' ')[0] || '',
        lastName: session.user.last_name?.split(' ')[1] || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Sync couponInput with the applied coupon from store
  useEffect(() => {
    if (coupon?.code) {
      setCouponInput(coupon.code);
    }
  }, [coupon]);

  const subtotal = useCartStore((state) => state.totalPrice);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) {
      setError('Please enter a coupon code');
      return;
    }
    setIsApplyingCoupon(true);
    setError(null);
    try {
      await applyCoupon(couponInput);
      
    } catch (err) {
      console.error("Coupon error:", err);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = async () => {
    setIsApplyingCoupon(true);
    setError(null);
    try {
      await removeCoupon();
      setCouponInput('');
    } catch (err) {
      console.error("Remove coupon error:", err);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setError("Payment details not found. Please refresh and try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement)!,
        billing_details: {
          name: formData.cardholderName || `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: {
            line1: formData.address,
            city: formData.city,
            postal_code: formData.zipCode,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || "An error occurred with your card.");
        setIsProcessing(false);
        return;
      }

      const payload: any = {
        payment_method_id: paymentMethod.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: "Dhaka", // Default or you could add a field
        zip_code: formData.zipCode,
        phone: formData.phone,
        email: formData.email,
      };

      if (couponInput.trim()) {
        payload.coupon = couponInput;
      }

      const response = await api.post("/payment/api/v1/place-order/", payload);

      if (response.data.status || response.data.success) {
        setSuccess(true);
        // setCouponInput('');
        
        const order = response.data.order;
        
        // Store order data
        const orderData = {
          order_id: order?.order_id || response.data.order_id || 'UNKNOWN',
          total_amount: order?.total_amount || finalAmount.toString(),
          order_items: items, // Keep local items for visual consistency, or use order.order_items if they have full info
          charges: charges,
          payment_method: "Card",
          first_name: order?.first_name || formData.firstName,
          last_name: order?.last_name || formData.lastName,
          phone: order?.phone || formData.phone,
          address: order?.address || formData.address,
          city: order?.city || formData.city,
          zip_code: order?.zip_code || formData.zipCode,
          created_at: order?.created_at || new Date().toISOString(),
          
        };
        
        setLastOrder(orderData);
        clearCart();
        
        console.log("Order created successfully:", orderData);
        
        // Redirect to success page
        setTimeout(() => {
          router.push('/order-success');
        }, 1500);
      } else {
        setError(response.data.message || "Failed to place order.");
      }
    } catch (err: any) {
      console.error("Order error:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
              
              <div className="space-y-6">
                {/* Cardholder Name */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Cardholder Name *</label>
                  <input 
                    required 
                    value={formData.cardholderName} 
                    onChange={e => setFormData({...formData, cardholderName: e.target.value})} 
                    type="text" 
                    placeholder="Enter the Card Holder Name" 
                    className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus:bg-white focus:border-[#E86F24] transition-all text-sm" 
                  />
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-gray-700 ml-1">Card Number *</label>
                  <div className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus-within:bg-white focus-within:border-[#E86F24] transition-all">
                    <CardNumberElement 
                      options={{
                        style: {
                          base: { fontSize: "14px", color: "#111827", "::placeholder": { color: "#9CA3AF" } },
                        },
                        placeholder: "1234 5678 9012 3456"
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700 ml-1">Expiry Date *</label>
                    <div className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus-within:bg-white focus-within:border-[#E86F24] transition-all">
                      <CardExpiryElement 
                        options={{
                          style: {
                            base: { fontSize: "14px", color: "#111827", "::placeholder": { color: "#9CA3AF" } },
                          },
                        }}
                      />
                    </div>
                  </div>

                  {/* CVV */}
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700 ml-1">CVV *</label>
                    <div className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/30 outline-none focus-within:bg-white focus-within:border-[#E86F24] transition-all">
                      <CardCvcElement 
                        options={{
                          style: {
                            base: { fontSize: "14px", color: "#111827", "::placeholder": { color: "#9CA3AF" } },
                          },
                          placeholder: "123"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Text */}
                <div className="mt-8 p-4 bg-[#F9FAFB] rounded-xl text-center">
                  <p className="text-[12px] text-gray-400 font-medium">
                    Your payment information is encrypted and secure. We do not store your card details.
                  </p>
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
                        src={item.image || "/images/GOJ_3134.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/GOJ_3134.jpg"; // Use a reliable fallback
                        }}
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

            <div className="flex justify-between items-end mb-10">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-[#E86F24] tracking-tight">${finalAmount.toFixed(2)}</span>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 text-sm">
                <CheckCircle2 size={18} />
                <span>✓ Payment completed successfully! Redirecting to success page...</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing || success}
              className={`w-full ${isProcessing || success ? 'bg-gray-400' : 'bg-[#E86F24] hover:bg-[#d4621c]'} text-white py-5 rounded-2xl font-bold transition-all shadow-[0_15px_30px_-5px_rgba(232,111,36,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(232,111,36,0.4)] active:scale-[0.98] text-[15px] flex items-center justify-center gap-2`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing Payment...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={20} />
                  Redirecting to Success...
                </>
              ) : (
                'Complete Purchase'
              )}
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
