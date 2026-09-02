"use client";

import React, { useState, useEffect } from "react";
import { Store, CreditCard, Bell, Save, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("general");

  const [storeSettings, setStoreSettings] = useState({
    storeName: "Finora Commerce",
    supportEmail: "support@finora.com",
    contactPhone: "+880 1577147480",
    address: "123 Shopping Street, Gulshan-2, Dhaka 1212, Bangladesh",
    currency: "BDT (৳)",
    standardDeliveryFee: "60",
    expressDeliveryFee: "120",
    freeDeliveryThreshold: "1000",
    bkashMerchant: "01318964063",
    nagadMerchant: "01318964063",
    orderNotificationEmail: true,
    smsAlerts: true,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.setting) {
          setStoreSettings((prev) => ({
            ...prev,
            ...data.setting,
            standardDeliveryFee: String(data.setting.standardDeliveryFee ?? 60),
            expressDeliveryFee: String(data.setting.expressDeliveryFee ?? 120),
            freeDeliveryThreshold: String(data.setting.freeDeliveryThreshold ?? 1000),
          }));
        }
      })
      .catch((err) => console.error("Settings fetch error:", err))
      .finally(() => setFetching(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: storeSettings.storeName,
          supportEmail: storeSettings.supportEmail,
          contactPhone: storeSettings.contactPhone,
          address: storeSettings.address,
          currency: storeSettings.currency,
          standardDeliveryFee: parseFloat(storeSettings.standardDeliveryFee) || 60,
          expressDeliveryFee: parseFloat(storeSettings.expressDeliveryFee) || 120,
          freeDeliveryThreshold: parseFloat(storeSettings.freeDeliveryThreshold) || 1000,
          bkashMerchant: storeSettings.bkashMerchant,
          nagadMerchant: storeSettings.nagadMerchant,
          orderNotificationEmail: storeSettings.orderNotificationEmail,
          smsAlerts: storeSettings.smsAlerts,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Store settings saved to database! ✅");
      } else {
        toast.error("Failed to save settings.");
      }
    } catch (err) {
      console.error("Settings save error:", err);
      toast.error("Network error while saving settings.");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading settings from database...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Store Settings
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Configure payment methods, delivery charges, general metadata, and automated alerts synced with PostgreSQL
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: "general", label: "General & Store", icon: Store },
          { id: "payment", label: "Payments & Delivery", icon: CreditCard },
          { id: "notifications", label: "Notifications & Alerts", icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === tab.id
                ? "bg-gray-900 text-white shadow-xs"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-gray-100 space-y-6 max-w-4xl">
        {activeTab === "general" && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">General Store Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Store Name</label>
                <input
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Support Email</label>
                <input
                  type="email"
                  value={storeSettings.supportEmail}
                  onChange={(e) => setStoreSettings({ ...storeSettings, supportEmail: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Customer Support Phone</label>
                <input
                  value={storeSettings.contactPhone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, contactPhone: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Default Currency</label>
                <input
                  value={storeSettings.currency}
                  disabled
                  className="w-full bg-gray-100 p-3 rounded-xl border border-gray-200 text-sm text-gray-500 font-medium cursor-not-allowed"
                />
              </div>

              <div className="col-span-full">
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Physical Store Address</label>
                <textarea
                  rows={3}
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 resize-none font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Payment & Delivery Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">bKash Merchant Wallet</label>
                <input
                  value={storeSettings.bkashMerchant}
                  onChange={(e) => setStoreSettings({ ...storeSettings, bkashMerchant: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-mono font-bold text-[#e2136e]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Nagad Merchant Wallet</label>
                <input
                  value={storeSettings.nagadMerchant}
                  onChange={(e) => setStoreSettings({ ...storeSettings, nagadMerchant: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-mono font-bold text-[#f04f32]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Standard Delivery Fee (৳)</label>
                <input
                  type="number"
                  value={storeSettings.standardDeliveryFee}
                  onChange={(e) => setStoreSettings({ ...storeSettings, standardDeliveryFee: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">Express Delivery Fee (৳)</label>
                <input
                  type="number"
                  value={storeSettings.expressDeliveryFee}
                  onChange={(e) => setStoreSettings({ ...storeSettings, expressDeliveryFee: e.target.value })}
                  className="w-full bg-gray-50/50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Automated Notifications</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100/70 transition">
                <div>
                  <p className="font-bold text-sm text-gray-900">Email Order Alerts</p>
                  <p className="text-xs text-gray-500">Send confirmation emails to customer when an order is placed</p>
                </div>
                <input
                  type="checkbox"
                  checked={storeSettings.orderNotificationEmail}
                  onChange={(e) => setStoreSettings({ ...storeSettings, orderNotificationEmail: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100/70 transition">
                <div>
                  <p className="font-bold text-sm text-gray-900">SMS Tracking Updates</p>
                  <p className="text-xs text-gray-500">Send SMS notifications to customer when order status is marked Shipped</p>
                </div>
                <input
                  type="checkbox"
                  checked={storeSettings.smsAlerts}
                  onChange={(e) => setStoreSettings({ ...storeSettings, smsAlerts: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-2xl transition cursor-pointer text-sm shadow-sm"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            <span>{isLoading ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
