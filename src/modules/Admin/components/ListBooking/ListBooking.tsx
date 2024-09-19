import React from "react";
import {
  Box,
  Typography,
  Grid2,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TitleTables from "../../../Shared/TitleTables/TitleTables";

export default function ListBooking() {
  const [booking, setBooking] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  // get all booking list
  const getBookingList = (data: any) => {
    console.log(data);
  };
  /*for color rows  */
  const StyledTableRow = styled(TableRow)`
    &:nth-of-type(even) {
      background-color: #f8f9fb;
    }

    font-family: "Poppins" !important;
  `;

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Booking Table Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        You can check all details
      </Typography>

      <TitleTables
        titleTable="Facilities"
        btn="Facility"
        onClick={handleOpen}
      />

      <Box sx={{ mx: 3, mb: 4 }}>
        {booking.length > 0 ? (
          <Table
            sx={{
              minWidth: 350,
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
              mt: "50px",
            }}
            aria-label="simple table"
          >
            <TableHead sx={{ hight: "50px" }}>
              <TableRow
                sx={{
                  bgcolor: "#E2E5EB",
                  m: 0,
                  "&:last-child td, &:last-child th": { border: 0 },
                  color: "#1F263E",
                  fontWeight: 500,
                  fontFamily: "Poppins",
                }}
              >
                <TableCell
                  sx={{
                    p: 3,
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                    color: "#1F263E",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#1F263E",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                >
                  CreatedAt
                </TableCell>

                <TableCell
                  sx={{
                    color: "#1F263E",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  :
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{ border: "none", borderTop: "none", borderCollapse: "none" }}
            >
              {booking.map((facilityData: any) => (
                <StyledTableRow
                  key={facilityData.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    fontFamily: "Poppins",
                  }}
                >
                  <TableCell sx={{ color: "#3A3A3D", fontFamily: "Poppins" }}>
                    {facilityData.name}
                  </TableCell>
                  <TableCell>{Numbers(facilityData.createdAt)}</TableCell>
                  <TableCell>:</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoData />
        )}
      </Box>
    </Box>
  );
}
