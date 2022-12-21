import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51MH16dIz9NjxvTNBqqHbiibL0PKU0I9k4XKkbA0UArFNH9ky7xOSWiJ31c9scPMxPa42J58kC7D63ddOxFtflp9P00WhRXCchY'
);

export const bookTour = async (tourId) => {
  try {
    //1) получить сеанс проверки из API
    const session = await axios(
      `http://localhost:4000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    //2) создать форму оформления заказа + процесс + кредитная карта
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
