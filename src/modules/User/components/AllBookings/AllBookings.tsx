import { Box, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Base_Url } from "../../../../constants/End_Points";
import HeaderUserRoom from "../../../Shared/components/HeaderUserRoom/HeaderUserRoom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import axios from "axios";
import NoData from "../../../Shared/components/NoData/NoData";
import LoadingScreen from "../../../Shared/components/LoadingScreen/LoadingScreen";
import { toast } from "react-toastify";
export default function AllBooking() {
  const [isLoading, setLoading] = useState(false);
  const [AllBookingList, setAllBookingList] = useState([]);
  let getAllBooking = async () => {
    try {
      let response = await axios.get(`${Base_Url}/portal/booking/my`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setAllBookingList(response.data.data.myBooking);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllBooking();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {!isLoading ? (
        <Box>
          {AllBookingList.length > 0 ? (
            <Container>
              <HeaderUserRoom
                title={" Your Bookings"}
                linkTo={"all-bookings"}
                NameLink={"Bookings"}
                Name={"ALL Bookings"}
              />

              <Grid2 container sx={{ mt: 1 }}>
                {AllBookingList.map((item: any) => (
                  <Grid2
                    key={item._id}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ my: 1 }}
                  >
                    <Box
                      sx={{
                        width: "95%",
                        py: 2,
                        paddingLeft: 3,
                        boxShadow: "2",
                        borderRadius: "15px",
                      }}
                    >
                      <Box>
                        <Typography>
                          <ReceiptLongIcon sx={{ color: "#3252DF" }} />
                        </Typography>
                        <Typography
                          sx={{
                            color: "#1F263E",
                            fontWeight: 600,
                            fontFamily: "Poppins",
                            fontSize: "16px",
                          }}
                        >
                          Payment Time:{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#1F263E",
                            fontWeight: 600,
                            fontFamily: "Poppins",
                          }}
                        >
                          TotalPrice: {"$" + item.totalPrice}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#FF498B",
                            fontWeight: 600,
                            fontFamily: "Poppins",
                          }}
                        >
                          Booking Date{" "}
                          <HourglassEmptyIcon
                            sx={{ mt: 3, fontSize: "16px" }}
                          />
                        </Typography>
                        <Typography
                          sx={{
                            color: "#1F263E",
                            fontWeight: 600,
                            fontFamily: "Poppins",
                          }}
                        >
                          Start: {new Date(item.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#1F263E",
                            fontWeight: 600,
                            fontFamily: "Poppins",
                          }}
                        >
                          End: {new Date(item.endDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid2>
                ))}
              </Grid2>
            </Container>
          ) : (
            <NoData />
          )}
        </Box>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
