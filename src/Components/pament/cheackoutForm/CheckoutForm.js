import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import { useState } from "react";
import UseAuth from "./../../../hooks/useAuth/UseAuth";
import "./checkoutForm.css";
const CheckoutForm = () => {
  const { totalPrice, myorder, user } = UseAuth();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const price = parseInt(totalPrice);
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    fetch("https://morning-retreat-22291.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [totalPrice]);
  const handleSubmit = async (e) => {
    console.log("Click");

    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      setSuccess("");
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
    if (intentError) {
      setError(intentError.message);
      setSuccess("");
    } else {
      setError("");
      console.log("payment intent", paymentIntent);
      setSuccess("your pament successfully ");
    }
    fetch(`https://morning-retreat-22291.herokuapp.com/myorder/${user.email}`, {
      method: "PUT", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(myorder),
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay ${totalPrice}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default CheckoutForm;
