"use client";

import React, { useState, useEffect } from "react";
import { Search, Mail, Phone, MapPin, UserCheck, Shield, ShoppingBag, Plus, Trash2, Edit2, X, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
  });

  const loadUsers = () => {
    setLoading(true);
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.users) {
          setCustomers(data.users);
        }
      })
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.users) {
          setCustomers(data.users);
        }
      })
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm)
  );

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) {
      toast.error("Please fill in name and email!");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`User ${newCustomer.name} created successfully in database! 🎉`);
        setIsAddModalOpen(false);
        setNewCustomer({ name: "", email: "", phone: "", role: "customer" });
        fetchUsers();
      } else {
        toast.error(data.error || "Failed to create user");
      }
    } catch (err) {
      toast.error("Failed to connect to database");
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Database User Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real registered users and customer records stored in Prisma PostgreSQL
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadUsers}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition border border-slate-200 cursor-pointer"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer"
          >
            <Plus size={18} /> Add User
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-gray-100 mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search real user by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-700 text-xs font-bold uppercase tracking-wider border-b border-gray-200">
                <th className="py-4 px-6">User Account</th>
                <th className="py-4 px-4">Contact Info</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4 text-center">Orders</th>
                <th className="py-4 px-4">Total Spent</th>
                <th className="py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    Loading users from PostgreSQL database...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-gray-50/60 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image src={cust.avatar} alt={cust.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{cust.name}</div>
                          <div className="text-xs text-gray-400">Joined {cust.joinedDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-xs text-gray-700 flex items-center gap-1.5">
                        <Mail size={13} className="text-gray-400" /> {cust.email}
                      </div>
                      <div className="text-xs text-gray-500 font-mono flex items-center gap-1.5 mt-0.5">
                        <Phone size={13} className="text-gray-400" /> {cust.phone}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-800">
                        {cust.role || "customer"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-gray-800">
                      {cust.ordersCount}
                    </td>
                    <td className="py-4 px-4 font-bold text-emerald-700">
                      ৳{cust.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          cust.role === "SUPER_ADMIN"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : cust.role === "admin"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900">Add User to Database</h2>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name *</label>
                <input
                  required
                  placeholder="e.g. Md Antor Mia"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
                <input
                  required
                  type="email"
                  placeholder="user@example.com"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Phone Number</label>
                <input
                  placeholder="017XXXXXXXX"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Account Role</label>
                <select
                  value={newCustomer.role}
                  onChange={(e) => setNewCustomer({ ...newCustomer, role: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Store Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-sm mt-2"
              >
                Save to Database
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
