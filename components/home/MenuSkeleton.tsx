import React from "react";

export default function MenuSkeleton() {
  return (
    <div className="animate-pulse w-full">
      {/* Category Slider Skeleton */}
      <div className="flex flex-wrap justify-center gap-10 md:gap-14 mb-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full bg-gray-200"></div>
            <div className="w-12 h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Main Product Info Skeleton */}
      <div className="flex flex-col items-center text-center mt-10">
        <div className="w-64 h-10 bg-gray-200 rounded-lg mb-4"></div>
        <div className="w-48 h-4 bg-gray-200 rounded mb-8"></div>
        
        <div className="flex items-center gap-6 mb-16">
          <div className="w-20 h-10 bg-gray-200 rounded"></div>
          <div className="w-32 h-12 bg-gray-200 rounded-full"></div>
        </div>

        {/* Large Circular Image Skeleton */}
        <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full bg-gray-100 mx-auto flex items-center justify-center -mt-8">
          <div className="w-[74%] h-[74%] rounded-full bg-gray-200 shadow-inner"></div>
        </div>
      </div>

      {/* Description Section Skeleton */}
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center py-24">
        <div className="order-2 md:order-2">
           <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-200 mx-auto"></div>
        </div>
        <div className="order-1 md:order-1">
          <div className="w-48 h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
