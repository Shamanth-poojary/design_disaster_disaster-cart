"use client";

import { useState } from "react";

export default function CheckoutLabyrinth() {
  const [step, setStep] = useState(1);
  const [passwordError, setPasswordError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(true); // Forced continuity default
  const [showConfirmshame, setShowConfirmshame] = useState(false);
  const [cartTotal, setCartTotal] = useState(999);
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Reveal rules one by one, infuriatingly
    if (!passwordError) setPasswordError("Password must contain a non-alphanumeric character.");
    else if (passwordError.includes("non-alphanumeric")) setPasswordError("Password cannot contain the symbol @.");
    else if (passwordError.includes("@")) setPasswordError("Password must not match any password used in the last decade.");
    else setStep(2); // Finally let them through
  };

  const handleSubscriptionToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setShowConfirmshame(true);
      e.preventDefault(); // Prevent actually unchecking until they pass the modal
    } else {
      setIsSubscribed(true);
    }
  };

  const forceNextStep = () => {
      setStep(s => s + 1);
  };

  const simulateLoadingAndCharge = () => {
     // Sneak a fee in during a fake loading state
     setStep(s => s + 1);
     setTimeout(() => setCartTotal(cartTotal + 450), 1000); // Redirection fee snuck in
  };

  return (
    <div className="w-full min-h-[60vh] bg-hostile-cream border-8 border-hostile-pink p-8 mt-12 mb-24 font-mono relative">
      
      {/* Absolute chaos: No progress indicator, no context */}
      <h2 className="text-4xl text-black font-black uppercase underline decoration-wavy decoration-hostile-lime mb-8">
        Checkout Labyrinth
      </h2>

      {step === 1 && (
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <p className="text-black font-bold text-xl">Create Account to Proceed (Guest checkout is for losers)</p>
          <input type="password" placeholder="Enter highly secure password" required className="border-4 border-black p-2 bg-white text-black" />
          {passwordError && <p className="text-red-600 font-bold bg-yellow-300 inline-block p-1">ERROR: {passwordError}</p>}
          <button type="submit" className="bg-black text-white p-4 uppercase font-black hover:bg-hostile-cyan w-1/2">Next</button>
        </form>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          {/* Completely blank context, just an input */}
          <input type="text" placeholder="Data Field 4" className="border-2 border-dashed border-gray-400 p-8 w-full bg-transparent text-black" />
          <button onClick={forceNextStep} className="bg-hostile-lime text-black border-4 border-black p-2 ml-auto w-32">Submit</button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <p className="text-black">Select Delivery Landmark (Strictly Enforced):</p>
          <select className="p-4 border-4 border-black bg-white text-black">
            <option>Select an obsolete landmark...</option>
            <option>The KFC Signal in Indiranagar (Before it was Pizza Hut)</option>
            <option>That one tree near the old Blockbuster</option>
            <option>Where the blue car was parked yesterday</option>
          </select>
          <button onClick={simulateLoadingAndCharge} className="bg-black text-hostile-yellow p-4 text-left">Confirm Address</button>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-4 animate-pulse">
            <p className="text-black text-center text-2xl font-black">Calculating Optimal Route...</p>
            <p className="text-gray-500 text-center italic text-xs">Generating arbitrary Redirection Fee...</p>
            <button onClick={forceNextStep} className="mt-8 mx-auto bg-gray-200 text-gray-500 border border-gray-300 p-1 text-[10px]">next</button>
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col gap-4">
          <p className="text-black text-xs leading-loose h-40 overflow-y-scroll border border-black p-2 bg-white">
            Terms and conditions apply. You agree to wait indefinitely for your food. You agree that tomatoes cost ₹999.
            Lorem ipsum dolor sit amet. The platform may charge different prices based on your device's operating system.
            We will assume you are using an iOS device and mark up the price by 150%. 
            <label className="inline-flex items-center ml-2 bg-hostile-yellow p-1 border-2 border-red-500">
              <input type="checkbox" checked={isSubscribed} onChange={handleSubscriptionToggle} className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2 text-[8px] font-bold text-red-600 uppercase">Yes, enroll me in FlashKart ONE for ₹9,999/mo</span>
            </label>
            By continuing you waive your right to a refund.
          </p>
          <button onClick={forceNextStep} className="bg-hostile-pink text-black font-black p-6 hover:scale-110 transition-transform">PROCEED TO PAYMENT</button>
        </div>
      )}

      {step === 6 && (
        <div className="flex flex-col gap-4">
            <h3 className="text-black text-2xl bg-hostile-lime p-2 border-4 border-black inline-block self-start">FINAL INVOICE</h3>
            <ul className="text-black space-y-2 border-b-2 border-black pb-4">
                <li className="flex justify-between"><span>1x Blurry Tomato (Premium Organic Swap)</span> <span>₹2,499</span></li>
                <li className="flex justify-between text-gray-500 text-xs"><span>1x Regular Tomato (OUT OF STOCK)</span> <span>-</span></li>
                <li className="flex justify-between"><span>Redirection Fee (Our Error)</span> <span>₹450</span></li>
                <li className="flex justify-between font-bold text-red-600"><span>FlashKart ONE Subscription</span> <span>₹9,999</span></li>
            </ul>
            <div className="flex justify-between text-3xl font-black text-black">
                <span>TOTAL:</span>
                <span>₹12,948</span>
            </div>
            
            <button onClick={() => setStep(7)} className="w-full bg-black text-white py-8 text-4xl animate-bounce mt-8 cursor-wait">PAY NOW</button>
        </div>
      )}

      {step === 7 && (
        <div className="flex flex-col items-center justify-center p-12 bg-hostile-cyan border-8 border-dashed border-red-600">
            <h1 className="text-6xl text-black font-black mb-4 uppercase">Item is Out of Stock!</h1>
            <p className="text-black text-xl text-center">Sorry, the Blurry Tomato is no longer available. However, we have already charged your card ₹12,948 for the inconvenience. Your estimated delivery time is: <span className="font-mono bg-black text-hostile-lime p-1">{Math.floor(Date.now() / 1000)}</span> (Unix Epoch).</p>
        </div>
      )}

      {/* Confirmshaming Modal (Z-index Hell) */}
      {showConfirmshame && (
        <div className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4">
          <div className="bg-hostile-pink border-8 border-hostile-lime p-8 max-w-lg text-center shadow-[20px_20px_0px_#fff]">
            <h2 className="text-6xl text-black font-black uppercase mb-8">WAIT!</h2>
            <p className="text-2xl text-black mb-12">Are you really sure you want to cancel your FlashKart ONE subscription? Your family will literally starve without our premium 10-minute delivery speeds.</p>
            
            <div className="flex flex-col gap-6">
                <button 
                  onClick={() => { setIsSubscribed(true); setShowConfirmshame(false); }} 
                  className="bg-hostile-lime text-black border-4 border-black p-6 text-2xl font-black shadow-[5px_5px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all"
                >
                  YES, I WANT TO SAVE MY FAMILY WITH PREMIUM DELIVERY
                </button>
                
                {/* Hyperlink Camouflage / Roach motel cancellation */}
                <button 
                  onClick={() => { setIsSubscribed(false); setShowConfirmshame(false); }} 
                  className="text-gray-700 text-xs hover:text-gray-900 border-none bg-transparent self-end opacity-50"
                  title="Click me 3 times. Just kidding, once is fine for the demo."
                >
                  no thanks, i prefer paying exorbitant fees and waiting for hours.
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
