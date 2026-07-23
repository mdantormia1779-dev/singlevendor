"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const locationData = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chittagong: ["Chittagong", "Cox's Bazar"],
};

const ContactPage = () => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [districts, setDistricts] = useState([]);

  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    setDistricts(locationData[division] || []);
  };

  return (
    <div className="space-y-6">

      {/* Contact */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-semibold">Contact Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Full Name *" />
            <Input placeholder="Mobile Number *" />
          </div>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-semibold">Delivery Address</h2>

          <div className="grid grid-cols-2 gap-4">

            <Select onValueChange={handleDivisionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Division" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(locationData).map((div) => (
                  <SelectItem key={div} value={div}>
                    {div}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select disabled={!selectedDivision}>
              <SelectTrigger>
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((dist) => (
                  <SelectItem key={dist} value={dist}>
                    {dist}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input className="col-span-full" placeholder="Area / Upazila" />

            <textarea
              className="col-span-full p-3 border rounded-md"
              rows={3}
              placeholder="Street Address"
            />
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default ContactPage;