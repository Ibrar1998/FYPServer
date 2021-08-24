const express = require('express');
const paypal = require('paypal-rest-sdk');

const router = express.Router()


paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id:
        "AUmUWUytVM2OkumwmQqnJWN8xsM7N0NvMVCwMPDbbh8_AUp-jdx-oziFidnaOaPCrH2iZomzFi7FCDpQ",
    client_secret:
        "EOjBwTaU4Fk5DneFzaVX-s8svnI86hOa3dL6dsKSuCutyjjR7kCMEkEqi2wJD8bUK_OVS9KNoA2lhH35"
});

router.get('/',(req,res)=>{
    res.render('index');
  
})

router.post("/paypal", (req, res) => {
    console.log(req.body)
    const { Data } = req.body
   var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: { //http://192.168.0.111:7777/pay/succes
            return_url: `http://localhost:3000/Paypal?ChallanId=${Data._id}`,
            cancel_url: "http://192.168.0.104:7777/pay/cancel"
        },
        transactions: [
            {
                item_list: {
                    items: [ 
                        {
                            name: "Online Challan",
                            price: Data.Fine,
                            currency: "USD",
                            quantity: 1
                        }
                    ]
                },
                amount: {
                    currency: "USD",
                    total: Data.Fine
                 
                },
                description: "Electronic Challan Islamabad Traffic Police"
            }
        ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.send(payment.links[1].href);
       //  res.redirect(payment.links[1].href);
        }
     
    });  

   
});


router.get("/success", (req, res) => {
    
    //
    var PayerID = req.query.PayerID;
    var paymentId = req.query.paymentId;
    var execute_payment_json = {
        payer_id: PayerID,
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: "1.00"
                }
            }
        ]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
    ) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.render("success");
        }
    });
});

router.get("/cancel", (req, res) => {
    res.render("cancel");
});

module.exports = router ;