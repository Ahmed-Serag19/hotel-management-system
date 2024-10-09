import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Box, Grid, Grid2, Typography } from "@mui/material"; // Fixed the Grid import
import { FormEvent, useContext } from "react";
import { Base_Url } from "../../../../constants/End_Points";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/authcontext";

// Define the type for the params to be passed to the CheckoutForm
interface CheckoutFormProps {
  bookingId: string | undefined;
}

const stripePromise = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

export default function Payment() {
  const { bookingId } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm bookingId={bookingId} />
    </Elements>
  );
}

// Make sure that bookingId is properly passed as a prop
const CheckoutForm = ({ bookingId }: CheckoutFormProps) => {
  let navigate = useNavigate();
  let { loginData }: any = useContext(AuthContext);
  if (loginData?.role != "user") {
    navigate("/NotFound");
  }

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);
    const addressElement = elements.getElement(AddressElement);

    if (!cardElement || !addressElement) return;

    const result = await stripe.createToken(cardElement);
    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    // Ensure bookingId is passed correctly
    await payBooking(result.token.id, bookingId, navigate);
  };

  return (
<>
    {loginData?.role === "user" ?<Box>
      <Grid2 container>
      <form className="form-wrapper" onSubmit={handleSubmit}>
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

        <button className="cancel-btn" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </Grid2>
      </Box> : navigate("/NotFound")}
      </>
  );
  
};

// Update the payBooking function to expect the correct bookingId structure
const payBooking = async (
  token: string,
  bookingId: string | undefined,
  navigate: (path: string) => void
) => {
  if (!bookingId) {
    toast.error("Booking ID is missing");
    return;
  }

  try {
    const res = await axios.post(
      `${Base_Url}/portal/booking/${bookingId}/pay`,
      { token },
      {
        headers: { Authorization: localStorage.getItem("token") || "" },
      }
    );

    if (res.data.success === true) {
      navigate("/dashboard/payment-page");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Payment failed", {
      autoClose: 5000,
    });
  }
};
