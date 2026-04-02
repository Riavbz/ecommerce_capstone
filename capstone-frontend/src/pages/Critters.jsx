import React, { useState } from 'react'; // 1. Added useState
import Products from '../components/Products';
import { useUserStore } from '../store/UserStore'; // 2. Added store
import { createProduct } from '../services/ProductService'; // 3. Added for the form

const Critters = () => {
   const { role, userId } = useUserStore();
   const [filter, setFilter] = useState("All");

   // 4. Added Form State (Since you want the Admin form here)
   const [productName, setProductName] = useState("");
   const [price, setPrice] = useState(0);
   const [category, setCategory] = useState("Farm");

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const formData = {
            name: productName,
            price: price,
            userId: userId,
            description: "Handmade crochet critter",
            category: [category],
         };
         await createProduct(formData);
         alert("Product Created!");
         window.location.reload();
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className='bg-linear-to-tr from-pink-200 via-purple-100 to-yellow-100 min-h-screen flex flex-col'>
         <main className=" grow max-w-7xl mx-auto px-4 py-12 pb-24">
      <h1 className="cactus-classical-serif-regular text-4xl font-bold text-center mb-12 uppercase tracking-widest">
           Full Collection
      </h1>
      
      {/* Admin Form */}
      {role === "admin" && (
         <div className="bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white mb-12 shadow-sm">
            <h3 className="font-bold mb-4">Add New Listing</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
               <input 
                  type="text" 
                  placeholder="Name" 
                  value={productName} 
                  onChange={(e) => setProductName(e.target.value)}
                  className="border p-2 rounded"
               />
               <input 
                  type="number" 
                  placeholder="Price" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  className="border p-2 rounded"
               />
               <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2 rounded"
               >
                  <option value="Marine">Marine</option>
                  <option value="Farm">Farm</option>
                  <option value="Llamapalooza">Llamapalooza</option>
               </select>
               <button type="submit" className="bg-black text-white py-2 rounded font-bold">
                  Create Product
               </button>
            </form>
         </div>
      )}

      {/* Filter Bar */}
      <div className="flex justify-center gap-4 mb-10">
         {["All", "Marine", "Farm", "Llamapalooza"].map(cat => (
            <button 
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-6 py-2 rounded-full border transition-all ${
                  filter === cat ? 'bg-pink-400 text-white' : 'bg-cyan-100 hover:bg-gray-100'
               }`}
            >
               {cat}
            </button>
         ))}
      </div>

      <Products filter={filter} />
    </main>
    </div>
  );
};

export default Critters;