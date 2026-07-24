// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   House,
//   PackagePlus,
//   Layers3,
//   Package,
//   ShoppingBag,
//   Users,
//   Globe,
//   Clock3,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import Image from "next/image";
// import logo from "../../../../../../../public/logo.png";

// const menuItems = [
//   {
//     title: "Ecommerce",
//     href: "/Dashboard/admin",
//     icon: House,
//     active: true,
//   },
//   {
//     title: "Product",
//     href: "/Dashboard/admin/product",
//     icon: PackagePlus,
//   },
//   {
//     title: "Category",
//     href: "/Dashboard/admin/category",
//     icon: Layers3,
//   },
//   {
//     title: "Attributes",
//     href: "/Dashboard/admin/attributes",
//     icon: Package,
//   },
//   {
//     title: "Order",
//     href: "/Dashboard/admin/order",
//     icon: ShoppingBag,
//   },
//   {
//     title: "Users",
//     href: "/Dashboard/admin/users",
//     icon: Users,
//   },
//   {
//     title: "Store Setting",
//     href: "/Dashboard/admin/store-setting",
//     icon: Globe,
//   },
//   {
//     title: "Report",
//     href: "/Dashboard/admin/report",
//     icon: Clock3,
//   },
//   {
//     title: "Setting",
//     href: "/Dashboard/admin/setting",
//     icon: Settings,
//   },
// ];

// export default function DashboardSidebar() {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <aside
//       className={`relative bg-white border-r min-h-screen transition-all duration-300 ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* Header */}
//       <div className="relative h-20 border-b border-gray-200">
//         <div className="flex items-center h-full px-4">
//           <Link href="/" className="flex items-center gap-3">
//             {!collapsed && (
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
//                 <Image
//                   src={logo}
//                   alt="Finora"
//                   width={24}
//                   height={24}
//                   priority
//                 />
//               </div>
//             )}

//             {!collapsed && (
//               <h2 className="text-2xl font-bold tracking-tight">Finora</h2>
//             )}
//           </Link>

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
//           >
//             {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Menu */}
//       <div className="py-8">
//         {menuItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <Link
//               key={item.title}
//               href={item.href}
//               className={`mx-3 mb-2 flex items-center ${
//                 collapsed ? "justify-center" : "justify-between"
//               } rounded-xl px-4 py-3 transition-all ${
//                 item.active
//                   ? "text-orange-500"
//                   : "text-gray-900 hover:bg-gray-100"
//               }`}
//             >
//               <div className="flex items-center gap-4">
//                 <Icon size={22} />

//                 {!collapsed && (
//                   <span className="text-[17px] font-semibold">
//                     {item.title}
//                   </span>
//                 )}
//               </div>

//               {!collapsed && (
//                 <ChevronRight
//                   size={18}
//                   className={item.active ? "text-orange-500" : "text-black"}
//                 />
//               )}
//             </Link>
//           );
//         })}
//       </div>

//       {/* Logout */}
//       <div className="absolute bottom-8 left-0 w-full px-3">
//         <button
//           className={`w-full flex items-center ${
//             collapsed ? "justify-center" : "gap-4"
//           } rounded-xl px-4 py-3 text-black hover:bg-gray-100 transition`}
//         >
//           <LogOut size={22} />

//           {!collapsed && (
//             <span className="text-[17px] font-semibold">Log Out</span>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }



"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  House,
  PackagePlus,
  Layers3,

  ShoppingBag,
  Users,

  Settings,
  LogOut,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import logo from "../../../../../../../public/logo.png";

const menuItems = [
  {
    title: "Ecommerce",
    href: "/Dashboard/admin",
    icon: House,
    active: true,
  },
  {
    title: "Category",
    href: "/Dashboard/admin/category",
    icon: Layers3,
  },
  
  {
    title: "Order",
    href: "/Dashboard/admin/order",
    icon: ShoppingBag,
  },
  {
    title: "Users",
    href: "/Dashboard/admin/users",
    icon: Users,
  },
  
  {
    title: "Setting",
    href: "/Dashboard/admin/setting",
    icon: Settings,
  },
];

// প্রোডাক্টের সাব-মেনুগুলোর তালিকা
const productSubMenus = [
  { title: "All Products", href: "/Dashboard/admin/product/all-products" },
  { title: "Add Product", href: "/Dashboard/admin/product/add-product" },
  { title: "Edit Product", href: "/Dashboard/admin/product/edit-product" },
  { title: "Product Details", href: "/Dashboard/admin/product/product-details" },
];

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  // প্রোডাক্ট ড্রপডাউন খোলা বা বন্ধ রাখার স্টেট
  const [isProductOpen, setIsProductOpen] = useState(false);

  return (
    <aside
      className={`relative bg-white border-r min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="relative h-20 border-b border-gray-200">
        <div className="flex items-center h-full px-4">
          <Link href="/" className="flex items-center gap-3">
            {!collapsed && (
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500">
                <Image
                  src={logo}
                  alt="Finora"
                  width={24}
                  height={24}
                  priority
                />
              </div>
            )}

            {!collapsed && (
              <h2 className="text-2xl font-bold tracking-tight">Finora</h2>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>

      {/* Menu */}
      <div className="py-8">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          // ইকমাস বা অন্য সাধারণ মেনুগুলোর আগে বা পরে Product মেনু বসানোর ব্যবস্থা
          return (
            <div key={item.title}>
              <Link
                href={item.href}
                className={`mx-3 mb-2 flex items-center ${
                  collapsed ? "justify-center" : "justify-between"
                } rounded-xl px-4 py-3 transition-all ${
                  item.active
                    ? "text-orange-500"
                    : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Icon size={22} />
                  {!collapsed && (
                    <span className="text-[17px] font-semibold">
                      {item.title}
                    </span>
                  )}
                </div>

                {!collapsed && (
                  <ChevronRight
                    size={18}
                    className={item.active ? "text-orange-500" : "text-black"}
                  />
                )}
              </Link>

              {/* Ecommerce মেনুর পরেই Product ড্রপডাউন মেনু যুক্ত করা হলো */}
              {index === 0 && (
                <div className="mx-3 mb-2">
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className={`w-full flex items-center ${
                      collapsed ? "justify-center" : "justify-between"
                    } rounded-xl px-4 py-3 text-gray-900 hover:bg-gray-100 transition-all`}
                  >
                    <div className="flex items-center gap-4">
                      <PackagePlus size={22} className="text-orange-500" />
                      {!collapsed && (
                        <span className="text-[17px] font-semibold text-orange-500">
                          Product
                        </span>
                      )}
                    </div>

                    {!collapsed && (
                      <ChevronRight
                        size={18}
                        className={`text-orange-500 transition-transform duration-300 ${
                          isProductOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    )}
                  </button>

                  {/* সাব-মেনু লিস্ট (Product ওপেন থাকলে দেখাবে এবং সাইডবার ছোট (collapsed) না থাকলে কাজ করবে) */}
                  {isProductOpen && !collapsed && (
                    <div className="ml-8 mt-1 flex flex-col space-y-1 border-l-2 border-orange-200 pl-4">
                      {productSubMenus.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="py-2 text-[15px] font-medium text-gray-600 hover:text-orange-500 transition"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="absolute bottom-8 left-0 w-full px-3">
        <button
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "gap-4"
          } rounded-xl px-4 py-3 text-black hover:bg-gray-100 transition`}
        >
          <LogOut size={22} />

          {!collapsed && (
            <span className="text-[17px] font-semibold">Log Out</span>
          )}
        </button>
      </div>
    </aside>
  );
}
