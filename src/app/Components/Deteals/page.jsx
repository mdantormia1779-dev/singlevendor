// "use client";

// import React, { useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, ShoppingCart, ChevronDown } from "lucide-react";

// const Deteals = () => {
//   const [activeTab, setActiveTab] = useState("reviews");

//   const tabs = [
//     { id: "details", label: "details" },
//     { id: "reviews", label: "Reviews (3)" },
//     { id: "questions", label: "Questions and answers" },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-4 space-y-10">
      
//       {/* ট্যাব সেকশন */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`py-3 px-4 rounded-lg font-medium transition-all ${
//               activeTab === tab.id
//                 ? "bg-green-500 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* কন্টেন্ট এরিয়া */}
//       <Card>
//         <CardContent className="pt-6">
          
//           {/* Details Tab */}
//           {activeTab === "details" && (
//             <div className="space-y-6">
//               <h3 className="font-bold text-xl">Product Description</h3>
//               <p className="text-gray-600">These premium wireless headphones will give you exceptional sound quality and maximum comfort.</p>
//             </div>
//           )}

//           {/* Reviews Tab - তোমার পছন্দের ডিজাইন */}
//           {activeTab === "reviews" && (
//             <div className="space-y-8">
//               {/* রেটিং সামারি সেকশন */}
//               <div className="flex flex-col md:flex-row gap-8 p-6 border rounded-xl items-center">
//                 <div className="flex flex-col items-center justify-center min-w-[200px]">
//                   <div className="text-6xl font-bold">4.8</div>
//                   <div className="flex text-yellow-400 my-2 text-xl">{"★".repeat(5)}</div>
//                   <div className="text-gray-500 text-sm">1,234 reviews</div>
//                 </div>

//                 <div className="flex-1 space-y-3 w-full">
//                   {[
//                     { star: 5, count: 415, width: "85%" },
//                     { star: 4, count: 396, width: "70%" },
//                     { star: 3, count: 317, width: "55%" },
//                     { star: 2, count: 200, width: "40%" },
//                     { star: 1, count: 117, width: "30%" },
//                   ].map((item) => (
//                     <div key={item.star} className="flex items-center gap-4">
//                       <span className="font-medium text-gray-700 w-3">{item.star}</span>
//                       <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
//                         <div className="h-full bg-yellow-400 rounded-full" style={{ width: item.width }} />
//                       </div>
//                       <span className="text-gray-500 text-sm w-12 text-right">{item.count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* রিভিও লিস্ট */}
//               <div className="space-y-6">
//                 {["Elon Musk", "Ebrahim", "Rafi Khan"].map((name, i) => (
//                   <div key={i} className="border-b pb-6">
//                     <div className="flex justify-between items-start mb-2">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-gray-200 rounded-full" />
//                         <div>
//                           <p className="font-bold text-gray-900">{name}</p>
//                           <div className="flex text-yellow-400 text-xs">{"★".repeat(5)}</div>
//                         </div>
//                       </div>
//                       <span className="text-sm text-gray-400">2 days ago</span>
//                     </div>
//                     <p className="text-gray-600 mt-2">Excellent product! The quality is outstanding and delivery was super fast.</p>
//                     <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 inline-block mt-2">Verified Purchase</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Questions Tab */}
//           {activeTab === "questions" && (
//             <div className="space-y-4">
//               {["Is this product original?", "How long for delivery?", "Do you have warranty?"].map((q, i) => (
//                 <div key={i} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer">
//                   <span className="font-medium text-gray-700">{q}</span>
//                   <ChevronDown className="text-gray-400" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Deteals;


"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronDown, Truck, ShieldCheck, RotateCcw, Minus, Plus, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Deteals = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      
      {/* --- ট্যাব বাটন সেকশন --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveTab("details")}
          className={`py-4 rounded-lg font-bold transition-all ${activeTab === "details" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          details
        </button>
        <button 
          onClick={() => setActiveTab("reviews")}
          className={`py-4 rounded-lg font-bold transition-all ${activeTab === "reviews" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Reviews (3)
        </button>
        <button 
          onClick={() => setActiveTab("questions")}
          className={`py-4 rounded-lg font-bold transition-all ${activeTab === "questions" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Questions and answers
        </button>
      </div>

      {/* --- কন্টেন্ট এরিয়া --- */}
      <Card>
        <CardContent className="pt-6">
          
          {/* Details Content */}
          {activeTab === "details" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Product Description</h3>
                <p className="text-gray-600 mb-4">These premium wireless headphones will give you exceptional sound quality and maximum comfort. With the active noise cancelling feature, you can enjoy an uninterrupted music experience.</p>
                <h4 className="font-bold mb-2">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Active Noise Cancelling (ANC)</li>
                  <li>Up to 30 hours of battery life</li>
                  <li>Quick charging: 5 hours of playback in 10 minutes</li>
                  <li>Premium sound quality</li>
                </ul>
              </div>
              <div className="border-t pt-6">
                <h3 className="font-bold text-xl mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                  <div className="flex justify-between border-b pb-2"><span>Brand</span> <span className="font-bold">Premium Audio</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Model</span> <span className="font-bold">PA-H1000</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Connectivity</span> <span className="font-bold">Bluetooth 5.0</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Battery</span> <span className="font-bold">30 hours</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Content */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b pb-8">
                <div className="text-center">
                  <div className="text-6xl font-bold">4.8</div>
                  <div className="flex justify-center text-yellow-400 my-2">★★★★★</div>
                  <div className="text-gray-500">1,234 reviews</div>
                </div>
                <div className="space-y-2 w-full">
                  {[5,4,3,2,1].map((s) => (
                    <div key={s} className="flex items-center gap-3 text-sm">
                      <span className="w-2">{s}</span>
                      <div className="flex-1 h-3 bg-gray-100 rounded-full"><div className="h-full bg-yellow-400 rounded-full" style={{width: s*18+'%'}}></div></div>
                      <span className="w-12 text-right text-gray-500">{s*80 + 50}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Reviews List */}
              <div className="space-y-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="border-b pb-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div><p className="font-bold">User {i}</p><div className="text-yellow-400 text-xs">★★★★★</div></div>
                      </div>
                      <span className="text-sm text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-gray-600">Excellent product! The quality is outstanding.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions Content */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              {["Is this product original?", "How long for delivery?", "Do you have warranty?"].map((q, i) => (
                <div key={i} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                  <span className="font-medium text-gray-700">{q}</span>
                  <ChevronDown className="text-gray-400" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Deteals;