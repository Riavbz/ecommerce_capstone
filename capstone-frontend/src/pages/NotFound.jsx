import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-linear-to-br from-green-100 via-blue-50 to-pink-100 px-6">
      <div className="max-w-md w-full text-center space-y-8 bg-white/40 backdrop-blur-xl p-12 rounded-3xl border border-white shadow-2xl">
        
        {/* Whimsical 404 Number */}
        <h1 className="Gistesy text-9xl text-blue-400 drop-shadow-sm">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="playfair-display text-3xl font-bold text-gray-800 uppercase tracking-widest">
            Oh No!
          </h2>
          <p className="playfair-display italic text-gray-600">
            It looks like this critter wandered off the path.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-10 py-4 rounded-full font-bold tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:scale-105"
          >
            BACK TO SAFETY
          </Link>
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
          Cozy Critter Crochet
        </p>
      </div>
    </main>
  )
}

export default NotFound