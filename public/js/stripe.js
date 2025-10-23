import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51SJWYe23LY2CU6b4lMgCXJAHkH0u31JA1G9UYLUt0E7LoDggetTzBPeFQhulGS7qhH8DSu8IHouazE9Dd0lLQezn00c6ZpIq4s'
);
export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form + chan credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
