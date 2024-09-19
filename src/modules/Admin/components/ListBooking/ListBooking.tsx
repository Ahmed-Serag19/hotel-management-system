import TitleTables from "../../../Shared/TitleTables/TitleTables";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { bookingUrl } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { tableCellClasses } from "@mui/material/TableCell"; // for border rows
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteImg from "../../../../assets/images/delete.png";

// Type for bookingData
interface BookingData {
  _id: string;
  userName: string;
  price: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  user: string;
}

export default function Facilities() {
  const [booking, setBooking] = useState<BookingData[]>([]);
  const [openDelete, setOpenDelete] = useState(false); //delete modal
  const [bookingId, setBookingId] = useState<string>("");

  const handleCloseDelete = () => setOpenDelete(false);
  const handleOpenDelete = (id: string) => {
    setBookingId(id);
    setOpenDelete(true);
  };

  // Modal styling
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  // Get all bookings
  const getBooking = async () => {
    try {
      const response = await axios.get(bookingUrl.getAllBooking, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setBooking(response.data.data.booking);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch bookings");
    }
  };

  // Delete booking
  const deleteBooking = async () => {
    try {
      const response = await axios.delete(bookingUrl.delete(bookingId), {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      toast.success(response.data.message || "Deleted Successfully");
      getBooking();
      handleCloseDelete();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete booking");
    }
  };

  // Style rows (color alternation)
  const StyledTableRow = styled(TableRow)`
    &:nth-of-type(even) {
      background-color: #f8f9fb;
    }
    font-family: "Poppins" !important;
  `;

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <>
      <TitleTables titleTable="Bookings" btn="Add Booking" />

      {/* Delete Modal */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        sx={{ fontFamily: "Poppins", padding: "60px" }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "end", mb: "60px" }}>
            <i
              onClick={handleCloseDelete}
              style={{ color: "#CC0000", cursor: "pointer" }}
              className="fa-regular fa-xl fa-circle-xmark"
            ></i>
          </Box>

          <Box sx={{ textAlign: "center", mt: 5, mb: 2 }}>
            <img src={DeleteImg} alt="Delete" />
          </Box>

          <Typography
            variant="h6"
            sx={{ color: "#494949", fontWeight: 700, textAlign: "center" }}
          >
            Delete This Booking?
          </Typography>
          <Typography
            sx={{
              color: "#494949",
              fontSize: "14.5px",
              textAlign: "center",
              opacity: "60%",
              mt: 2,
              mb: 5,
            }}
          >
            Are you sure you want to delete this booking? If so, click on
            "Delete".
          </Typography>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
            <Button
              onClick={deleteBooking}
              sx={{
                backgroundColor: "#203FC7",
                fontSize: "17px",
                fontWeight: 500,
              }}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Booking Table */}
      <Box sx={{ pb: 3, overflowX: "auto" }}>
        {" "}
        {/* Removed overflow and set it to auto */}
        {booking.length > 0 ? (
          <Table
            sx={{
              minWidth: 350,
              [`& .${tableCellClasses.root}`]: { borderBottom: "none" },
              mt: "50px",
              tableLayout: "auto", // Ensures the table takes up the available space
            }}
            aria-label="booking table"
          >
            <TableHead>
              <TableRow
                sx={{ bgcolor: "#E2E5EB", color: "#1F263E", fontWeight: 500 }}
              >
                <TableCell
                  sx={{
                    p: 3,
                    borderTopLeftRadius: "1rem",
                    borderBottomLeftRadius: "1rem",
                    fontWeight: 500,
                  }}
                >
                  Room Status
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>End Date</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Created At</TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  User
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booking.map((bookingData) => (
                <StyledTableRow key={bookingData._id}>
                  <TableCell sx={{ color: "#3A3A3D" }}>
                    {bookingData.status}
                  </TableCell>
                  <TableCell>{bookingData.totalPrice}</TableCell>
                  <TableCell>
                    {new Date(bookingData.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(bookingData.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(bookingData.createdAt).toLocaleDateString()}
                  </TableCell>
                  {/* Access a specific property of the user object */}
                  <TableCell>{bookingData.user?.userName}</TableCell>
                  <TableCell>
                    <Select
                      sx={{
                        color: "#1F263E",
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                      value=""
                      displayEmpty
                      IconComponent={MoreHorizIcon}
                    >
                      <MenuItem
                        sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                        onClick={() => handleOpenDelete(bookingData._id)}
                      >
                        <RiDeleteBin6Line
                          style={{ color: "#203FC7", marginRight: "10px" }}
                        />
                        Delete
                      </MenuItem>
                    </Select>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoData />
        )}
      </Box>
    </>
  );
}
