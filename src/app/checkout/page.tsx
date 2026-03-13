"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cartItems, cartTotal, totalItems, isMounted, clearCart } = useCart();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const deliveryFee = 49.0;
  const grandTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    
    // Clear the cart
    clearCart();

    // Set a mock order with a 30-minute ETA in sessionStorage
    const eta = new Date(Date.now() + 30 * 60000).toISOString();
    sessionStorage.setItem("crave_active_order", JSON.stringify({ isOrdered: true, eta }));
    window.dispatchEvent(new Event("crave_order_placed"));
    
    // Redirect after 3 seconds
    setTimeout(() => {
      router.push("/");
    }, 4000);
  };

  if (!isMounted) return null; // Wait for localStorage to hydrate

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="bg-brand-success/10 p-6 rounded-full mb-6">
            <CheckCircle2 className="w-20 h-20 text-brand-success" />
          </div>
          <h1 className="text-4xl font-extrabold text-brand-dark mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Your food is being prepared and will be tracked shortly.
            Redirecting you to the home page...
          </p>
          <Link href="/" className="text-brand-primary font-semibold hover:underline">
            Return to Home Now
          </Link>
        </main>
      </div>
    );
  }

  // If cart is empty, redirect back
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/" className="inline-block bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors shadow-md">
            Browse Restaurants
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to exploring
          </Link>
          <h1 className="text-3xl font-extrabold text-brand-dark mt-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Details */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center">
                <MapPin className="w-5 h-5 text-brand-primary mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Delivery Details</h2>
              </div>
              <div className="p-6">
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input required type="text" id="fullName" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input required type="tel" id="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" placeholder="+91 9876543210" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
                    <textarea required id="address" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" placeholder="House/Flat No., Building Name, Street, City, Landmark"></textarea>
                  </div>
                  <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Delivery Instructions (Optional)</label>
                    <input type="text" id="instructions" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" placeholder="e.g. Leave at the door, Don't ring the bell" />
                  </div>
                </form>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center">
                <CreditCard className="w-5 h-5 text-brand-primary mr-3" />
                <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border border-brand-primary bg-brand-primary/5 rounded-xl cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="payment" value="upi" className="w-5 h-5 text-brand-primary focus:ring-brand-primary accent-brand-primary" defaultChecked />
                      <span className="ml-3 font-medium text-gray-800">UPI (GPay, PhonePe, Paytm)</span>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                  </label>
                  
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-brand-primary/50 transition-colors">
                    <div className="flex items-center">
                      <input type="radio" name="payment" value="card" className="w-5 h-5 text-brand-primary focus:ring-brand-primary accent-brand-primary" />
                      <span className="ml-3 font-medium text-gray-800">Credit / Debit Card</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">VISA</div>
                      <div className="w-8 h-5 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">MC</div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-brand-primary/50 transition-colors">
                    <div className="flex items-center">
                      <input type="radio" name="payment" value="cod" className="w-5 h-5 text-brand-primary focus:ring-brand-primary accent-brand-primary" />
                      <span className="ml-3 font-medium text-gray-800">Cash on Delivery</span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xl font-bold text-brand-dark flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-brand-primary" />
                  Order Summary
                </h2>
                <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center">
                           <span className="font-semibold text-gray-600 text-sm mr-2">{item.quantity}x</span>
                           <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                        </div>
                      </div>
                      <div className="text-gray-800 font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Platform Fee</span>
                    <span>₹5.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl mt-4 text-brand-dark pt-4 border-t border-gray-100">
                    <span>To Pay</span>
                    <span>₹{(grandTotal + 5).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  className="w-full mt-8 bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 flex justify-center items-center group"
                >
                  <span>Place Order</span>
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">By placing this order you agree to our terms and conditions.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
