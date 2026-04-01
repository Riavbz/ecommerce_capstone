import { useState } from 'react'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
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
    <header className="bg-white border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Left: Menu*/}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-gray-400"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <Link to="/" className="playfair-display text-lg font-bold">
              Home
            </Link>
            
            <Link to="/critters" className="playfair-display text-lg font-bold">
              Our Critters
            </Link>
          </div>

          {/* Center Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="Gistesy text-4xl font-bold">
              Cozy Critter Crochet
            </Link>
          </div>

          {/* Right: Cart & User Actions */}
          <div className="flex items-center gap-6">

            {loggedIn ? (
              // Show this if LOGGED IN
              <div className="flex items-center gap-4">
                <span className="playfair-display text-sm font-medium text-gray-700">
                  Hi, {username}
                </span>
                <button 
                  onClick={handleLogout}
                  className="playfair-display text-sm font-medium text-red-600 hover:text-red-800"
                >Logout</button>
                </div>
            ) : (
              // Show this if NOT LOGGED IN
              <>
                <Link to="/signup" className="playfair-display text-sm font-medium">
                  Sign Up
                </Link>
                <Link to="/login" className="playfair-display text-sm font-medium">
                  Login
                </Link>
              </>
            )}

            <Link to="/checkout" className="relative flex items-center">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600" />

              <span className="ml-2 text-sm font-medium text-gray-700">
                {items.length}
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}