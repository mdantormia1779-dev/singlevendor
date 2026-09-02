"use client";

import React, { useState, useMemo, useEffect } from "react";
import ContactPage from "@/app/Components/Contact/page";
import OrderSummaryConfirm from "@/app/Components/OrderSummaryConfirm/OrderSummaryConfirm";
import DeleveryPage from "@/app/Components/Delevery/page";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, clearBuyNowItem, clearCart } from "@/app/store/cartSlice";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuthGuard } from "@/lib/useAuthGuard";

const OrderConfirmPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    if (method === "cod") {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.walletNumber;
        delete next.trxId;
        return next;
      });
    }
  };

  const { isAuthenticated, user, requireAuth } = useAuthGuard();

  // Customer Contact & Address State
  const [contactData, setContactData] = useState(() => ({
    fullName: user?.name || "",
    phone: user?.phone || "",
    division: "",
    district: "",
    upazila: "",
    streetAddress: "",
  }));

  // Payment Details State
  const [paymentData, setPaymentData] = useState({
    walletNumber: "",
    trxId: "",
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    requireAuth("Please login to place and confirm your order!", "/Pages/OrderConfirm");
  }, [requireAuth]);

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

  // Helper validation functions
  const normalizeBDPhone = (num) => {
    if (!num || typeof num !== "string") return "";
    return num.replace(/[^\d+]/g, "").replace(/^\+88/, "").replace(/^88/, "").trim();
  };

  const validateFullName = (name) => {
    if (!name || !name.trim()) return "Full name is required / পূর্ণ নাম প্রদান করুন।";
    const trimmed = name.trim();
    if (trimmed.length < 3) return "Name must be at least 3 characters / নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
    const nameRegex = /^[a-zA-Z\u0980-\u09FF\s.'-]+$/;
    if (!nameRegex.test(trimmed)) {
      return "Name should only contain letters / নাম শুধুমাত্র বর্ণ দিয়ে লিখুন।";
    }
    return null;
  };

  const validatePhone = (num) => {
    const clean = normalizeBDPhone(num);
    if (!clean) return "Mobile phone number is required / মোবাইল নম্বর আবশ্যক।";
    if (clean.length < 11) return "Number must be 11 digits (e.g. 017XXXXXXXX).";
    if (clean.length > 11) return "Number cannot exceed 11 digits.";
    if (!/^01[3-9]\d{8}$/.test(clean)) {
      return "Valid BD mobile operator required (013-019).";
    }
    return null;
  };

  const validateDivision = (div) => {
    if (!div) return "Please select your division / বিভাগ নির্বাচন করুন।";
    return null;
  };

  const validateDistrict = (dist) => {
    if (!dist) return "Please select your district / জেলা নির্বাচন করুন।";
    return null;
  };

  const validateUpazila = (area) => {
    if (!area || !area.trim()) return "Thana / Area / Upazila is required for courier delivery.";
    if (area.trim().length < 2) return "Please enter a valid area / thana name.";
    return null;
  };

  const validateStreetAddress = (addr) => {
    if (!addr || !addr.trim()) return "Detailed delivery address is required / সম্পূর্ণ ঠিকানা আবশ্যক।";
    const trimmed = addr.trim();
    if (trimmed.length < 8) return "Please include House/Road/Area (min 8 characters).";
    if (!/[a-zA-Z\u0980-\u09FF]/.test(trimmed)) return "Address must contain proper street/area details.";
    return null;
  };

  const validateWalletNumber = (num, method) => {
    const clean = normalizeBDPhone(num);
    if (!clean) return `Enter your ${method.toUpperCase()} mobile account number.`;
    if (!/^01[3-9]\d{8}$/.test(clean)) return "Enter a valid 11-digit wallet mobile number.";
    return null;
  };

  const validateTrxId = (trx, method) => {
    if (!trx || !trx.trim()) return `${method.toUpperCase()} Transaction ID (TrxID) is required.`;
    const clean = trx.trim().toUpperCase();
    if (clean.length < 6) return "TrxID must be at least 6 characters.";
    if (!/^[A-Z0-9]{6,18}$/.test(clean)) return "TrxID should only contain alphanumeric characters.";
    return null;
  };

  // Blur validation handler for individual fields
  const handleFieldBlur = (field, value) => {
    let error = null;
    if (field === "fullName") error = validateFullName(value);
    else if (field === "phone") error = validatePhone(value);
    else if (field === "division") error = validateDivision(value);
    else if (field === "district") error = validateDistrict(value);
    else if (field === "upazila") error = validateUpazila(value);
    else if (field === "streetAddress") error = validateStreetAddress(value);
    else if (field === "walletNumber") error = validateWalletNumber(value, paymentMethod);
    else if (field === "trxId") error = validateTrxId(value, paymentMethod);

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameErr = validateFullName(contactData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validatePhone(contactData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const divErr = validateDivision(contactData.division);
    if (divErr) newErrors.division = divErr;

    const distErr = validateDistrict(contactData.district);
    if (distErr) newErrors.district = distErr;

    const upazilaErr = validateUpazila(contactData.upazila);
    if (upazilaErr) newErrors.upazila = upazilaErr;

    const addrErr = validateStreetAddress(contactData.streetAddress);
    if (addrErr) newErrors.streetAddress = addrErr;

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      const walletErr = validateWalletNumber(paymentData.walletNumber, paymentMethod);
      if (walletErr) newErrors.walletNumber = walletErr;

      const trxErr = validateTrxId(paymentData.trxId, paymentMethod);
      if (trxErr) newErrors.trxId = trxErr;
    }

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey) {
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => el.focus(), 300);
      }
      return false;
    }

    return true;
  };

  const handleConfirmOrder = () => {
    if (!requireAuth("Please login to confirm and place your order!", "/Pages/OrderConfirm")) {
      return;
    }

    if (orderItems.length === 0) {
      toast.error("Your cart is empty! Please add products before checking out.");
      return;
    }

    // Run form validation
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Please fill in all required delivery and payment fields correctly! ⚠️");
      return;
    }

    setIsLoading(true);

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const cleanCustomerPhone = normalizeBDPhone(contactData.phone);
    const cleanWalletNumber = paymentMethod !== "cod" ? normalizeBDPhone(paymentData.walletNumber) : "";
    const cleanTrxId = paymentMethod !== "cod" ? paymentData.trxId.trim().toUpperCase() : "";

    const fullShippingAddress = `${contactData.streetAddress.trim()}, ${contactData.upazila.trim()}, ${contactData.district}, ${contactData.division}`;

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
        phone: cleanCustomerPhone,
        address: fullShippingAddress,
      },
      paymentMethod: paymentMethod.toUpperCase(),
      paymentDetails:
        paymentMethod !== "cod"
          ? { wallet: cleanWalletNumber, trxId: cleanTrxId }
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
              setErrors={setErrors}
              onFieldBlur={handleFieldBlur}
            />
            <DeleveryPage
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              paymentMethod={paymentMethod}
              setPaymentMethod={handlePaymentMethodSelect}
              totalAmount={grandTotal}
              paymentData={paymentData}
              setPaymentData={setPaymentData}
              errors={errors}
              setErrors={setErrors}
              onFieldBlur={handleFieldBlur}
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


