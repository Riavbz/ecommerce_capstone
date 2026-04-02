import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router"
import { createOrder } from "../services/PaymentService"
import { useUserStore } from "../store/UserStore"
import { useCartStore } from "../store/CartStore"

const Success = () => {
  const { userId } = useUserStore();
  const { clearCart } = useCartStore(); // clearCart function
  const [searchParam] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const sessionId = searchParam.get("session_id");

  useEffect(() => {
    async function handleCreateOrder(id) {
    if (!sessionId) return;

    try {
      const data = await createOrder(id, userId);
      setOrderDetails(data);
      clearCart();
    } catch (error) {
      console.error("Order Creation Error:", error);
    } finally {
      setLoading(false);
    }
  }
  if(sessionId) {
        handleCreateOrder(sessionId);
    }
  }, [sessionId, userId, clearCart]);

console.log("sessionId:", sessionId);
console.log("userId:", userId);

  return (
    <main className="min-h-screen bg-linear-to-tr from-green-100 via-blue-50 to-purple-100 flex items-center justify-center p-6">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white">
            
            {loading ? (
                <div className="space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="playfair-display italic text-gray-500">Confirming your new friends...</p>
                </div>
            ) : orderDetails ? (
                <div className="space-y-6">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    <h2 className="playfair-display text-4xl font-bold text-gray-800">Yay! It's Official.</h2>
                    <p className="text-gray-600">Your payment was successful and your critters are getting ready for their journey!</p>
                    
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 text-left space-y-2">
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Order Number</p>
                        <p className="font-mono text-blue-600 text-lg">{orderDetails.orderNumber}</p>
                        
                        <div className="pt-4 border-t flex justify-between items-center">
                            <span className="font-bold text-gray-700">Total Paid</span>
                            <span className="text-2xl font-bold text-green-600">${orderDetails.totalPrice?.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link 
                        to="/" 
                        className="inline-block w-full bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-all shadow-lg"
                    >
                        RETURN HOME
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-red-500 font-bold">Something went wrong with saving your order.</p>
                    <Link to="/checkout" className="underline">Go back to checkout</Link>
                </div>
            )}
        </div>
    </main>
  )
}

export default Success;