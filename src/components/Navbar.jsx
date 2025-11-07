import React from 'react';
import { ShoppingCart, Users2, User } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-black" />
          <span className="text-lg font-bold">Velvet</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <button onClick={() => onNavigate('home')} className="text-sm font-medium text-gray-700 hover:text-gray-900">Home</button>
          <button onClick={() => onNavigate('products')} className="text-sm font-medium text-gray-700 hover:text-gray-900">Products</button>
          <button onClick={() => onNavigate('carts')} className="text-sm font-medium text-gray-700 hover:text-gray-900">Carts</button>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Group carts" onClick={() => onNavigate('carts')} className="rounded-full p-2 hover:bg-gray-100">
            <Users2 className="h-5 w-5" />
          </button>
          <button aria-label="Cart" onClick={() => onNavigate('carts')} className="rounded-full p-2 hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5" />
          </button>
          <button aria-label="Account" onClick={() => onNavigate('auth')} className="rounded-full p-2 hover:bg-gray-100">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
