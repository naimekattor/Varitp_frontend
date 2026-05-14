"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Calendar, Clock, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import api from "@/lib/api";

interface OrderItem {
  id: string;
  quantity: number;
  price: string;
  food_item: string;
}

interface Order {
  id: string;
  order_id:string;
  total_amount: string;
  status: string;
  created_at: string;
  first_name: string;
  last_name: string;
  order_items: OrderItem[];
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/order/api/v1/orders/");
        setOrders(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-50 text-green-600 border-green-100";
      case "pending":
        return "bg-orange-50 text-orange-600 border-orange-100";
      case "delivered":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#E86F24]" size={40} />
        <p className="text-gray-400 font-medium">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-[#E86F24]">
          <Package size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">No orders yet</h2>
        <p className="text-gray-500 mb-8 max-w-sm">It looks like you haven't placed any orders yet. Explore our menu to find something delicious!</p>
        <Link 
          href="/"
          className="bg-[#E86F24] hover:bg-[#d4621c] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white font-sans min-h-screen">
      <div className="bg-gradient-to-b from-[#FFF5F0]/60 to-white pt-32 pb-12">
        <div className="w-full max-w-[1200px] mx-auto px-6">
          <div className="text-[13px] font-medium mb-6 text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link> / <span className="text-[#E86F24]">Order History</span>
          </div>
          <h1 className="text-4xl md:text-[2.75rem] font-serif font-bold text-gray-900 tracking-tight">Order History</h1>
        </div>
      </div>

      <main className="w-full max-w-[1200px] mx-auto px-6 pb-24">
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-orange-100 transition-all group"
            >
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#E86F24]">
                    <Package size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-none mb-1">
                      Order #{order.order_id}
                    </h3>
                    <div className="flex items-center gap-4 text-[13px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-[12px] font-bold bg-gray-50 text-gray-600 border border-gray-100 uppercase tracking-wider">
                    {order.order_items.length} {order.order_items.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-6 md:pt-0 border-t md:border-t-0 border-gray-50">
                <div className="text-right">
                  <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-[#E86F24] leading-none">${parseFloat(order.total_amount).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E86F24] font-bold transition-all"
          >
            <ArrowLeft size={18} />
            Back to Menu
          </Link>
        </div>
      </main>
    </div>
  );
}
