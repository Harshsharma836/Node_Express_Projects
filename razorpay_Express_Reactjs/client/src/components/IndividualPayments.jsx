import React from 'react'
import axios from "axios";
import "../App.css";
import { useEffect, useState } from "react";
import Refund from './Refund';

function Payments() {

    const[paymentId, setPaymentId] = useState("");
	const [refundAmount  , setRefundAmount] = useState(0);
	const [amount , setAmount] = useState(0);
	const [users, setUsers] = useState([]);


    useEffect(async()=>{
		const data = await axios.get('http://localhost:8080/api/payment/users');
		console.log(data);
		setUsers(data?.data?.users || []);
		console.log(data.data.users);
	}, [])

    const sendMoney = async (accountId) => {
		if(amount == 0){
			console.log("Enter the Amount to Send");
			return;
		} 
		else if(amount < 100){
			console.log("Amount Should be greater or equal to 100");
			return;
		}
		try {
			const orderUrl = "http://localhost:8080/api/payment/pay";
			// Sending the accountId and amount from frontend.
			const { data } = await axios.post(orderUrl, {accountId : accountId , amount : amount});
			console.log(data);
			initSendPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const initSendPayment = (data) => {
		const options = {
			key : process.env.REACT_APP_KEY_ID,
			amount: data.amount,
			currency: data.currency,
			description: "Sending Money",
			order_id: data.id, // for order id
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8080/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
					setPaymentId(data.paymentId);
					console.log("I am called")
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

  return (
    <div>
			{users.map((user , index) => (
						<div key={index}> Pay to {user.name}
							Enter Amount :<input type="text" onChange={(e)=> setAmount(e.target.value)}/>
							<button onClick={()=> sendMoney(user.accountId)} className="">
								Send Money
							</button>
							</div>
			))}
			{console.log(paymentId)}
			{paymentId ? (
				<Refund paymentId={paymentId}></Refund>
			) : (
				<p>Make A Payment For Refund</p>
			)}
			</div>
  )
}

export default Payments