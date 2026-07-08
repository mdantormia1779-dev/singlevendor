"use client";

import React, { useState } from "react";
import { MapPin, Pencil, Trash2, Plus, X, AlertTriangle } from "lucide-react";

const Address = () => {
  // ডামি অ্যাড্রেস ডেটা
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", isDefault: true, address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 01577147480" },
  ]);

  // Modals States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Data States
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [formData, setFormData] = useState({ type: "", address: "", phone: "" });

  // ফর্ম ওপেন করার ফাংশন (Add বা Edit এর জন্য)
  const openForm = (address = null) => {
    setEditingAddress(address);
    setFormData(address || { type: "", address: "", phone: "" });
    setIsFormModalOpen(true);
  };

  // অ্যাড্রেস সেভ করার ফাংশন (Add বা Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (editingAddress) {
      // Update existing
      setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...formData } : a));
    } else {
      // Add new
      setAddresses([...addresses, { id: Date.now(), ...formData, isDefault: false }]);
    }
    setIsFormModalOpen(false);
  };

  // ডিলিট কনফার্মেশন ওপেন করা
  const confirmDelete = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // ডিলিট করার ফাংশন
  const handleDelete = () => {
    setAddresses(addresses.filter(a => a.id !== addressToDelete));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">My Addresses</h2>

      <div className="flex flex-col gap-4">
        {addresses.map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-5 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="text-[#19b77a]" size={24} />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{item.type}</h3>
                {item.isDefault && <span className="bg-[#19b77a] text-white text-[10px] px-2 py-0.5 rounded-full font-medium">Default</span>}
              </div>
              <p className="text-slate-600 text-sm">{item.address}</p>
              <p className="text-slate-500 text-sm mt-1">{item.phone}</p>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <button onClick={() => openForm(item)} className="hover:text-slate-600 transition-colors"><Pencil size={18} /></button>
              <button onClick={() => confirmDelete(item.id)} className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button onClick={() => openForm()} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-2 text-slate-500 hover:text-[#19b77a] hover:border-[#19b77a] transition-all">
          <Plus size={20} /> <span className="font-medium">Add New Address</span>
        </button>
      </div>

      {/* Form Modal (Add/Edit) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative shadow-2xl">
            <button onClick={() => setIsFormModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-black"><X size={24} /></button>
            <h2 className="text-2xl font-bold mb-6">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <input required placeholder="Type (Home/Office)" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#19b77a]" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
              <input required placeholder="Full Address" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#19b77a]" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              <input required placeholder="Phone Number" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#19b77a]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <button type="submit" className="w-full py-3 bg-[#19b77a] text-white font-bold rounded-xl hover:bg-[#159f6a] transition-colors">Save Address</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
            <p className="text-slate-500 mb-8">Do you want to delete this address? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-slate-600 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;