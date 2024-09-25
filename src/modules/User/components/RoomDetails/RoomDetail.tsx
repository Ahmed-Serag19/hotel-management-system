import {
  Breadcrumbs,
  Button,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import RoomImg1 from "../../../../assets/images/room big.png";
import RoomImg2 from "../../../../assets/images/room img.png";
import RoomImg3 from "../../../../assets/images/room img2.png";
import ic_bedroom from "../../../../assets/images/ic_bedroom.png";
import ic_livingroom from "../../../../assets/images/ic_livingroom.png";
import ic_bathroom from "../../../../assets/images/ic_bathroom.png";
import ic_diningroom from "../../../../assets/images/ic_diningroom 1.png";
import ic_wifi from "../../../../assets/images/ic_wifi.png";
import ic_ac from "../../../../assets/images/ic_ac.png";
import ic_kulkas from "../../../../assets/images/ic_kulkas.png";
import ic_tv from "../../../../assets/images/ic_tv.png";
import { FaStar } from "react-icons/fa";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function RoomDetail() {
  return (
    <>
      {/* Breadcrumbs */}
      <Stack direction="row" sx={{ padding: 5, alignItems: "center" }}>
        <Box role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography sx={{ color: "#152C5B" }}>Room Details</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ marginX: "auto", textAlign: "center" }}>
          <Typography variant="h4" sx={{ color: "#152C5B", fontWeight: 600 }}>
            Village Angga
          </Typography>
          <Typography sx={{ color: "#B0B0B0" }}>Bogor, Indonesia</Typography>
        </Box>
      </Stack>
      {/* Room Images */}
      <Box sx={{ padding: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={RoomImg1}
              alt="First Image"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Stack
            spacing={2}
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <img
                src={RoomImg2}
                alt="Second Image"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <img
                src={RoomImg3}
                alt="Third Image"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Stack>
        </Stack>
      </Box>
      {/* Details */}
      <Box sx={{ paddingY: 5, paddingX: 2 }}>
        <Grid container spacing={2}>
          {/* Aboute room */}
          <Grid size={7}>
            <Box>
              <Typography
                sx={{ lineHeight: 1.7 }}
                variant="body1"
                color="#B0B0B0"
              >
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
                <br />
                <br />
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
                <br />
                <br />
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
            </Box>
            <Grid container spacing={20} rowSpacing={4} paddingY={3}>
              <Grid size={3}>
                <img src={ic_bedroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_livingroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_bathroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_diningroom} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_wifi} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_ac} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_kulkas} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
              <Grid size={3}>
                <img src={ic_tv} alt="ic_bedroom" />
                <Typography color="#B0B0B0">
                  <span style={{ fontWeight: "bold", color: "#152C5B" }}>
                    5
                  </span>{" "}
                  bedroom
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Start booking */}
          <Grid size={5} sx={{ border: "1px solid #ddd", borderRadius: 3 }}>
            <Stack spacing={2}>
              <Typography variant="h4">Start Booking</Typography>
              <Typography variant="h4">
                <span style={{ color: "#1ABC9C" }}>$280</span> per night
              </Typography>
              <Typography variant="h4" color="red">
                Discount 20% Off
              </Typography>
            </Stack>
            <Stack></Stack>
          </Grid>
        </Grid>
      </Box>
      {/* Add Rate or comment */}
      <Box sx={{ paddingY: 5, paddingX: 2 }}>
        <Stack
          sx={{ border: "1px solid #ddd", borderRadius: 3, padding: 5 }}
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          divider={
            <Divider
              sx={{
                backgroundColor: "rgb(32, 63, 199, 0.5)",
                borderWidth: "2px",
              }}
              orientation="vertical"
              flexItem
            />
          }
        >
          <Stack
            spacing={2}
            sx={{
              width: { xs: "100%", md: "50%" },
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="body1">Rate</Typography>
            <Box sx={{ fontSize: "22px" }}>
              <FaStar color="#DFCB1D" />
              <FaStar color="#DFCB1D" />
              <FaStar color="#DFCB1D" />
              <FaStar color="#DFCB1D" />
              <FaStar color="#ddd" />
            <Typography variant="body1">Message</Typography>
            </Box>
            <TextField id="message" multiline rows={4} />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3252DF", width: "25%" }}
            >
              Rate
            </Button>
          </Stack>
          <Stack
            sx={{
              width: { xs: "100%", md: "50%" },
              justifyContent: 'space-between',
              alignContent: 'space-between'
            }}
          >
            <Typography variant="body1">Add Your Comment</Typography>
            <TextField id="message" multiline rows={4} sx={{borderColor: "3252DF"}} />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#3252DF", width: "25%", alignSelf: "end" }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default RoomDetail;
