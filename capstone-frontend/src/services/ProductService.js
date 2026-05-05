import axios from 'axios';

const baseUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3500/api/' 
    : 'https://ecommerce-capstone-p1ur.onrender.com/api/';

export async function getProducts() {
    const { data } = await axios.get(`${baseUrl}products`);
    return data;
}

export async function createProduct(productData) {
    const { data } = await axios.post(`${baseUrl}products`, productData);
    return data;
}

// This function retrieves a product by its ID and has been created for you, but you will need to import it in your components as needed.
export async function getProductById(id) {
    const { data } = await axios.get(`${baseUrl}products/${id}`);
    return data;
}

export async function deleteProduct(id) {
    const { data } = await axios.delete(`${baseUrl}products/${id}`);
    return data;
}