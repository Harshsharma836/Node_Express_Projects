import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Payments from "./IndividualPayments";

function PaymentPage() {
    const[paymentId, setPaymentId] = useState("");
	const [refundAmount  , setRefundAmount] = useState(0);
	const [amount , setAmount] = useState(0);
	const [users, setUsers] = useState([]);
	
	// For Orders 
	const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		price: 250,
	});

	
	const initPayment = (data) => {
		const options = {
			key : process.env.REACT_APP_KEY_ID,
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			order_id: data.id, // for order id
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:8080/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
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

	const ApiPaymentTesting = (dataVal) => {
		console.log(dataVal);
		const amountToSplit = dataVal.amount/2;
		const options = {
				key : process.env.REACT_APP_KEY_ID,
				amount: dataVal.amount,
				currency: "INR",
				order_id: dataVal.id, // for order id
				transfers: [
				  {
					account: 'acc_N3PfIgU5Ecqa5v', 
					amount: amountToSplit,
					currency: "INR",
				  },
				  {
					account: "acc_N3QBXDk1JZbyfG",
					amount: amountToSplit,
					currency: "INR",
				  },
				],
				handler: async (response) => {
					try {
						const verifyUrl = "http://localhost:8080/api/payment/verify";
						const { data } = await axios.post(verifyUrl, response);
						console.log(data);
						setPaymentId(data.paymentId);
						//setAmount(data.paymentAmount);

					} catch (error) {
						console.log(error);
					}
				},
				theme: {
					color: "#3399cc",
				},
		}
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:8080/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const apiTesting = async () => {
		try {
			const orderUrl = "http://localhost:8080/api/payment/SplitPayment";
			const { data } = await axios.post(orderUrl, {amount : amount});
			ApiPaymentTesting(data.data);
			console.log(paymentId);
		} catch (error) {
			console.log(error);
		}
	};

	

	const intiateRefund = async()=>{
		try{
			const refundUrl = "http://localhost:8080/api/refund";
			console.log(paymentId);
			//const refundUrl = `https://api.razorpay.com/v1/payments/${paymentId}/refund`;
			const {data} = await axios.post(refundUrl, {paymentid : paymentId, amount : refundAmount});
			console.log(data);
		}
		catch(err){
			console.log(err);
		}
	}

	return (
		<div className="App">
			<div className="book_container">
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">
					buy now
				</button>

				<br></br><br></br>
				<div>	
					<h2>Split Payment To Both Aljit and Yash</h2>
					<label> Enter Amount To Send
					<input type="text" onChange={(e)=> setAmount(e.target.value)}></input>
					</label>
					<br></br><br></br>
					<button onClick={apiTesting} className="">
						Send Money
					</button>
				</div>
				{paymentId ? (
				<div>
					<p>Payment successfully ${paymentId}</p>
					<label> Amount to Refunded :
						<input type="text" onChange={(e)=> setRefundAmount(e.target.value)} ></input>
					</label>
					<button onClick={intiateRefund}  className="">inintiateRefund</button>
				</div>
				) : ( <div></div>)}

			</div>		
		</div>
	);
}

export default PaymentPage


