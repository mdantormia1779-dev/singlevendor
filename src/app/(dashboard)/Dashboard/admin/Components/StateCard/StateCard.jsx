"use client";

import {
  DollarSign,
  ShoppingBag,
  User,
  Wallet,
} from "lucide-react";

import Card from "../Card/Card";

const cards = [
  {
    title: "Total Earnings",
    value: "$334,945",
    percent: "1.56%",
    trend: "up",
    period: "Weekly",
    color: "#22C55E",
    icon: <DollarSign size={24} />,
  },
  {
    title: "Total Orders",
    value: "2,802",
    percent: "1.56%",
    trend: "down",
    period: "Monthly",
    color: "#FF6200",
    icon: <ShoppingBag size={24} />,
  },
  {
    title: "Customers",
    value: "4,945",
    percent: "1.56%",
    trend: "up",
    period: "Yearly",
    color: "#8B5CF6",
    icon: <User size={24} />,
  },
  {
    title: "My Balance",
    value: "4,945",
    percent: "1.56%",
    trend: "up",
    period: "Yearly",
    color: "#2563EB",
    icon: <Wallet size={24} />,
  },
];

export default function StateCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
}