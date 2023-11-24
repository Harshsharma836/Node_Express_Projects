const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
let dotenv = require('dotenv').config();
let axios = require('axios');

router.post("/", async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});
        try{
            const authHeader = {
                auth: {
                  username: process.env.KEY_ID,
                  password: process.env.KEY_SECRET,
                }
            };
            const paymentid = req.body.paymentid;
            const data = await axios.post(`https://api.razorpay.com/v1/payments/${paymentid}/refund`
            , 
            authHeader);

            // header : auth token 
            
            //const refundHistory = await axios.get(`https://api.razorpay.com/v1/payments/${paymentid}/refunds`);
            console.log(data + "hold");
            if(data == undefined){
                return res.send("Money already refunded");
            }
            return res.status(200).send({data : data});
        }

        catch(err){
            console.log(" I am called 1")
            console.log((err));
            return res.status(400).send(err.message);
        }
	} catch (error) {
        console.log("I am called 2")
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error.message);
	}
});

module.exports = router;