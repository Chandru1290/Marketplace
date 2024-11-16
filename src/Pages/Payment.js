import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe with your publishable key
const stripePromise = loadStripe('sk_test_51QL3GiDi3N9twOxnGthSeAPohRoD1DLinPrE93JJHf0oBqC9eZsXOlJzQL3TPpVNdaioQRmSUbPsnAKUFIj2mDwg00bXvGn8Oi');

const CheckoutForm = ({ totalAmount, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setPaymentMessage('Stripe is not ready or client secret is missing.');
      setIsProcessing(false);
      return;
    }

    // Confirm the payment with the client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setPaymentMessage(`Payment failed: ${error.message}`);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setPaymentMessage('Payment successful!');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <CardElement className="p-4 border border-gray-300 rounded-md w-full" />
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md"
      >
        {isProcessing ? 'Processing...' : `Pay $${totalAmount}`}
      </button>
      {paymentMessage && <p className="mt-4 text-green-500">{paymentMessage}</p>}
    </form>
  );
};

const Payment = ({ totalAmount }) => {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    // Fetch the PaymentIntent client secret from your server
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: totalAmount * 100 }), // amount in cents
        });
        const data = await response.json();
        setClientSecret(data.client_secret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  return (
    <div className="payment-container max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="payment-title text-2xl font-bold mb-4">Payment</h1>
      <p className="payment-description mb-6">Enter your payment details below.</p>
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm totalAmount={totalAmount} clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default Payment;
