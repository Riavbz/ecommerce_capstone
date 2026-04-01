import React, { useState, useEffect } from 'react'
import { getProducts, createProduct } from '../services/ProductService'
import Products from '../components/Products';
import { useUserStore } from '../store/UserStore';

const Home = () => {
  const { userId, username, role } = useUserStore();
  const [products, setProducts] = useState([]);
  const [id, setId] = useState(4);
  const [productName, setProductName] = useState("PLACEHOLDER");
  const [price, setPrice] = useState(1);
  const [category, setCategory] = useState("Farm");
  const [filter, setFilter] = useState("All");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: productName,
        price: price,
        userId: userId,
        description: "Default Description",
        category: [category],
      }
      await createProduct(formData);
      alert("Product Created!");
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

   //Filter Logic
  const filteredProducts = filter === "All"
  ? products : products.filter(p => p.category.includes(filter));

  const featuredProducts = products.slice(0, 4);
  
  return (
    <main className='main-content'>
      <p>Welcome back {username || "guest"}</p>

      {/* Filter Buttons */}
      <div className="flex gap-4 my-6">
        {["All", "Marine", "Farm", "Llamapalooza"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border ${
              filter === cat ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {role === "admin" && (
        <form onSubmit={handleSubmit}>
          <label>id</label>
          <br />
          <input 
            type="number" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
          />
          <br />
          
          <label>name</label>
          <br />
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
          />
          <br />
          
          <label>price</label>
          <br />
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
          <br />

          <label htmlFor="category">Category</label>
          <br />
          <select 
            id="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded p-1">
            <option value="Marine">Marine</option>
            <option value="Farm">Farm</option>
            <option value="Llamapalooza">Llamapalooza</option>
          </select>
          <br />
          <button type="submit">Create New Product</button>
        </form>
      )}
      <Products filter={filter} />
    </main>
  )
}

export default Home