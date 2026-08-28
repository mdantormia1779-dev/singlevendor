"use client";

import React, { useState } from "react";
import { MapPin, Pencil, Trash2, Plus, X, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";

const Address = () => {
  // Address Data
  const [addresses, setAddresses] = useState([
    { id: 1, type: "Home", isDefault: true, address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 1577147480" },
  ]);

  // Modals States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Data States
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [formData, setFormData] = useState({ type: "Home", address: "", phone: "" });
  const [formErrors, setFormErrors] = useState({});

  const openForm = (address = null) => {
    setEditingAddress(address);
    setFormData(address || { type: "Home", address: "", phone: "+880 1577147480" });
    setFormErrors({});
    setIsFormModalOpen(true);
  };

  const validate = () => {
    const errs = {};
    if (!formData.type.trim()) errs.type = "Address type is required (e.g. Home, Office).";
    if (!formData.address.trim() || formData.address.trim().length < 5) {
      errs.address = "Full address is required (minimum 5 characters).";
    }
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required.";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the address fields correctly!");
      return;
    }

    if (editingAddress) {
      setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...formData } : a));
      toast.success("Address updated successfully! ✅");
    } else {
      setAddresses([...addresses, { id: Date.now(), ...formData, isDefault: addresses.length === 0 }]);
      toast.success("New address added successfully! 🎉");
    }
    setIsFormModalOpen(false);
  };

  const confirmDelete = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    setAddresses(addresses.filter(a => a.id !== addressToDelete));
    setIsDeleteModalOpen(false);
    toast.info("Address deleted.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white min-h-[70vh] rounded-3xl shadow-xs border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">My Saved Addresses</h2>
        <span className="text-xs text-gray-500 font-medium">{addresses.length} saved</span>
      </div>

      <div className="flex flex-col gap-4">
        {addresses.map((item) => (
          <div key={item.id} className="flex items-start gap-4 p-5 border border-gray-100 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
              <MapPin className="text-[#19b77a]" size={22} />
            </div>
            <div className="grow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800 text-base">{item.type}</h3>
                {item.isDefault && <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold">Default</span>}
              </div>
              <p className="text-slate-600 text-sm">{item.address}</p>
              <p className="text-slate-500 text-xs mt-1 font-mono">{item.phone}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <button onClick={() => openForm(item)} className="p-2 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition cursor-pointer" aria-label="Edit address"><Pencil size={17} /></button>
              <button onClick={() => confirmDelete(item.id)} className="p-2 hover:text-red-500 hover:bg-red-50 rounded-xl transition cursor-pointer" aria-label="Delete address"><Trash2 size={17} /></button>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button onClick={() => openForm()} className="w-full py-4 border-2 border-dashed border-gray-200 hover:border-emerald-500 hover:text-emerald-600 rounded-2xl flex items-center justify-center gap-2 text-slate-500 transition-all cursor-pointer bg-gray-50/50 hover:bg-emerald-50/20">
          <Plus size={20} /> <span className="font-bold text-sm">Add New Address</span>
        </button>
      </div>

      {/* Form Modal (Add/Edit) */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg relative shadow-2xl">
            <button onClick={() => setIsFormModalOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-black cursor-pointer"><X size={20} /></button>
            <h2 className="text-xl font-bold mb-6 text-gray-900">{editingAddress ? "Edit Address" : "Add New Address"}</h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Address Label</label>
                <input placeholder="e.g. Home, Office, Workshop" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
                {formErrors.type && <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.type}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Street Address</label>
                <input placeholder="House, Road, Area, City" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                {formErrors.address && <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Contact Phone</label>
                <input placeholder="+880 1XXXXXXXXX" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                {formErrors.phone && <p className="text-xs text-red-500 mt-1 font-medium">{formErrors.phone}</p>}
              </div>

              <button type="submit" className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-sm mt-2">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center shadow-2xl">
            <AlertTriangle className="mx-auto text-red-500 mb-4" size={44} />
            <h2 className="text-xl font-bold mb-2 text-gray-900">Delete Address?</h2>
            <p className="text-slate-500 text-sm mb-6">Do you want to delete this address? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold text-slate-700 cursor-pointer text-sm">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold cursor-pointer text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;