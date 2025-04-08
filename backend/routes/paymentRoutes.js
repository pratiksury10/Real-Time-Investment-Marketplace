const express = require('express');
const Stripe = require('stripe');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with the secret key

// Create a payment intent (to handle the payment request)
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // The amount to be paid

  try {
    // Create a payment intent with Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in smallest currency unit (e.g., cents)
      currency: 'usd', // You can change the currency as needed
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret, // Send the client secret to the frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Payment processing error' });
  }
});

module.exports = router;
