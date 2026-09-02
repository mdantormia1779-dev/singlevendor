"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DollarSign,
  ShoppingBag,
  Users,
  PackageCheck,
} from "lucide-react";
import Card from "../Card/Card";
import gsap from "gsap";

export default function StateCard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAnalytics(data.data);
        }
      })
      .catch((err) => console.error("Analytics fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const cards = containerRef.current.children;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [loading, analytics]);

  const earnings = analytics?.totalRevenue || 0;
  const totalOrders = analytics?.totalOrders || 0;
  const totalCustomers = analytics?.totalCustomers || 0;
  const totalProducts = analytics?.totalProducts || 0;

  const cards = [
    {
      title: "Total Revenue",
      value: `৳${earnings.toLocaleString()}`,
      percent: "+18.4%",
      trend: "up",
      period: "Live Total",
      color: "#10b981",
      icon: <DollarSign size={24} />,
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      percent: "+12.1%",
      trend: "up",
      period: "All-Time",
      color: "#f59e0b",
      icon: <ShoppingBag size={24} />,
    },
    {
      title: "Store Customers",
      value: totalCustomers.toLocaleString(),
      percent: "+9.2%",
      trend: "up",
      period: "Registered",
      color: "#8b5cf6",
      icon: <Users size={24} />,
    },
    {
      title: "Active Products",
      value: totalProducts.toLocaleString(),
      percent: "+5.0%",
      trend: "up",
      period: "In Catalog",
      color: "#3b82f6",
      icon: <PackageCheck size={24} />,
    },
  ];

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}