"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/src/i18n/navigation";
import Image from "next/image";
import { CheckCircle, Phone, MapPin, Clock, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useParams } from "next/navigation";

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  food_item: {
    id: string;
    name: string;
    price: string;
    images?: { image: string }[];
  };
}

interface Order {
  id: string;
  order_id: string;
  total_amount: string;
  status: string;
  created_at: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  zip_code: string;
  order_items: OrderItem[];
  payment_method?: string;
  charges?: { name: string; value: string }[];
}

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }
      
      try {
        console.log("Fetching order details for:", orderId);
        const response = await api.get(`/order/api/v1/orders/${orderId}/`);
        console.log("Order response:", response.data);
        
        // Handle different response structures
        if (response.data.success && response.data.data) {
          setOrder(response.data.data);
        } else if (response.data.data) {
          setOrder(response.data.data);
        } else if (response.data) {
          setOrder(response.data);
        }
      } catch (err: any) {
        console.error("Fetch order error:", err);
        setError(err.response?.data?.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="animate-spin text-[#E86F24]" size={40} />
        <p className="text-gray-400 font-medium">Loading order details...</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-50 text-green-600 border-green-100";
      case "pending":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "delivered":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Error Loading Order</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">{error || "Could not load order details"}</p>
        <Link 
          href="/orders"
          className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-8 py-3.5 rounded-xl font-bold transition-all"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const subtotal = order.order_items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
  const deliveryFee = order.charges?.find(c => c.name.toLowerCase().includes('delivery'))?.value || "0";
  const tax = order.charges?.find(c => c.name.toLowerCase() === 'tax')?.value || "0";
  const total = parseFloat(order.total_amount);

  return (
    <div className="bg-white font-sans min-h-screen pb-12">
      {/* Success Header */}
      <div className="bg-gradient-to-b from-green-50 to-white py-12">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Thank you for your order! Your delicious meal is being prepared and will be delivered within 30-45 minutes.
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="text-[13px] font-medium text-gray-400 text-center">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link> / 
            <Link href="/orders" className="hover:text-gray-700 transition-colors"> Orders</Link> / 
            <span className="text-[#E86F24]"> Order Tracking</span>
          </div>
        </div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto px-6">
        {/* Map and Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 mt-12">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden shadow-lg h-80 bg-gray-50 flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <MapPin size={48} className="text-[#E86F24] mx-auto mb-3 opacity-50" />
                <p className="text-gray-400">Delivery location map</p>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Order Number</h2>
              <p className="text-4xl font-bold text-gray-900 mb-6">#{order.order_id}</p>

              <div className="space-y-4 mb-8 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                  <div className="flex items-center gap-2 text-gray-900 font-medium">
                    <Phone size={16} className="text-[#E86F24]" />
                    <span>{order.phone}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider inline-block ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#E86F24] hover:bg-[#d4621c] text-white py-3 rounded-xl font-bold transition-all">
              Mark as complete
            </button>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12 text-center">
          <p className="text-green-700 font-semibold">✓ Your order is ready for pickup / out for delivery</p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Details */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-8">Order Details</h2>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order ID</p>
                <p className="text-lg font-bold text-gray-900">{order.order_id}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Order Time</p>
                <p className="text-gray-900 font-medium">{new Date(order.created_at).toLocaleDateString()} / {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Payment Method</p>
                <p className="text-gray-900 font-medium">{order.payment_method || "Card"}</p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Store Address</p>
                <p className="text-gray-900 font-medium">
                  {order.address}, {order.city} {order.zip_code}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Utensils & Condiments</p>
                <p className="text-gray-900 font-medium">Included</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-8">Order Summary</h2>

            {/* Items List */}
            <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {item.food_item.images?.[0]?.image ? (
                        <Image
                          src={item.food_item.images[0].image}
                          alt={item.food_item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">x{item.quantity} {item.food_item.name}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">Subtotal</span>
                <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>

              {parseFloat(deliveryFee) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Delivery Fee</span>
                  <span className="text-gray-900 font-bold">${parseFloat(deliveryFee).toFixed(2)}</span>
                </div>
              )}

              {parseFloat(tax) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Tax</span>
                  <span className="text-gray-900 font-bold">${parseFloat(tax).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-100">
                <span className="text-gray-900">Total</span>
                <span className="text-[#E86F24]">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/orders"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 hover:text-[#E86F24] border border-gray-100 hover:border-orange-100 py-4 px-8 rounded-xl font-bold transition-all"
          >
            <ArrowLeft size={18} />
            View All Orders
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-[#E86F24] hover:bg-[#d4621c] text-white py-4 px-8 rounded-xl font-bold transition-all shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}
