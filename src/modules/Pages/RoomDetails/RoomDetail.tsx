import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function RoomDetail() {
  return (
    <>
      {/* Breadcrumbs */}
      <Stack direction='row' sx={{ padding: 5, alignItems: "center" }}>
        <Box role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography sx={{ color: "#152C5B" }}>Room Details</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ marginX: "auto", textAlign: "center"}}>
            <Typography variant="h4" sx={{ color: "#152C5B", fontWeight: 600 }}>Village Angga</Typography>
            <Typography sx={{ color: "#B0B0B0" }}>Bogor, Indonesia</Typography>
        </Box>
      </Stack>
    </>
  );
}

export default RoomDetail;
