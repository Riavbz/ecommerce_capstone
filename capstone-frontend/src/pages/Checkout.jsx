import React from 'react';
import { useCartStore } from '../store/CartStore';

const Checkout = () => {
    const { items, removeItem, clearCart } = useCartStore();

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

  return (
    <section>
        <h1>Checkout</h1>

        {items.map(item => (
            <div key={item._id}>
                <img src={item.image?.[0]?.url || "https://via.placeholder.com/150"} width="100" height="100" />
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>${item.price}</p>
                <button className="bg-green-300 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-lg mt-2" onClick={() => removeItem(item._id)}>
                    Remove
                </button>
            </div>
        ))}
        <h2>Total: ${total}</h2>

        <button onClick={() => {
            alert("Order placed!");
            clearCart();
        }}>
            Place Order
        </button>
    </section>
  );
};

export default Checkout;