"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, MapPin, Building, Home, Briefcase, Navigation, MessageSquare, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locationData = {
  Dhaka: ["Dhaka City", "Gazipur", "Narayanganj", "Tangail", "Narsingdi", "Manikganj", "Munshiganj", "Faridpur", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur", "Kishoreganj"],
  Chittagong: ["Chittagong City", "Cox's Bazar", "Cumilla", "Feni", "Brahmanbaria", "Noakhali", "Chandpur", "Lakshmipur", "Rangamati", "Khagrachhari", "Bandarban"],
  Sylhet: ["Sylhet City", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rajshahi: ["Rajshahi City", "Bogura", "Pabna", "Sirajganj", "Naogaon", "Natore", "Chapai Nawabganj", "Joypurhat"],
  Khulna: ["Khulna City", "Jashore", "Kushtia", "Satkhira", "Bagerhat", "Chuadanga", "Jhenaidah", "Magura", "Meherpur", "Narail"],
  Barisal: ["Barisal City", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati"],
  Rangpur: ["Rangpur City", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Lalmonirhat", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh City", "Jamalpur", "Netrokona", "Sherpur"],
};

const addressTypes = [
  { id: "home", label: "Home (All Day)", icon: Home },
  { id: "office", label: "Office (9 AM - 6 PM)", icon: Briefcase },
  { id: "other", label: "Other Location", icon: Navigation },
];

const quickNotes = [
  "Call before arriving",
  "Leave with building security guard",
  "Ring doorbell twice",
  "Deliver during business hours",
];

const ContactPage = ({
  contactData = {},
  setContactData,
  errors = {},
}) => {
  const selectedDivision = contactData.division || "";
  const districts = selectedDivision ? (locationData[selectedDivision] || []) : [];
  const selectedAddressType = contactData.addressType || "home";

  const handleFieldChange = (field, value) => {
    if (setContactData) {
      setContactData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleDivisionChange = (division) => {
    if (setContactData) {
      setContactData((prev) => ({
        ...prev,
        division,
        district: "", // reset district when division changes
      }));
    }
  };

  const handleQuickNote = (note) => {
    const current = contactData.deliveryNotes || "";
    if (current.includes(note)) {
      handleFieldChange("deliveryNotes", current.replace(note, "").trim());
    } else {
      handleFieldChange("deliveryNotes", current ? `${current}, ${note}` : note);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Contact Information Card */}
      <Card className="rounded-3xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50/30 px-6 py-4 border-b border-emerald-100/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <User size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-base">
                1. Contact Person
              </h2>
              <p className="text-xs text-gray-500">Receiver's name and direct contact mobile number</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            Step 1 of 3
          </span>
        </div>

        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                <span>Full Name <span className="text-red-500">*</span></span>
              </Label>
              <div className="relative">
                <Input
                  placeholder="e.g. Ebrahim Hossain"
                  value={contactData.fullName || ""}
                  onChange={(e) => handleFieldChange("fullName", e.target.value)}
                  className={`bg-slate-50/60 pl-10 h-12 rounded-2xl text-sm font-medium transition-all focus:bg-white focus:border-emerald-500 ${
                    errors.fullName ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200"
                  }`}
                />
                <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Mobile Phone */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                <span>Mobile Number <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-gray-400 font-normal">Bangladeshi 11-digit</span>
              </Label>
              <div className="relative">
                <Input
                  placeholder="01XXXXXXXXX"
                  value={contactData.phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className={`bg-slate-50/60 pl-10 h-12 rounded-2xl text-sm font-mono font-medium transition-all focus:bg-white focus:border-emerald-500 ${
                    errors.phone ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200"
                  }`}
                />
                <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Enhanced Shipping Address Card */}
      <Card className="rounded-3xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50/30 px-6 py-4 border-b border-emerald-100/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <MapPin size={18} />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-base">
                2. Shipping Destination
              </h2>
              <p className="text-xs text-gray-500">Exact delivery address across all 64 districts in Bangladesh</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            Step 2 of 3
          </span>
        </div>

        <CardContent className="p-6 space-y-5">
          {/* Address Type Selection Pills */}
          <div>
            <Label className="text-xs font-bold text-gray-700 block mb-2">
              Deliver To <span className="text-gray-400 font-normal">(Address Tag)</span>
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {addressTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = selectedAddressType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleFieldChange("addressType", type.id)}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-xs ring-2 ring-emerald-500/10"
                        : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? "bg-emerald-500 text-white" : "bg-white text-slate-600"}`}>
                      <IconComponent size={14} />
                    </div>
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Division & District 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Division Select */}
            <div className="space-y-1.5 w-full">
              <Label className="text-xs font-bold text-gray-700 block">
                Division / বিভাগ <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                <SelectTrigger className={`w-full bg-slate-50/60 h-12 rounded-2xl text-sm font-medium focus:bg-white focus:border-emerald-500 ${
                  errors.division ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200"
                }`}>
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl z-50">
                  {Object.keys(locationData).map((div) => (
                    <SelectItem key={div} value={div} className="text-sm font-medium py-2.5 rounded-xl cursor-pointer">
                      {div}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.division && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.division}</p>
              )}
            </div>

            {/* District Select */}
            <div className="space-y-1.5 w-full">
              <Label className="text-xs font-bold text-gray-700 block">
                District / Zilla / জেলা <span className="text-red-500">*</span>
              </Label>
              <Select
                value={contactData.district || ""}
                onValueChange={(val) => handleFieldChange("district", val)}
                disabled={!selectedDivision}
              >
                <SelectTrigger className={`w-full bg-slate-50/60 h-12 rounded-2xl text-sm font-medium focus:bg-white focus:border-emerald-500 ${
                  errors.district ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200"
                }`}>
                  <SelectValue placeholder={selectedDivision ? "Select District" : "Select Division first"} />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl max-h-64 z-50">
                  {districts.map((dist) => (
                    <SelectItem key={dist} value={dist} className="text-sm font-medium py-2.5 rounded-xl cursor-pointer">
                      {dist}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.district && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.district}</p>
              )}
            </div>

            {/* Thana / Area */}
            <div className="col-span-full space-y-1.5">
              <Label className="text-xs font-bold text-gray-700 block">
                Area / Thana / Upazila / থানা <span className="text-gray-400 font-normal">(e.g. Dhanmondi, Uttara, Banani)</span>
              </Label>
              <div className="relative">
                <Input
                  placeholder="e.g. Dhanmondi, Mirpur-10, Gulshan-2, Uttara Sector 4"
                  value={contactData.upazila || ""}
                  onChange={(e) => handleFieldChange("upazila", e.target.value)}
                  className="bg-slate-50/60 pl-10 h-12 rounded-2xl text-sm font-medium border-slate-200 focus:bg-white focus:border-emerald-500"
                />
                <Building size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Detailed Street Address */}
            <div className="col-span-full space-y-1.5">
              <Label className="text-xs font-bold text-gray-700 block">
                Detailed Street Address / বাড়ি ও রাস্তার নম্বর <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <textarea
                  className={`w-full p-4 pl-10 border rounded-2xl bg-slate-50/60 text-sm font-medium focus:outline-none focus:bg-white focus:border-emerald-500 resize-none transition-all ${
                    errors.streetAddress ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200"
                  }`}
                  rows={3}
                  placeholder="House / Flat / Holding number, Road number, Block, Landmark or nearby prominent point..."
                  value={contactData.streetAddress || ""}
                  onChange={(e) => handleFieldChange("streetAddress", e.target.value)}
                />
                <Home size={17} className="absolute left-3.5 top-4.5 text-gray-400" />
              </div>
              {errors.streetAddress && (
                <p className="text-xs text-red-500 font-semibold mt-1">{errors.streetAddress}</p>
              )}
            </div>

            {/* Delivery Instructions for Rider */}
            <div className="col-span-full space-y-2 pt-1 border-t border-slate-100">
              <Label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-emerald-600" />
                <span>Special Instructions for Delivery Rider <span className="text-gray-400 font-normal">(Optional)</span></span>
              </Label>
              
              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {quickNotes.map((note, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleQuickNote(note)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-xl border transition cursor-pointer flex items-center gap-1 ${
                      contactData.deliveryNotes?.includes(note)
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    {contactData.deliveryNotes?.includes(note) && <Check size={12} />}
                    {note}
                  </button>
                ))}
              </div>

              <Input
                placeholder="Any special notes for courier rider..."
                value={contactData.deliveryNotes || ""}
                onChange={(e) => handleFieldChange("deliveryNotes", e.target.value)}
                className="bg-slate-50/60 h-10 rounded-xl text-xs font-medium border-slate-200 focus:bg-white focus:border-emerald-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;