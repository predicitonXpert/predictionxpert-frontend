// lib/stripe.ts
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Create a Stripe Checkout session and redirect to checkout
 */
export async function redirectToCheckout(userId: string, email: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      email,
      successUrl: `${window.location.origin}/checkout/success`,
      cancelUrl: `${window.location.origin}/checkout/cancel`,
    }),
  });

  const data = await response.json();

  if (!data.success || !data.url) {
    throw new Error(data.error || 'Failed to create checkout session');
  }

  // Redirect to Stripe Checkout
  window.location.href = data.url;
}

/**
 * Redirect to Stripe Customer Portal for subscription management
 */
export async function redirectToPortal(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/stripe/portal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      returnUrl: `${window.location.origin}/dashboard/billing`,
    }),
  });

  const data = await response.json();

  if (!data.success || !data.url) {
    throw new Error(data.error || 'Failed to create portal session');
  }

  // Redirect to Stripe Portal
  window.location.href = data.url;
}

/**
 * Get subscription status for a user
 */
export async function getSubscriptionStatus(userId: string): Promise<{
  status: string;
  priceId: string | null;
  currentPeriodEnd: string | null;
}> {
  const response = await fetch(`${API_URL}/api/stripe/subscription?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || 'Failed to get subscription status');
  }

  return data.data;
}
