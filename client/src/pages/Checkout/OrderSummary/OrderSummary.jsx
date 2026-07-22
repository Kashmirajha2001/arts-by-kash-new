import { useStore } from "../../../context/StoreContext";
import { createOrder, verifyPayment } from "../../../services/orderService";
import { useCheckout } from "../../../context/CheckoutContext";
import { showSuccess, showError } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../../../components/ui/PrimaryButton/PrimaryButton";

import styles from "./OrderSummary.module.css";

export default function OrderSummary() {
  const { cartProducts, subtotal, shipping, total, resetCart } = useStore();
  const { checkoutData, setCheckoutData, resetCheckout } = useCheckout();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const order = await createOrder({
        addressId: checkoutData.addressId,
        giftMessage: checkoutData.giftMessage,
        paymentMethod: checkoutData.paymentMethod,
      });

      console.log(order);

      const data = order.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        name: "Arts by Kash",

        description: "Order Payment",

        order_id: data.razorpayOrderId,

        handler: async function (paymentResponse) {
          try {
            await verifyPayment({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            resetCart();

            resetCheckout();

            // showSuccess("Payment Successful!");
            navigate(`/order-success/${data.orderId}`, {
              replace: true,
            });
          } catch (error) {
            console.error(error);
            showError("Payment verification failed.");
          }
        },

        prefill: {
          name: checkoutData.name,
          email: checkoutData.email,
          contact: checkoutData.phone,
        },

        theme: {
          color: "#8B6B52",
        },

        modal: {
          ondismiss: () => {
            showError("Payment cancelled.");
          },
        },
      };

      if (!window.Razorpay) {
        showError("Razorpay SDK failed to load.");
        return;
      }

      const razorpay = new window.Razorpay(options);

      razorpay.open();

      // console.log(order);
    } catch (error) {
      console.log(error);

      showError(error.response?.data?.message || "Unable to create order.");
    }
  };

  return (
    <aside className={styles.summary}>
      <h2>Order Summary</h2>

      <div className={styles.products}>
        {cartProducts.map((product) => (
          <div key={product.id} className={styles.product}>
            <img src={product.image[0]} alt={product.title} />

            <div className={styles.info}>
              <h4>{product.title}</h4>

              <span>
                ₹{product.price.toLocaleString()} × {product.quantity}
              </span>
            </div>

            <strong>
              ₹{(product.price * product.quantity).toLocaleString()}
            </strong>
          </div>
        ))}
      </div>

      <hr />

      <div className={styles.row}>
        <span>Subtotal</span>

        <strong>₹{subtotal.toLocaleString()}</strong>
      </div>

      <div className={styles.row}>
        <span>Shipping</span>

        <strong>
          {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}
        </strong>
      </div>

      <div className={styles.total}>
        <span>Total</span>

        <strong>₹{total.toLocaleString()}</strong>
      </div>

      <div className={styles.secure}>🔒 Secure payment powered by Razorpay</div>

      <PrimaryButton onClick={handlePayment}>Proceed to Payment</PrimaryButton>
    </aside>
  );
}
