const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
let dotenv = require('dotenv').config()

// Send All Users 
router.get('/users' , async(req,res)=>{
	try{
		const Users = [
			{id : "1" , name : "Yash" , accountId : "acc_N4CVbayvgE38WH" },
			{id : "2" , name : "Aljit" , accountId : "acc_N3VBFEnR8IqSdC" },
			{id : "3" , name : "Aman" , accountId : "acc_N3QBXDk1JZbyfG" },
			{id : "4" , name : "Harsh" , accountId : "acc_N3PfIgU5Ecqa5v" },
		]
		return res.status(200).send({users : Users});
	}
	catch(err){
		console.log(err);
		res.status(400).send(err);
	}
})


router.post("/orders", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};
		
			const dataVal = await instance.orders.create(options);
			console.log(dataVal);
			res.send({data : dataVal});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post('/pay' , async(req,res)=>{
	try {
		const amountToSend = req.body.amount;
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: amountToSend,
			currency: "INR",
			transfers: [
			  {
				account: req.body.accountId, 
				amount: amountToSend,
				currency: "INR",
			  }
			],
		}
			const dataVal = await instance.orders.create(options);
			console.log(dataVal);
			return res.send({data : dataVal});

	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post('/SplitPayment' , async(req,res)=>{
	try {
		const amountToSend = req.body.amount | 20000;
		console.log(amountToSend);
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});
		const splitAmmount = amountToSend/2;

		const options = {
			amount: amountToSend,
			currency: "INR",
			transfers: [
			  {
				account: 'acc_N3PfIgU5Ecqa5v', 
				amount: splitAmmount,
				currency: "INR",
			  },
			  {
				account: "acc_N3QBXDk1JZbyfG",
				amount: splitAmmount,
				currency: "INR",
			  },
			],
		}
			const dataVal = await instance.orders.create(options);
			console.log(dataVal);
			return res.send({data : dataVal});

	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});
		
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const token = instance.payments.fetch(razorpay_payment_id);
		console.log(token);

		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", 'K0kngGByR5Aly2jJL5TdrMZK')
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			console.log("Success")
			return res.status(200).json({ message: "Payment verified successfully",
			paymentId : razorpay_payment_id
		});
		} else {
			console.log("fail")
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

// Working

// router.post('/fund' , (req,res)=>{
// 	var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

// 	instance.fundAccount.create({
// 	"customer_id":"cust_N3Vjq6MVupHciE",
// 	"account_type":"bank_account",
// 	"bank_account":{
// 		"name":"Aseem b",
// 		"account_number":"11214311215411",
// 		"ifsc":"HDFC0000053"
// 	}
// 	})
// })
module.exports = router;
