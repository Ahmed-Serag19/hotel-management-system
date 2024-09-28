import {CardElement, Elements} from "@stripe/react-stripe-js"

import React from 'react'
import { loadStripe } from "@stripe/stripe-js"

const stripe = loadStripe("pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8")
export default function Payment() {
    return <Elements stripe={stripe}>

    <CheckoutForm/>
  </Elements>





}
const CheckoutForm =()=>{
    return <>
    <form className="form-wrapper">
        <div className="card">
        <CardElement/>
        <button className="submit-btn">Pay Booking</button> 
        </div>
  
    </form>

    </>
}
