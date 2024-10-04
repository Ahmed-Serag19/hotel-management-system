import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Box, Grid2, Typography } from "@mui/material";
import { FormEvent } from "react";
import { Base_Url } from "../../../../constants/End_Points";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const stripe = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

export default function Payment() {
    const {bookingId} = useParams();
    
  return (
    <Elements stripe={stripe}>
      <CheckoutForm bookingId={bookingId}  />
    </Elements>
  );
}

const CheckoutForm = (bookingId: string) => {
  const stripe = useStripe();
  const elements = useElements();
  const handelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!elements || !stripe) return;
    const cardElement = elements?.getElement("card");
    const addressElement = elements.getElement("address");
    if (!cardElement || !addressElement) return;
    const result = await stripe?.createToken(cardElement);
    const addressValue = await addressElement.getValue();
    if (result.error) {
        toast.error(result.error.message);
      return;
    }
    await payBooking(result.token.id, bookingId);
  };

  return (
    <>
      <Grid2 container>
        <form className="form-wrapper" onSubmit={handelSubmit}>
          <Typography
            sx={{
              color: "#152C5B",
              fontFamily: "Poppins",
              fontSize: "28px",
              textAlign: "center",
            }}
          >
            Payment
            <PaymentIcon
              fontSize="large"
              sx={{ color: "#FF498B" }}
              className="PaymentIcon"
            />
          </Typography>

          <Box className="card">
            <CardElement />
          </Box>
          <AddressElement options={{ mode: "billing" }} />
          <button className="submit-btn">Pay Booking</button>
        </form>
      </Grid2>
    </>
  );
};

const payBooking = async (token: string, bookingId: string) => {
  try {
    const res = await axios.post(
      `${Base_Url}/portal/booking/${bookingId.bookingId}/pay`,
      { token },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    );

    if(res.data.success == true){
        toast.success(res.data.message);
        window.location.href = `${window.location.hostname}/all-bookings`;
    }    
  } catch (error) {
    toast.error(error.response.data.message, {
      autoClose: 5000,
    });
  }
};
