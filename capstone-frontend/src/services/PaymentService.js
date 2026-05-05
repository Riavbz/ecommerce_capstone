import axios from "axios";
const baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3500/' 
    : 'https://ecommerce-capstone-p1ur.onrender.com';
export async function checkoutCart(cartItems){
    const response = await axios.post(`${baseUrl}/checkout-session`, { cartItems });
    return response.data;
}
export async function createOrder(sessionId, userId=""){
    const response = await axios.post(`${baseUrl}/order?sessionId=${sessionId}&userId=${userId}`);
    return response.data;
}