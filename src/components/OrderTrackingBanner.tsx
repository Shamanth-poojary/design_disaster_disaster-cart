"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Package, PartyPopper, X } from "lucide-react";

export default function OrderTrackingBanner() {
  const [eta, setEta] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    // Check for an active order
    const checkOrder = () => {
      const savedOrder = sessionStorage.getItem("crave_active_order");
      if (savedOrder) {
        try {
          const { isOrdered, eta: savedEta } = JSON.parse(savedOrder);
          if (isOrdered && savedEta) {
            const etaDate = new Date(savedEta);
            
            // Only show if ETA is in the future
            if (etaDate.getTime() > Date.now()) {
              setEta(etaDate);
              setIsVisible(true);
            } else {
              // Order has arrived, clear it
              sessionStorage.removeItem("crave_active_order");
              setIsVisible(false);
            }
          }
        } catch (e) {
          console.error("Failed to parse active order");
        }
      }
    };

    checkOrder();
    
    // Set up a listener for storage changes in case it's updated in another tab
    window.addEventListener("storage", checkOrder);
    window.addEventListener("crave_order_placed", checkOrder);
    return () => {
      window.removeEventListener("storage", checkOrder);
      window.removeEventListener("crave_order_placed", checkOrder);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !eta) return;

    const interval = setInterval(() => {
      const remaining = eta.getTime() - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        // We leave it visible until user closes it, but show "Delivered" state
      } else {
        setTimeLeft(Math.floor(remaining / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, eta]);

  if (!isVisible) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Determine status based on time left (assuming 30 min total)
  // > 20 mins: Preparing
  // 5 - 20 mins: On the way
  // < 5 mins: Arriving soon
  // 0: Delivered
  
  let statusText = "Delivered!";
  let StatusIcon = PartyPopper;
  let statusColor = "text-green-600";
  let bgColor = "bg-green-50";
  let borderColor = "border-green-200";

  if (timeLeft > 0) {
    if (minutes >= 20) {
      statusText = "Preparing your food...";
      StatusIcon = Package;
      statusColor = "text-orange-600";
      bgColor = "bg-orange-50";
      borderColor = "border-orange-200";
    } else if (minutes >= 5) {
      statusText = "On the way!";
      StatusIcon = MapPin;
      statusColor = "text-blue-600";
      bgColor = "bg-blue-50";
      borderColor = "border-blue-200";
    } else {
      statusText = "Arriving very soon...";
      StatusIcon = Clock;
      statusColor = "text-brand-primary";
      bgColor = "bg-brand-primary/10";
      borderColor = "border-brand-primary/20";
    }
  }

  return (
    <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4 transition-all duration-500`}>
      <div className={`shadow-lg rounded-2xl border ${borderColor} p-4 ${bgColor} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-white shadow-sm ${statusColor}`}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <p className={`font-bold ${statusColor}`}>{statusText}</p>
            {timeLeft > 0 ? (
              <p className="text-sm font-medium text-gray-700 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5" /> 
                Arriving in {minutes}:{seconds.toString().padStart(2, '0')}
              </p>
            ) : (
              <p className="text-sm font-medium text-gray-700 mt-0.5">
                Enjoy your meal!
              </p>
            )}
          </div>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            sessionStorage.removeItem("crave_active_order");
          }}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white transition-colors"
          aria-label="Dismiss order alert"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
