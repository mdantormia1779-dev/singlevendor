"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import DeleveryPage from '../Delevery/page';

// বাংলাদেশ এর সকল ডিভিশন এবং ডিস্ট্রিক্ট ডাটা
const locationData = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Faridpur", "Tangail"],
  Sylhet: ["Sylhet", "Sunamganj", "Habiganj", "Moulvibazar"],
  Chittagong: ["Chittagong", "Cox's Bazar", "Comilla", "Noakhali"],
  Rajshahi: ["Rajshahi", "Bogra", "Pabna", "Natore"],
  Khulna: ["Khulna", "Jessore", "Kushtia"],
  Barisal: ["Barisal", "Patuakhali", "Bhola"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Sherpur"]
};

const ContactPage = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    setDistricts(locationData[division] || []);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Form Sections */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Contact Information */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="p-1.5 bg-green-50 text-green-600 rounded-full">👤</span>
              <h2>Contact information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" placeholder="Enter your name" className="mt-1 " />
              </div>
              <div>
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input id="mobile" placeholder="01XXXXXXXXX" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Address */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <span className="p-1.5 bg-green-50 text-green-600 rounded-full">📍</span>
              <h2>Delivery address</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Division Select */}
              <div>
                <Label>Division *</Label>
                <Select onValueChange={handleDivisionChange}>
                  <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Select Division" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(locationData).map((div) => (
                      <SelectItem key={div} value={div}>{div}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District Select */}
              <div>
                <Label>District</Label>
                <Select disabled={!selectedDivision}>
                  <SelectTrigger className="mt-1 w-full"><SelectValue placeholder="Select District" /></SelectTrigger>
                  <SelectContent>
                    {districts.map((dist) => (
                      <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Area / Upazila */}
              <div className="col-span-full">
                <Label>Area / Upazila</Label>
                <Input placeholder="Enter your area or upazila" className="mt-1" />
              </div>

              {/* Street Address - Made larger (h-24) */}
<div className="col-span-full">
  <Label htmlFor="address">Street Address *</Label>
  <textarea 
    id="address" 
    placeholder="House/Flat Number, Road, Area..." 
    className="mt-1 w-full p-3 border rounded-md min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" 
    rows={3} 
  />
</div>
            </div>
          </CardContent>
        </Card>

        {/* Delevery Page Section */}
        <DeleveryPage />
      </div>

      {/* Right Column: Order Summary */}
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h2 className="font-bold">Order Summary</h2>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg border" />
              <div className="text-sm">
                <p className="font-medium">Premium Wireless Headphones</p>
                <p className="text-gray-500">Qty: 1</p>
              </div>
              <p className="font-bold">৳2,499</p>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="Coupon code" />
              <Button variant="outline">Apply</Button>
            </div>

            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between"><span>Subtotal</span> <span>৳2,499</span></div>
              <div className="flex justify-between"><span>Delivery charges</span> <span className="text-green-600 font-bold">FREE</span></div>
              <div className="flex justify-between pt-2 font-bold text-lg"><span>Total</span> <span className="text-green-600">৳2,499</span></div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-base">
              Confirm Order - ৳2,499
            </Button>
            
            <div className="flex justify-center gap-4 text-xs text-gray-400">
              <span>🛡️ Secure</span> <span>🚚 Fast Delivery</span>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 p-4 rounded-lg text-sm text-green-900 border border-green-100">
          <strong>Note:</strong> You will receive a confirmation call. Please provide the correct number.
        </div>
      </div>
    </div>
  );
};

export default ContactPage;