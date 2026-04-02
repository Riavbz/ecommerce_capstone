import React from 'react';
import { useCartStore } from '../store/CartStore';
import { checkoutCart } from '../services/PaymentService';

const Checkout = () => {
    const { items, removeItem } = useCartStore();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    async function handleCheckout() {
    try {
        const data = await checkoutCart(items);
        if(data.url){ // check if session was successfully created
            window.location.href = data.url; // reroute the user to checkout page
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <section className='min-h-screen bg-linear-to-tr from-pink-100 via-purple-50 to-yellow-100 py-12 px-4'>
            <div className="max-w-4xl mx-auto">
                <h1 className="playfair-display text-4xl font-bold text-center mb-2">Checkout</h1>
                <p className=" lora text-center text-gray-500 mb-10 italic">Review your new friends before they head home</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT: Item List */}
                    <div className="lg:col-span-2 space-y-4 ">
                        {items.length > 0 ? (
                            items.map(item => (
                                <div key={item._id} className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm flex items-center gap-4 m-4 border border-white">
                                    <img 
                                        src={item.image?.[0]?.url || "https://via.placeholder.com/150"} 
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-xl shadow-inner"
                                    />
                                    <div className="flex-1">
                                        <h3 className="playfair-display font-bold text-lg uppercase tracking-wider">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Unit Price: ${item.price}</p>
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-sm font-medium bg-purple-100 px-3 py-1 rounded-full text-purple-700">
                                                Qty: {item.quantity}
                                            </span>
                                            <button 
                                                className="text-xs text-red-400 hover:text-red-600 underline transition-colors" 
                                                onClick={() => removeItem(item._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white/40 rounded-2xl border-2 border-dashed border-gray-300">
                                <p className="text-gray-500">Your basket is empty...</p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Summary Sidebar */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg h-fit border border-gray-100">
                        <h2 className="playfair-display text-2xl font-bold mb-6">Summary</h2>
                        <div className="space-y-4 text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-500 font-medium text-xs uppercase tracking-tighter pt-1">Calculated at Checkout</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between text-xl font-bold text-gray-900">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            type="button"  
                            onClick={handleCheckout}
                            disabled={items.length === 0}
                            className="w-full m-5 bg-black text-white font-bold py-4 rounded-full mt-8 hover:bg-gray-800 transition-all shadow-xl disabled:bg-gray-300 disabled:shadow-none"
                        >
                            PAY WITH STRIPE
                        </button>
                        
                        <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">
                            Secure Encrypted Payment
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;