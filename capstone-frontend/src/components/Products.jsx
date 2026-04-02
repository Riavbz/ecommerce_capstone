import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import { getProducts } from "../services/ProductService";
import { deleteProduct } from "../services/ProductService";
import { useUserStore } from "../store/UserStore";

const Products = ({ filter }) => {
  const { role } = useUserStore();
  const [allProducts, setAllProducts] = useState([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchData();
  }, []);

  // Filtering logic
  const displayedProducts = filter === "All"
    ? allProducts
    : allProducts.filter(p => p.category?.includes(filter));

  const handleAddToCart = (product) => {
    addItem(product);
  };

  //Delete click
  const handleDelete = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete this "${productName}"?`)) {
      try {
        await deleteProduct(productId);
        setAllProducts(allProducts.filter(p => p._id !== productId));
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {displayedProducts.map((product) => (
        <section 
          key={product._id || product.id}
          className="bg-white p-6 rounded-none shadow-sm flex flex-col items-center group relative"
        >
          {/* Image Wrapper Div */}
          <div className="w-full aspect-square overflow-hidden mb-4 bg-gray-100 flex items-center justify-center">
             <img 
               src={product.image?.[0]?.url || "https://placeholder.com"} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
               alt={product.name} 
             />
          </div> {/* <--- YOU WERE MISSING THIS CLOSING DIV */}

          {/* Delete Button */}
          {role === "admin" && (
            <button 
              onClick={() => handleDelete(product._id, product.name)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs hover:bg-red-700 z-10"
            >
              Delete listing
            </button>
          )}

          <h3 className="playfair-display uppercase tracking-widest font-bold text-lg text-center">
            {product.name}
          </h3>
          
          <p className="text-gray-500 mt-1">Price: ${product.price}</p>
          
          <button 
            onClick={() => handleAddToCart(product)}
            className="bg-green-300 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-lg mt-4 w-full"
          > 
            Add to Cart
          </button>
        </section>
      ))}
    </section>
  );
};

export default Products;