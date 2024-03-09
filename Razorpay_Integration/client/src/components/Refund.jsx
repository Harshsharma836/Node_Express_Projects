import React, { useState } from 'react'
import axios from 'axios';

function Refund(props) {
    const[amount , setAmount] = useState(0);
    const [paymentDetails , setPaymentDetails] = useState("");
    const [refundAmount , setRefundAmount ] = useState(0);
    const paymentId = props.paymentId;

    const intiateRefund = async()=>{
      const authHeader = {
        auth: {
          username: process.env.REACT_APP_KEY_ID,
          password: process.env.REACT_APP_KEY_SECRET
        }
      }
      try{
        const refundUrl =`https://corsproxy.io/?https://api.razorpay.com/v1/payments/${paymentId}/refund`;
        const {data} = await axios.post(refundUrl,{amount : props.amount}, authHeader);
        console.log({msg : data});
        setRefundAmount(data);
      }
      catch(err){
        console.log(err);
      }
    }

    const findPaymentDetails = async()=>{
      try{
        const authHeader = {
          auth: {
            username: process.env.REACT_APP_KEY_ID,
            password: process.env.REACT_APP_KEY_SECRET
          }
      };
        const paymentDetailUrl = `https://corsproxy.io/?https://api.razorpay.com/v1/payments/${paymentId}`;
        const {data} = await axios.get(paymentDetailUrl , authHeader);  
        console.log(data);
        setPaymentDetails(data);
      }
      catch(err){
        console.log(err);
      }
    }

    return (
      <div> 
        <p>Want Refund for PaymentId :{paymentId} </p>
        <label>Enter Amount to Refund : 
        <input type='text' onChange={(e)=> setAmount(e.target.value)}></input></label>
        <button onClick={intiateRefund}>Initiate Refund</button>
        {refundAmount ? (
          <p>Refund Done</p>
        ) : (<p></p>)}

        <p>Get Payment Details by PaymentId : {paymentId}</p>
        <button onClick={findPaymentDetails}>Payment Details</button>
        {paymentDetails ? (
             <p>{JSON.stringify(paymentDetails)}</p>
        ) : (<div></div>)}
      </div>
    )
}
export default Refund