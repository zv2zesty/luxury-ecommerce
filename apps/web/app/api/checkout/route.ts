import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe instance using your secure private server token key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any, // Standard stable Stripe SDK API translation tier
});

interface IncomingCartItem {
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items }: { items: IncomingCartItem[] } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'The shopping cart is empty.' },
        { status: 400 }
      );
    }

    // Map your custom client cart array format cleanly into structured Stripe line-items objects
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: `${item.name} (${item.color} / Size ${item.size})`,
          description: `SKU: ${item.sku}`,
          images: [item.image],
        },
        // Stripe expects transactional dollar amounts to be computed strictly in absolute cents ($150.00 -> 15000)
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Establish a live financial payment configuration pipeline session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Customer shipping address validation collection rules matching luxury apparel workflows
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB'],
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout_cancelled=true`,
    });

    // Hand back the secure redirect gateway link to the waiting client client-side state script
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe initialization failure checkpoint intercepted:', error);
    return NextResponse.json(
      { error: error.message || 'An internal error occurred while processing checkout.' },
      { status: 500 }
    );
  }
}
