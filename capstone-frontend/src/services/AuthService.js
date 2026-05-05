import axios from "axios";

const baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3500/api/' 
    : 'https://ecommerce-capstone-p1ur.onrender.com';

export async function signup(payload) {
    const response = await axios.post(`${baseUrl}/signup`, payload);
    return response.data; // data from the API ENDPOINT
}

export async function login(payload) {
    const response = await axios.post(`${baseUrl}/login`, payload);
    return response.data; // data from the API ENDPOINT
}