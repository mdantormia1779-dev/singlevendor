"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Truck,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  LogIn,
  Loader2,
  ArrowRight,
} from "lucide-react";
import NavMenu from "./NavMenu/NavMenu";
import Image from "next/image";
import logo from "../../../../../public/logo.png";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout, loadStoredAuth } from "@/app/store/authSlice";
import { clearOrders } from "@/app/store/cartSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isBottomVisible, setIsBottomVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const searchContainerRef = useRef(null);
  const mobileSearchContainerRef = useRef(null);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const authUser = useSelector((state) => state.auth?.user);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);

  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  // Debounced auto-suggestion product fetch
  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      fetch(`/api/products?search=${encodeURIComponent(trimmed)}&limit=6`)
        .then((res) => {
          if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.success && Array.isArray(data.products)) {
            setSuggestions(data.products);
          } else {
            setSuggestions([]);
          }
        })
        .catch((err) => {
          console.error("Auto suggestion fetch error:", err);
          setSuggestions([]);
        })
        .finally(() => setIsSearching(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleUserLogout = () => {
    dispatch(logout());
    dispatch(clearOrders());
    setUserMenuOpen(false);
    toast.info("Logged out from Finora account.");
    router.push("/");
  };

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }

      const isInsideDesktop =
        searchContainerRef.current && searchContainerRef.current.contains(event.target);
      const isInsideMobile =
        mobileSearchContainerRef.current && mobileSearchContainerRef.current.contains(event.target);

      if (!isInsideDesktop && !isInsideMobile) {
        setShowSuggestions(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSuggestions(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsBottomVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsBottomVisible(false);
      } else {
        setIsBottomVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setMobileMenuOpen(false);
      router.push(`/Pages/AllProduct?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectProduct = (productId) => {
    setShowSuggestions(false);
    setMobileMenuOpen(false);
    router.push(`/Pages/Details/${productId}`);
  };

  const handleViewAllResults = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setMobileMenuOpen(false);
      router.push(`/Pages/AllProduct?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const renderSuggestionsDropdown = () => {
    if (!showSuggestions || !searchQuery.trim()) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
        {isSearching ? (
          <div className="flex items-center justify-center py-7 text-gray-400 gap-2 text-sm font-medium">
            <Loader2 size={18} className="animate-spin text-[#19b77a]" />
            <span>Searching products...</span>
          </div>
        ) : suggestions.length > 0 ? (
          <div>
            <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <span>Matching Products</span>
              <span>{suggestions.length} items</span>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {suggestions.map((item) => {
                const thumbnail =
                  Array.isArray(item.images) && item.images.length > 0
                    ? item.images[0]
                    : item.image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&q=80";

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item.id)}
                    className="flex items-center gap-3 p-3 hover:bg-emerald-50/60 cursor-pointer transition-colors group"
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                      <Image
                        src={thumbnail}
                        alt={item.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium">
                          {item.category || "General"}
                        </span>
                        {item.rating && (
                          <span className="flex items-center gap-0.5 text-[11px] text-amber-500 font-bold">
                            ★ {item.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-emerald-600">
                        ৳{Number(item.price || 0).toLocaleString()}
                      </div>
                      {item.oldPrice && item.oldPrice > item.price && (
                        <div className="text-[11px] text-gray-400 line-through">
                          ৳{Number(item.oldPrice).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleViewAllResults}
              className="w-full py-2.5 px-4 bg-gray-50 hover:bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1.5 border-t border-gray-100 transition-colors cursor-pointer"
            >
              <span>View all results for &quot;{searchQuery}&quot;</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div className="py-7 px-4 text-center">
            <p className="text-sm font-semibold text-gray-700">No products found</p>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              No matches found for &quot;{searchQuery}&quot;. Press Enter to browse all products.
            </p>
          </div>
        )}
      </div>
    );
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Products", path: "/Pages/AllProduct" },
    { name: "Fashion", path: "/Pages/Fasion" },
    { name: "Electronics", path: "/Pages/Electronics" },
    { name: "Mens Shoes", path: "/Pages/MenShoes" },
    { name: "Home & Living", path: "/Pages/HomeLiving" },
    { name: "Gadgets", path: "/Pages/Gadgets" },
  ];

  return (
    <>
      {/* Main Header Container */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        {/* Top Navbar */}
        <div className="border-b border-gray-100 bg-white">
          <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-[#19b77a] flex items-center justify-center shadow-md shadow-emerald-100">
                <Image
                  src={logo}
                  alt="Finora Logo"
                  width={24}
                  height={24}
                  priority
                  className="brightness-0 invert"
                />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900 hidden sm:inline">
                Finora<span className="text-[#19b77a]">.</span>
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4 relative" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="w-full relative">
                <input
                  type="text"
                  placeholder="Search over 10,000+ authentic products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim()) setShowSuggestions(true);
                  }}
                  onFocus={() => {
                    if (searchQuery.trim()) setShowSuggestions(true);
                  }}
                  className="w-full pl-11 pr-24 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#19b77a] focus:bg-white text-sm transition-all shadow-2xs"
                />
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    title="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#19b77a] hover:bg-[#159e68] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Search
                </button>
              </form>
              {renderSuggestionsDropdown()}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Wishlist */}
              <Link href="/Dashboard/user/Wishlist">
                <div className="relative cursor-pointer p-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-700">
                    <Heart size={20} />
                  </div>
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* Cart */}
              <Link href="/Pages/ShopingCards">
                <div className="relative cursor-pointer p-1">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-700">
                    <ShoppingCart size={20} />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#19b77a] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                    {cartItems.length}
                  </span>
                </div>
              </Link>

              {/* User Menu Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#19b77a] hover:bg-[#159e68] flex items-center justify-center text-white cursor-pointer shadow-sm transition-colors overflow-hidden border-2 border-white"
                  aria-label="User Account"
                >
                  {isAuthenticated && authUser?.avatar ? (
                    <Image
                      src={authUser.avatar}
                      alt={authUser?.name || "User"}
                      width={44}
                      height={44}
                      className="object-cover"
                    />
                  ) : isAuthenticated && authUser?.name ? (
                    <span className="font-extrabold text-sm text-white">
                      {authUser.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User size={20} />
                  )}
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {isAuthenticated ? "Signed in as" : "Finora Account"}
                        </p>
                        {isAuthenticated && authUser?.role && (
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {authUser.role}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {isAuthenticated ? authUser?.name || authUser?.email : "Guest Visitor"}
                      </p>
                      {isAuthenticated && authUser?.email && (
                        <p className="text-xs text-gray-500 truncate font-mono">
                          {authUser.email}
                        </p>
                      )}
                    </div>

                    <div className="py-1">
                      {isAuthenticated ? (
                        <>
                          <Link
                            href="/Dashboard/user"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#19b77a] transition-colors font-medium"
                          >
                            <LayoutDashboard size={16} className="text-[#19b77a]" />
                            User Dashboard
                          </Link>

                          {(authUser?.role === "admin" || authUser?.role === "SUPER_ADMIN") && (
                            <Link
                              href="/Dashboard/admin"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 transition-colors font-medium"
                            >
                              <ShieldCheck size={16} className="text-orange-500" />
                              Admin Dashboard
                            </Link>
                          )}
                        </>
                      ) : null}

                      <Link
                        href="/Pages/OrderTracking"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-medium"
                      >
                        <Truck size={16} className="text-blue-500" />
                        Track Order
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    {isAuthenticated ? (
                      <button
                        onClick={handleUserLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold cursor-pointer text-left"
                      >
                        <LogIn size={16} /> Log Out
                      </button>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#19b77a] hover:bg-emerald-50 transition-colors font-bold"
                      >
                        <LogIn size={16} /> Login / Register
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden px-4 pb-3 relative" ref={mobileSearchContainerRef}>
            <form
              onSubmit={handleSearchSubmit}
              className="flex rounded-xl overflow-hidden border border-gray-200 focus-within:border-[#19b77a] relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) setShowSuggestions(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setShowSuggestions(true);
                }}
                placeholder="Search products..."
                className="flex-1 h-10 pl-3 pr-8 text-sm outline-none bg-gray-50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#19b77a] px-4 flex items-center justify-center text-white cursor-pointer"
              >
                <Search size={16} />
              </button>
            </form>
            {renderSuggestionsDropdown()}
          </div>
        </div>

        {/* Desktop Bottom Navbar (Green category bar) */}
        <div
          className={`hidden lg:block overflow-hidden bg-[#19b77a] shadow-md transition-[max-height,opacity,transform] duration-400 ease-in-out ${
            isBottomVisible
              ? "max-h-20 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-3"
          }`}
        >
          <div className="max-w-7xl mx-auto h-14 px-6 flex items-center gap-8 text-white font-medium text-base">
            <NavMenu />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-[#19b77a] flex items-center justify-center text-white">
                    <Image src={logo} alt="Logo" width={20} height={20} />
                  </div>
                  <span className="text-xl font-bold">Finora</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:text-black">
                  <X size={20} />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-[#e9f9f3] hover:text-[#19b77a] font-medium text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#19b77a] text-white font-semibold rounded-xl text-center block text-sm shadow-sm"
              >
                Sign In / Register
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for Fixed Header */}
      <div className="h-32 md:h-36 lg:h-38" />
    </>
  );
};

export default Navbar;

