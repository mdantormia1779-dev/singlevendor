import React from 'react';
import { Package, CheckCircle2, Clock, Heart } from 'lucide-react';

export default function DashboardHomePage() {
  // স্ট্যাটাস কার্ডের ডামি ডাটা
  const stats = [
    { id: 1, title: 'Total Orders', count: '3', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, title: 'Delivered', count: '1', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 3, title: 'Active Orders', count: '2', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 4, title: 'Wishlist', count: '2', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  // রিসেন্ট অর্ডারের ডামি ডাটা
  const recentOrders = [
    {
      id: '#FIN-847291',
      date: 'Jun 11, 2026',
      price: '2,559',
      status: 'Delivered',
      statusColor: 'text-emerald-600 bg-emerald-50',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=150&auto=format&fit=crop' // হেডফোনের ডামি ছবি
    },
    {
      id: '#FIN-293847',
      date: 'Jun 9, 2026',
      price: '18,99',
      status: 'Out for Delivery',
      statusColor: 'text-orange-500 bg-orange-50',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=150&auto=format&fit=crop'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      
      {/* 1. Welcome Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, ebrahim! 👋</h1>
        <p className="text-slate-500 mt-1 text-sm">Here's what's happening with your account</p>
      </div>

      {/* 2. Stats Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stat.bg}`}>
                <Icon className={`${stat.color}`} size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{stat.count}</h2>
              <p className="text-slate-500 text-sm mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* 3. Recent Orders Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
          <button className="text-[#19b77a] font-medium text-sm hover:underline">
            View All
          </button>
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-2xl"
            >
              {/* Image & Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                  <img src={order.image} alt="Product" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm md:text-base">Order {order.id}</h3>
                  <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                    {order.date} - ৳{order.price}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}