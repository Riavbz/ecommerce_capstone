import React from 'react'
import { Link } from 'react-router'
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-linear-to-br from-green-100 via-blue-200 to-yellow-50 border-t border-white/20">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Brand/Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="Gistesy text-1xl font-bold text-gray-800">
              Cozy Critter Crochet
            </Link>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
              &copy; {currentYear} Cozy Critter Crochet
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer