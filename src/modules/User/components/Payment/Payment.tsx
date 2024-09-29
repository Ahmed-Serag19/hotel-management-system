import {AddressElement, CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js"
import { Box, Grid2, Typography } from "@mui/material"

import { Base_Url } from "../../../../constants/End_Points"
import { FormEvent, useContext } from 'react'
import PaymentIcon from '@mui/icons-material/Payment';
import axios from "axios"
import { loadStripe } from "@stripe/stripe-js"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/authcontext";

// let { loginData }: any = useContext(AuthContext);
// if (loginData?.role != "user") {
//   navigate("/NotFound");
// }
const stripe = loadStripe("pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8")
export default function Payment() {
    return <Elements stripe={stripe}>

    <CheckoutForm/>
  </Elements>
}

const CheckoutForm =()=>{

    const stripe = useStripe ()
    const elements =useElements()
    const handelSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        if (!elements || !stripe ) return;
         const cardElement =elements?.getElement("card")
         const addressElement=elements.getElement("address")
        if (!cardElement  || !addressElement) return;
        const result = await stripe?.createToken (cardElement)
        const addressValue = await addressElement.getValue()
       console.log(addressValue)
  if (result.error) {
    console.log({error :result.error})
    return;
  }
  await payBooking(result.token.id)
  console.log(result.token.id)
    }

    return <>
    <Grid2 container   >



    <form className="form-wrapper" onSubmit={handelSubmit} >
          
  <Typography  sx={{color:"#152C5B" , fontFamily:"Poppins",fontSize:"28px",textAlign:"center"}}>Payment
  <PaymentIcon fontSize="large" sx={{color:"#FF498B" }} className="PaymentIcon" />
  </Typography>

        <Box className="card">
        <CardElement/>
      
        </Box>
        <AddressElement options={{mode:"billing"}}/>
        <button className="submit-btn">Pay Booking</button> 
    </form>

            
    
    </Grid2>

    </>
}
const payBooking= async(token:string )=>{

    try {
await axios.post(`${Base_Url}/portal/booking/65aa684cdb75ac49803569e5/pay`,  //  id booking
        {token},
        {
            headers: { Authorization: localStorage.getItem("token") }
        }
    )
    toast.success("Successfully Payment")

    
    } catch (error:any) {
        console.log(error.response.data.message)
        
    }
}