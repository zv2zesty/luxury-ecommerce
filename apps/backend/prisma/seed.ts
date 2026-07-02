import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear any existing data first to prevent duplicate errors
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('🧹 Cleaned up old database items...');

  // 1. Create a Classic Oxford Shirt
  await prisma.product.create({
    data: {
      name: 'Classic Fit Oxford Shirt',
      slug: 'classic-fit-oxford-shirt',
      description: 'Crafted from breathable cotton mesh, this iconic shirt features a relaxed silhouette and our signature embroidered Pony.',
      basePrice: 125.00,
      category: 'Men',
      images: [
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=80', // White Shirt Lookbook
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'  // Blue Shirt Detail
      ],
      variants: {
        create: [
          { sku: 'RL-OXF-WHT-SM', color: 'White', size: 'S', fit: 'Classic Fit', inventory: 15 },
          { sku: 'RL-OXF-WHT-MD', color: 'White', size: 'M', fit: 'Classic Fit', inventory: 25 },
          { sku: 'RL-OXF-WHT-LG', color: 'White', size: 'L', fit: 'Classic Fit', inventory: 20 },
          { sku: 'RL-OXF-BLU-SM', color: 'Blue', size: 'S', fit: 'Classic Fit', inventory: 12 },
          { sku: 'RL-OXF-BLU-MD', color: 'Blue', size: 'M', fit: 'Classic Fit', inventory: 30 },
          { sku: 'RL-OXF-BLU-LG', color: 'Blue', size: 'L', fit: 'Classic Fit', inventory: 18 }
        ]
      }
    }
  });

  // 2. Create a Premium Cable-Knit Sweater
  await prisma.product.create({
    data: {
      name: 'Cable-Knit Cashmere Sweater',
      slug: 'cable-knit-cashmere-sweater',
      description: 'An enduring Ralph Lauren hallmark, this slim-fitting sweater combines historical fisherman stitching with incredibly soft Italian combed cashmere.',
      basePrice: 398.00,
      category: 'Women',
      images: [
        'https://images.unsplash.com/photo-1574164904299-3a102b110380?w=800&auto=format&fit=crop&q=80' // Camel Colored Sweater
      ],
      variants: {
        create: [
          { sku: 'RL-CAB-CAM-SM', color: 'Camel', size: 'S', fit: 'Slim Fit', inventory: 8 },
          { sku: 'RL-CAB-CAM-MD', color: 'Camel', size: 'M', fit: 'Slim Fit', inventory: 14 },
          { sku: 'RL-CAB-CAM-LG', color: 'Camel', size: 'L', fit: 'Slim Fit', inventory: 5 }
        ]
      }
    }
  });

  console.log('✅ Luxury product catalog seeded smoothly into database!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
