1. Customers place an order on your website or app
// We create trannscation id for each for each order

2. You create an order from your server
// For each order placed by your customer,
// use the Razorpay Orders API to create an order from your Server.

3. Pass Order ID to checkout and collect payment details
// pass the order id by rajorpay for our integration , so we can choose the payment type
// Payment detail are stored  securely by razorpay token.

4. Then razorpay request with bank ....