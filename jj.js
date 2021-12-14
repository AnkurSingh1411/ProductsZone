// const express = require('express');
// const paypal = require('paypal-rest-sdk');
// const app = express();
// const path = require ('path')
// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//     'client_id': 'AbnAIII7sAcepOBaWmmE63l9I7n8JlF1wr3-5HXxHhi4sns65_7qtMzHk7EYMMW-eZqmvcMUdpTOam96',
//     'client_secret': 'EAlh1z89a4aKq4K_CctYxAFUewyirRbdsqj_Io5HHSbLaJHpUg4Nx4l6qJRbxexpp7OdYtFFAkyd2qsQ'
// });

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => res.render('paypal'))

// app.post('/pay', (req, res) => {
//     const create_payment_json = {
//         "intent": "sale",
//         "payer": {
//             "payment_method": "paypal"
//         },
//         "redirect_urls": {
//             "return_url": "http://localhost:3000/success",
//             "cancel_url": "http://localhost:3000/cancel"
//         },
//         "transactions": [{
//             "item_list": {
//                 "items": [{
//                     "name": "Redhock Bar Soap",
//                     "sku": "001",
//                     "price": "25.00",
//                     "currency": "USD",
//                     "quantity": 1
//                 }]
//             },
//             "amount": {
//                 "currency": "USD",
//                 "total": "25.00"
//             },
//             "description": "Washing Bar soap"
//         }]
//     };

//     paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             for (let i = 0; i < payment.links.length; i++) {
//                 if (payment.links[i].rel === 'approval_url') {
//                     res.redirect(payment.links[i].href);
//                 }
//             }
//         }
//     });

// });

// app.get('/success', (req, res) => {
//     const payerId = req.query.PayerID;
//     const paymentId = req.query.paymentId;

//     const execute_payment_json = {
//         "payer_id": payerId,
//         "transactions": [{
//             "amount": {
//                 "currency": "USD",
//                 "total": "25.00"
//             }
//         }]
//     };

//     // Obtains the transaction details from paypal
//     paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//         //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
//         if (error) {
//             console.log(error.response);
//             throw error;
//         } else {
//             console.log(JSON.stringify(payment));
//             res.send('Success');
//         }
//     });
// });

// app.get('/cancel', (req, res) => res.send('Cancelled'));

// const PORT = 3000

// app.listen(PORT, () => console.log(`Server Started on ${PORT}`));