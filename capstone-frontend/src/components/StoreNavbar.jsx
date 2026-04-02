import { useState } from 'react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../store/CartStore'
import { Link } from 'react-router'
import { useUserStore } from '../store/UserStore';
import { useNavigate } from 'react-router';
import '../styles/navbar.css';


export default function StoreNavbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  
  const { loggedIn, username, logout } = useUserStore();
  const items = useCartStore((state) => state.items)

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logging out
  };

  return (
    <header className= "bg-linear-to-tr from-green-200 via-blue-300 to-yellow-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Mobile Toggle & Desktop Links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="md:hidden lg:hidden text-black p-2"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Desktop Only Links */}
            <div className="hidden md:flex lg:flex items-center gap-6">
              <Link to="/" className="playfair-display text-lg hover:text-white transition-colors">Home</Link>
              <Link to="/critters" className="playfair-display text-lg hover:text-white transition-colors">Our Critters</Link>
            </div>
          </div>

          {/* Center Logo */}
          <div className="flex items-center">
            <Link to="/" className="Gistesy text-3xl md:text-4xl font-bold">
              Cozy Critter Crochet
            </Link>
          </div>

          {/* Right: Actions (Hidden on Mobile) + Cart (Always Visible) */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex lg:flex items-center gap-6">
              {loggedIn ? (
                <div className="flex items-center gap-4">
                  <span className="playfair-display text-sm font-medium">Hi, {username}</span>
                  <button onClick={handleLogout} className=" playfair-display text-sm font-medium text-red-500">Logout</button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link to="/signup" className=" playfair-display text-sm uppercase tracking-widest">Sign Up</Link>
                  <Link to="/login" className=" playfair-display text-sm uppercase tracking-widest">Login</Link>
                </div>
              )}
            </div>

            {/* Cart Icon - Always visible */}
            <Link to="/checkout" className="relative flex items-center p-5">
              <ShoppingBagIcon className="h-6 w-6 text-black" />
              {items.length > 0 && (
                <span className="flex-top-1 -right-2 bg-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {items.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      <div className={`fixed inset-0 z-100 lg:hidden transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Dark Overlay Background */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
        
        {/* Menu Content */}
        <div className="relative w-72 h-full bg-linear-to-b from-green-100 via-blue-100 to-yellow-50 shadow-2xl p-10 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <span className="Gistesy text-4xl">Menu</span>
            <button onClick={() => setOpen(false)}>
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col gap-6 px-2">
            <Link to="/" onClick={() => setOpen(false)} className="playfair-display text-xl font-medium border-b border-black/10 pb-2 pl-2">Home</Link>
            <Link to="/critters" onClick={() => setOpen(false)} className="playfair-display text-xl font-medium border-b border-black/10 pb-2 pl-2">Our Critters</Link>
            
            <div className="pt-6 space-y-4 px-2">
              {loggedIn ? (
                <>
                  <p className="text-xs uppercase tracking-widest text-gray-500 pl-2">Welcome, {username}</p>
                  <button onClick={handleLogout} className="text-red-500 font-medium pl-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className=" playfair-display block font-medium pl-2">Login</Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className=" playfair-display block font-medium pl-2">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}