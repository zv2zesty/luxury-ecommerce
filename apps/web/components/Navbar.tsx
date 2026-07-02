'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '../store/useCart';

export default function Navbar() {
  const cartItems = useCart((state) => state.items);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-luxury-cream/90 backdrop-blur-md border-b border-neutral-200/50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left: Mobile Menu & Actions */}
          <div className="flex items-center lg:w-0 lg:flex-1">
            <button className="p-2 text-luxury-charcoal hover:text-neutral-500 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <button className="hidden lg:block p-2 text-luxury-charcoal hover:text-neutral-500">
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Center: Main Luxury Logotype */}
          <div className="text-center">
            <Link href="/" className="font-serif text-2xl sm:text-3xl tracking-[0.3em] uppercase text-luxury-navy font-semibold hover:opacity-90 transition-opacity">
              RALPH LAUREN
            </Link>
          </div>

          {/* Right: Shoppable Utilities */}
          <div className="flex items-center justify-end lg:w-0 lg:flex-1">
            <button className="group relative p-2 text-luxury-charcoal hover:text-neutral-500 transition-colors">
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-between justify-center rounded-full bg-luxury-navy text-[10px] font-medium text-white shadow-sm animate-fade-in">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
          
        </div>

        {/* Desktop Luxury Navigation Subheaders */}
        <nav className="hidden lg:flex justify-center space-x-12 pb-4 text-xs font-medium tracking-widest text-luxury-charcoal/80 uppercase">
          <Link href="/shop/men" className="hover:text-luxury-navy border-b border-transparent hover:border-luxury-navy pb-1 transition-all">Men</Link>
          <Link href="/shop/women" className="hover:text-luxury-navy border-b border-transparent hover:border-luxury-navy pb-1 transition-all">Women</Link>
          <Link href="/shop/kids" className="hover:text-luxury-navy border-b border-transparent hover:border-luxury-navy pb-1 transition-all">Kids</Link>
          <Link href="/shop/home" className="hover:text-luxury-navy border-b border-transparent hover:border-luxury-navy pb-1 transition-all">Home</Link>
        </nav>
      </div>
    </header>
  );
}
