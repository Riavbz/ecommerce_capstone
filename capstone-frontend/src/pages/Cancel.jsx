import React from 'react'
import { Link } from 'react-router'

const Cancel = () => {
  return (
    <main className="min-h-screen bg-linear-to-br from-pink-100 via-purple-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-white">
        
        <div className="space-y-6">
          {/* Gentle "Information" Icon */}
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="Gistesy text-6xl text-gray-800">Not quite ready?</h2>
          
          <div className="space-y-2">
            <p className="playfair-display text-xl font-bold text-gray-700 uppercase tracking-widest">
              Payment Cancelled
            </p>
            <p className="playfair-display italic text-gray-600">
              No worries! Your critters are still safe in your basket, waiting for whenever you're ready.
            </p>
          </div>

          <div className="pt-6 flex flex-col gap-4">
            <Link 
              to="/checkout" 
              className="bg-black text-white font-bold py-4 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:scale-[1.02]"
            >
              RETURN TO CHECKOUT
            </Link>
            
            <Link 
              to="/critters" 
              className="text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest"
            >
              Continue Browsing
            </Link>
          </div>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-10">
          Cozy Critter Crochet
        </p>
      </div>
    </main>
  )
}

export default Cancel