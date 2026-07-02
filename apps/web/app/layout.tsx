import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ralph Lauren | Premium Luxury Storefront',
  description: 'Timeless style and craftsmanship. Explore our curated collections of luxury apparel and accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-luxury-cream text-luxury-charcoal selection:bg-luxury-navy selection:text-white">
      <body className="font-sans antialiased min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
