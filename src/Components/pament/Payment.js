import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Container } from "react-bootstrap";
import UseAuth from "../../hooks/useAuth/UseAuth";
import CheckoutForm from "./cheackoutForm/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51K7l3uSAvpXFqgby8eOepZqnZPDZJ1H0AAZdJVnR3XOzdPfEEP2eRTU3gYBzdcpxm0o7HvVA8P8Nv1ALNoUm4RTy00UtNdACJ5"
);
const Payment = () => {
  const { totalPrice, myorder } = UseAuth();
  return (
    <div className="payment">
      <Container>
        <h1>Please pay for {myorder?.length} Clothes</h1>
        <h1>Plese pay ${totalPrice}</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Container>
    </div>
  );
};

export default Payment;
