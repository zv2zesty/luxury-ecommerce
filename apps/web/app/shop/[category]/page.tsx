import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';

interface PageProps {
  params: Promise<{ category: string }>;
}

interface ProductWithVariants {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: string;
  category: string;
  images: string[];
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  
  // Format slug category text into visual title (e.g., "men" -> "Men")
  const capitalizedTitle = category.charAt(0).toUpperCase() + category.slice(1);

  let products: ProductWithVariants[] = [];
  
  try {
    // Fetches live data from our Express backend api pipeline built in File 7
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`, {
      next: { revalidate: 60 } // Cache results on Edge node for 60 seconds
    });
    
    if (response.ok) {
      const allProducts: ProductWithVariants[] = await response.json();
      // Filter catalog to display matches targeting the requested group route parameter
      products = allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
  } catch (error) {
    console.error('Failed to communicate with catalog database engine:', error);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Editorial Subtitle Block */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-light tracking-[0.25em] uppercase text-luxury-navy">
            The {capitalizedTitle} Collection
          </h1>
          <p className="mt-2 text-sm text-neutral-400 font-serif italic">
            Refined pieces engineered for effortless seasonal transitions.
          </p>
        </div>

        {/* Catalog Fallback State */}
        {products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-200">
            <p className="text-sm text-neutral-500 font-serif">We are currently cataloging our latest luxury iterations. Please return shortly.</p>
          </div>
        ) : (
          /* Products Layout Feed Grid */
          <div className="grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`} className="group block cursor-pointer">
                <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-w-7xl) 33vw, 100vw"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center text-center">
                  <h3 className="text-xs font-medium tracking-widest text-luxury-charcoal uppercase mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-serif text-neutral-600">
                    ${Number(product.basePrice).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
