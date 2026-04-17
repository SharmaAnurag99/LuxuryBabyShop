"use client";

import { MapPin, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DeliveryBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#Fdfbf7] border-t shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] border-[#e8dfd8] py-3 px-4 sm:px-6 lg:px-8 transform transition-transform duration-300 translate-y-0">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 text-chocolate">
          <div className="bg-[#f0e6dd] p-2 rounded-full hidden sm:block">
             <MapPin className="w-5 h-5 text-accent-orange" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide uppercase text-accent-orange flex items-center gap-1">
              TinyNest Express
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm font-medium text-gray-700">Premium quality delivered the <strong className="text-chocolate">SAME DAY & NEXT DAY</strong>.</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Input 
              type="text" 
              placeholder="Enter Pincode" 
              className="bg-white border-[#e8dfd8] pr-20 h-10 text-sm focus-visible:ring-accent-orange"
              maxLength={6}
            />
            <Button 
              variant="ghost" 
              className="absolute right-0 top-0 h-10 rounded-l-none text-accent-orange hover:text-accent-orange hover:bg-orange-50 font-bold text-xs tracking-wider"
            >
              CHECK
            </Button>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-2 text-gray-400 hover:text-chocolate transition-colors rounded-full hover:bg-gray-100"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}