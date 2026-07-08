// "use client";

// import Image from "next/image";
// import {
//   Heart,
//   ShoppingCart,
//   ShoppingBasket,
//   Star,
//   ArrowUpRight,
// } from "lucide-react";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="min-w-[280px] bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl duration-300">
//       {/* Image */}
//       <div className="relative">
//         <Image
//           src={product.image}
//           alt={product.title}
//           width={350}
//           height={260}
//           className="w-full h-[230px] object-cover"
//         />

//         {/* Discount */}
//         <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-xl">
//           30% OFF
//         </span>

//         {/* Wishlist */}
//         <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
//           <Heart size={20} />
//         </button>

//         {/* Slider Dots */}
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
//           <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//           <span className="w-2 h-2 rounded-full bg-gray-300"></span>
//           <span className="w-2 h-2 rounded-full bg-gray-300"></span>
//           <span className="w-2 h-2 rounded-full bg-gray-300"></span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-bold text-xl leading-7 line-clamp-2">
//           {product.title}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-2 text-gray-500 mt-3">
//           <div className="flex items-center gap-1">
//             <Star
//               size={16}
//               className="fill-yellow-400 text-yellow-400"
//             />
//             <span>4.8</span>
//           </div>

//           <span>(342)</span>
//           <span>|</span>
//           <span>1240 sold</span>
//         </div>

//         {/* Price */}
//         <div className="flex items-center gap-3 mt-3">
//           <span className="text-2xl font-bold text-emerald-500">
//             ৳2,499
//           </span>

//           <span className="line-through text-gray-400">
//             ৳3,999
//           </span>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3 mt-5">
//           <button className="w-14 h-12 rounded-xl border border-emerald-500 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white duration-300">
//             <ShoppingCart size={22} />
//           </button>

//           <button className="flex-1 bg-emerald-500 text-white rounded-xl flex items-center justify-between px-5 hover:bg-emerald-600 duration-300">
//             <div className="flex items-center gap-2">
//               <ShoppingBasket size={20} />
//               Buy Now
//             </div>

//             <ArrowUpRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;