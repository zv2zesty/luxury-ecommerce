'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Navbar from '../../../components/Navbar';
import { useCart, CartItem } from '../../../store/useCart';

interface Variant {
  id: string;
  sku: string;
  color: string;
  size: string;
  fit: string;
  inventory: number;
  price?: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: string;
  category: string;
  images: string[];
  variants: Variant[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive UI State Management
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  const addItemToCart = useCart((state) => state.addItem);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/products/${slug}`);
        if (res.ok) {
          const data: Product = await res.json();
          setProduct(data);
          
          // Pre-select the first available color option configuration by default
          if (data.variants && data.variants.length > 0) {
            setSelectedColor(data.variants[0].color);
          }
        }
      } catch (err) {
        console.error('Error contacting catalog service:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductData();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-xs tracking-widest uppercase font-medium animate-pulse text-neutral-400">Loading lookbook detail...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-sm font-serif italic text-neutral-500">The requested article could not be located inside our archive.</p>
        </div>
      </>
    );
  }

  // Filter sizes based strictly on the user's active color choice
  const availableSizesForColor = Array.from(
    new Set(product.variants.filter(v => v.color === selectedColor).map(v => v.size))
  );

  // Isolate distinct colors available across the product
  const uniqueColors = Array.from(new Set(product.variants.map(v => v.color)));

  // Locate the precise variant match mapping to the chosen configuration tiles
  const matchingVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const displayPrice = matchingVariant?.price ? Number(matchingVariant.price) : Number(product.basePrice);

  const handleAddToBag = () => {
    if (!selectedColor || !selectedSize || !matchingVariant) {
      alert('Please select a size to proceed.');
      return;
    }

    const cartPayload: CartItem = {
      id: matchingVariant.id,
      productId: product.id,
      name: product.name,
      sku: matchingVariant.sku,
      color: matchingVariant.color,
      size: matchingVariant.size,
      fit: matchingVariant.fit,
      price: displayPrice,
      image: product.images[0],
      quantity: 1,
      inventory: matchingVariant.inventory
    };

    addItemToCart(cartPayload);
    alert(`${product.name} (${selectedColor} / Size ${selectedSize}) added successfully to your bag.`);
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Left Block: Luxury Lookbook Photo Display Gallery */}
          <div className="space-y-4">
            <div className="aspect-[3/4] w-full relative overflow-hidden bg-neutral-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-w-7xl) 50vw, 100vw"
              />
            </div>
          </div>

          {/* Right Block: Content Meta Information and Custom Selection Fields */}
          <div className="flex flex-col justify-start pt-4 lg:max-w-md">
            <p className="text-xs uppercase font-medium tracking-[0.3em] text-neutral-400 mb-2">{product.category}&apos;s Apparel</p>
            <h1 className="text-2xl sm:text-3xl font-light tracking-widest text-luxury-navy uppercase mb-4">{product.name}</h1>
            <p className="text-lg font-serif text-neutral-800 mb-8">${displayPrice.toFixed(2)}</p>
            
            <hr className="border-neutral-200 mb-8" />
            
            <p className="text-sm leading-relaxed text-neutral-600 font-serif mb-8">{product.description}</p>

            {/* Color Matrix Picker */}
            <div className="mb-6">
              <h3 className="text-xs tracking-widest font-medium text-luxury-charcoal uppercase mb-3">Color: <span className="text-neutral-500 font-normal normal-case ml-1">{selectedColor}</span></h3>
              <div className="flex gap-3">
                {uniqueColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => { setSelectedColor(color); setSelectedSize(''); }}
                    className={`px-4 py-2 text-xs uppercase tracking-wider border font-medium ${selectedColor === color ? 'border-luxury-navy bg-luxury-navy text-white' : 'border-neutral-300 bg-white text-luxury-charcoal hover:border-neutral-400'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing Grid Tiles */}
            <div className="mb-8">
              <h3 className="text-xs tracking-widest font-medium text-luxury-charcoal uppercase mb-3">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {availableSizesForColor.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs uppercase font-medium tracking-widest border transition-all ${selectedSize === size ? 'border-luxury-navy bg-luxury-navy text-white shadow-sm' : 'border-neutral-200 bg-white text-luxury-charcoal hover:border-neutral-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Action Trigger Button */}
            <button
              onClick={handleAddToBag}
              disabled={matchingVariant && matchingVariant.inventory <= 0}
              className={`w-full py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${matchingVariant && matchingVariant.inventory <= 0 ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' : 'bg-luxury-navy text-white hover:bg-neutral-900 shadow-md'}`}
            >
              {matchingVariant && matchingVariant.inventory <= 0 ? 'Out of Stock' : 'Add to Shopping Bag'}
            </button>

          </div>
        </div>
      </main>
    </>
  );
}
