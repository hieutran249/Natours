/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
// import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const stripe = await loadStripe(
      'pk_test_51Ms89iHR8E1CS2Q9dFp8NVAPwNBSYS0qyXiW7uAudutZ9cjPEk01C3qYibcKeWveMHG2cpM5tMtrd3conGIFqLHH0085iXYmRn'
    );
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
