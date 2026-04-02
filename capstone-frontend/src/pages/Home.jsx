import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getProducts } from '../services/ProductService'
import Products from '../components/Products';
import { useUserStore } from '../store/UserStore';
import HomeImg from '../assets/HomeImg.webp';


const Home = () => {
  const { username } = useUserStore();
  const [products, setProducts] = useState([]);

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

  return (
    <main className="main-content min-h-screen bg-[linear-gradient(90deg,#cdffd8,#94b9ff)] px-6">
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row h-[70vh]">
        {/* Left Side: Text and Gradient */}
        <div className="md:w-1/2 bg-linear-to-tr from-pink-200 via-purple-100 to-yellow-100 flex flex-col justify-center px-12 lg:px-24 text-center md:text-left space-y-6">
          <h1 className="playfair-display text-5xl lg:text-6xl font-medium leading-tight">
            Handmade hugs in <br /> every stitch.
          </h1>
          <p className="text-gray-600 max-w-md">
            Each critter is crafted with love and care, ready to bring a smile to your home.
          </p>
          <Link to="/critters" className="inline-block bg-[#86EFAC] hover:bg-green-400 text-white px-8 py-3 rounded-full font-bold transition-all w-fit mx-auto md:mx-0">
            SHOP NOW
          </Link>
        </div>

        {/* Right Side: Image Grid */}
        <div className="md:w-1/2 relative overflow-hidden bg-linear-to-tr from-green-200 via-blue-300 to-yellow-100">
          <img 
            src={HomeImg} 
            alt="Crochet Grid" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="bg-[#B9D9EB] py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="playfair-display text-2xl font-medium uppercase tracking-widest text-black">Our Critters</h2>
            <Link to="/critters" className=" playfair-display text-sm font-bold text-black flex items-center hover:underline">
              MORE <span className="ml-2">→</span>
            </Link>
          </div>
          
          {/* Show only 2 featured products on Home */}
          <Products products={products.slice(0, 2)} />
        </div>
      </section>

      <div className="py-8 text-center italic playfair-display text-xl text-black">
        <p>Welcome back, {username || "guest"}</p>
      </div>
    </main>
  )
}

export default Home;