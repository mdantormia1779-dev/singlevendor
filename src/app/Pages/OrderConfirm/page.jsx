"use client";

import React, { useState, useMemo } from "react";
import ContactPage from "@/app/Components/Contact/page";
import OrderSummaryConfirm from "@/app/Components/OrderSummaryConfirm/OrderSummaryConfirm";
import DeleveryPage from "@/app/Components/Delevery/page";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, clearBuyNowItem, clearCart } from "@/app/store/cartSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const OrderConfirmPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Customer Contact & Address State
  const [contactData, setContactData] = useState({
    fullName: "Ebrahim Hossain",
    phone: "01318964063",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Dhanmondi",
    streetAddress: "House 12, Road 5, Dhanmondi",
  });

  // Payment Details State
  const [paymentData, setPaymentData] = useState({
    walletNumber: "",
    trxId: "",
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();

  const buyNowItem = useSelector((state) => state.cart.buyNowItem);
  const cartItems = useSelector((state) => state.cart.items);

  // Determine active items being checked out
  const orderItems = useMemo(() => {
    if (buyNowItem) {
      return [buyNowItem];
    }
    return cartItems;
  }, [buyNowItem, cartItems]);

  const subtotal = useMemo(() => {
    return orderItems.reduce((acc, item) => {
      const price = typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : Number(item.price || 0);
      const qty = item.quantity || 1;
      return acc + price * qty;
    }, 0);
  }, [orderItems]);

  const deliveryFee = deliveryMethod === "express" ? 120 : 60;
  const grandTotal = Math.max(0, subtotal + deliveryFee - couponDiscount);

  const handleApplyCoupon = (code) => {
    if (code === "FINORA20") {
      setCouponDiscount(Math.round(subtotal * 0.2));
    } else if (code === "DISCOUNT10") {
      setCouponDiscount(Math.round(subtotal * 0.1));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name validation
    if (!contactData.fullName || contactData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (at least 2 letters).";
    }

    // 2. Phone validation (Bangladeshi 11-digit format: 013-019)
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!contactData.phone || !contactData.phone.trim()) {
      newErrors.phone = "Mobile phone number is required.";
    } else if (!bdPhoneRegex.test(contactData.phone.trim())) {
      newErrors.phone = "Enter a valid 11-digit BD mobile number (e.g. 017XXXXXXXX).";
    }

    // 3. Division validation
    if (!contactData.division) {
      newErrors.division = "Please select your division.";
    }

    // 4. District validation
    if (!contactData.district) {
      newErrors.district = "Please select your district.";
    }

    // 5. Detailed Street Address validation
    if (!contactData.streetAddress || contactData.streetAddress.trim().length < 5) {
      newErrors.streetAddress = "Please enter your detailed street/house address (min 5 characters).";
    }

    // 6. Online Payment (bKash / Nagad) validation
    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      if (!paymentData.walletNumber || !paymentData.walletNumber.trim()) {
        newErrors.walletNumber = `Enter the ${paymentMethod.toUpperCase()} wallet number you sent money from.`;
      } else if (!bdPhoneRegex.test(paymentData.walletNumber.trim())) {
        newErrors.walletNumber = "Enter a valid 11-digit wallet number.";
      }

      if (!paymentData.trxId || paymentData.trxId.trim().length < 4) {
        newErrors.trxId = "Transaction ID (TrxID) is required for online payment.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmOrder = () => {
    if (orderItems.length === 0) {
      toast.error("Your cart is empty! Please add products before checking out.");
      return;
    }

    // Run form validation
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fill in all required delivery and payment fields correctly! ⚠️");
      window.scrollTo({ top: 120, behavior: "smooth" });
      return;
    }

    setIsLoading(true);

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const fullShippingAddress = `${contactData.streetAddress}, ${contactData.upazila ? contactData.upazila + ", " : ""}${contactData.district}, ${contactData.division}`;

    const newOrder = {
      id: `#${orderId}`,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Confirmed",
      total: grandTotal,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      items: orderItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
      customer: {
        name: contactData.fullName.trim(),
        phone: contactData.phone.trim(),
        address: fullShippingAddress,
      },
      paymentMethod: paymentMethod.toUpperCase(),
      paymentDetails:
        paymentMethod !== "cod"
          ? { wallet: paymentData.walletNumber.trim(), trxId: paymentData.trxId.trim().toUpperCase() }
          : null,
      deliveryMethod: deliveryMethod === "express" ? "Express (1-2 days)" : "Standard (2-4 days)",
      products: orderItems.map((item) => ({
        id: item.id,
        name: item.title,
        qty: item.quantity || 1,
        price: typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : Number(item.price || 0),
        image: item.images?.[0] || item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
      })),
    };

    // Save to Prisma Database & Redux
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    }).catch((err) => console.error("Prisma order sync:", err));

    setTimeout(() => {
      dispatch(addOrder(newOrder));
      if (buyNowItem) {
        dispatch(clearBuyNowItem());
      } else {
        dispatch(clearCart());
      }

      toast.success("Order placed successfully! 🎉");
      router.push("/Pages/OrderSuccess");
    }, 400);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb & Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <Link
              href="/Pages/ShopingCards"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Shopping Cart
            </Link>

            {/* Step Progress Tracker */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                1. Delivery & Contact
              </span>
              <span className="text-gray-300">→</span>
              <span className="bg-emerald-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                2. Payment
              </span>
              <span className="text-gray-300">→</span>
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                3. Receipt
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Order Checkout & Confirmation
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete your delivery destination and select payment method to finalize your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT: Customer and Delivery Forms */}
          <div className="lg:col-span-2 space-y-6">
            <ContactPage
              contactData={contactData}
              setContactData={setContactData}
              errors={errors}
            />
            <DeleveryPage
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              totalAmount={grandTotal}
              paymentData={paymentData}
              setPaymentData={setPaymentData}
              errors={errors}
            />
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:sticky lg:top-24">
            <OrderSummaryConfirm
              handleConfirmOrder={handleConfirmOrder}
              isLoading={isLoading}
              orderItems={orderItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              couponDiscount={couponDiscount}
              total={grandTotal}
              onApplyCoupon={handleApplyCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPage;


