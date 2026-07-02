import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        
        {/* Editorial Hero Box */}
        <div className="relative h-[85vh] w-full bg-neutral-900">
          <Image
            src="https://images.unsplash.com/photo-1603252109303-2751441dd157?w=1600&auto=format&fit=crop&q=80"
            alt="Ralph Lauren Editorial Collection"
            fill
            className="object-cover object-center opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs sm:text-sm font-medium tracking-[0.4em] text-white uppercase mb-3">New Season Arrival</p>
            <h1 className="text-4xl sm:text-6xl text-white font-light tracking-[0.2em] mb-8 max-w-4xl leading-tight">
              THE OXFORD TRADITION
            </h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop/men" className="bg-white text-luxury-navy px-10 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-luxury-navy hover:text-white transition-all duration-300 shadow-md">
                Explore Men
              </Link>
              <Link href="/shop/women" className="bg-transparent text-white border border-white px-10 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-luxury-navy transition-all duration-300">
                Explore Women
              </Link>
            </div>
          </div>
        </div>

        {/* Fine Art Collection Split Grids */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-light tracking-[0.2em] text-luxury-charcoal">THE HIGHLAND CAPTURE</h2>
            <p className="mt-2 text-sm text-neutral-500 font-serif italic">Time-tested layers built for modern utility.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative h-[600px] overflow-hidden bg-neutral-100">
              <Image 
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=80"
                alt="Tailored Classics"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-xl mb-2 font-medium">TAILORED SHIRTING</h3>
                <Link href="/shop/men" className="text-xs uppercase font-semibold tracking-widest underline underline-offset-4 hover:text-neutral-300">Shop Now</Link>
              </div>
            </div>

            <div className="group relative h-[600px] overflow-hidden bg-neutral-100">
              <Image 
                src="https://images.unsplash.com/photo-1574164904299-3a102b110380?w=1000&auto=format&fit=crop&q=80"
                alt="Cashmere Knitwear"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-xl mb-2 font-medium">ITALIAN CASHMERE</h3>
                <Link href="/shop/women" className="text-xs uppercase font-semibold tracking-widest underline underline-offset-4 hover:text-neutral-300">Shop Now</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
