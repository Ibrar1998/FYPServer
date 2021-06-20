
const express = require('express');

const stripe = require("stripe")("sk_test_51HqkVCAXTFLHhrkDtmM7mwW3F3Ro8CRPc6dySELxJAoRAGC65Pv0Adfd6ZtAnmGniiGJBIT0o82syPlktUGc4bJn00LidRIHGb");
const { v4: uuidv4 } = require('uuid');
const router = express.Router()



router.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);
   
    let error;
    let status;
    try {
      const { product, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: product.email,
        source: token.id
      });
  
      const idempotencyKey = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: product.email,
          description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotencyKey
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });   
   
  });


  module.exports = router ;