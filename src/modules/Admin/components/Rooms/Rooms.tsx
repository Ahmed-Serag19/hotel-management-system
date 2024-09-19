import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Modal,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import axios from "axios";
import { roomsUrl } from "../../../../constants/End_Points";
import TitleTables from "../../../Shared/TitleTables/TitleTables";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteImg from "../../../../assets/images/delete.png"; // Ensure this path is correct
import { toast } from "react-toastify";

// Custom styled table rows
const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f8f9fb;
  }
  font-family: "Poppins" !important;
`;

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

// Define the Room type
type Room = {
  _id: string;
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  images: string[];
  facilities: { _id: string; name: string }[];
};

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRooms = async () => {
    try {
      const response = await axios.get(
        `${roomsUrl.getAllRooms}&page=${page + 1}&size=${rowsPerPage}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setRooms(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [page, rowsPerPage]);

  // Open delete modal and set the selected room ID
  const handleOpenDelete = (roomId: string) => {
    setSelectedRoomId(roomId);
    setOpenDelete(true); // Open delete modal
  };

  // Close delete modal and reset selected room ID
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRoomId(null); // Reset selected room ID after closing the modal
  };

  // Handle pagination page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  // Handle delete room using roomId
  const deleteRoom = async () => {
    if (!selectedRoomId) return;

    try {
      setIsSubmitting(true);
      await axios.delete(roomsUrl.deleteRoom(selectedRoomId), {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Room Deleted Successfully");

      // Reset states and refresh room list
      setIsSubmitting(false);
      setOpenDelete(false);
      setSelectedRoomId(null); // Reset roomId after deletion
      getRooms(); // Refresh the room list after deletion
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed Delete");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TitleTables titleTable="Rooms" btn="Room" />

      <Box sx={{ mx: 3, mb: 4 }}>
        {rooms.length > 0 ? (
          <>
            <Table
              sx={{
                minWidth: 350,
                [`& .MuiTableCell-root`]: {
                  borderBottom: "none",
                },
                mt: "50px",
              }}
              aria-label="rooms table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#E2E5EB",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Image
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Discount
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Capacity
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Facilities
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontFamily: "Poppins" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room: Room) => (
                  <StyledTableRow key={room._id}>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>
                      {room.images.length > 0 ? (
                        <img
                          src={room.images[0]}
                          alt="Room"
                          style={{ width: "50px", height: "50px" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </TableCell>
                    <TableCell>{room.price}</TableCell>
                    <TableCell>{room.discount}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      <Box p={1}>
                        {room.facilities.length > 0 ? (
                          room.facilities.map((facility: any) => (
                            <li key={facility._id}>{facility.name}</li>
                          ))
                        ) : (
                          <p>No facilities</p>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {/* ----select dropdown with actions----- */}
                      <Select
                        sx={{
                          color: "#1F263E",
                          fontFamily: "Poppins",
                          fontSize: "14px",
                          boxShadow: "none",
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              border: 0,
                            },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              border: 0,
                            },
                        }}
                        value=""
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        IconComponent={MoreHorizIcon}
                      >
                        <MenuItem
                          sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                          value="view"
                        >
                          <FaRegEye
                            style={{ color: "#203FC7", marginRight: "10px" }}
                          />{" "}
                          View
                        </MenuItem>
                        <MenuItem
                          sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                          value="edit"
                        >
                          <FaRegEdit
                            style={{ color: "#203FC7", marginRight: "10px" }}
                          />{" "}
                          Edit
                        </MenuItem>
                        <MenuItem
                          sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                          onClick={() => handleOpenDelete(room._id)}
                          value="delete"
                        >
                          <RiDeleteBin6Line
                            style={{ color: "#203FC7", marginRight: "10px" }}
                          />{" "}
                          Delete
                        </MenuItem>
                      </Select>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <NoData />
        )}
      </Box>

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ fontFamily: "Poppins", padding: "60px" }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mb: "60px",
            }}
          >
            <i
              onClick={handleCloseDelete}
              style={{
                color: "#CC0000",
                textAlign: "right",
                cursor: "pointer",
              }}
              className="fa-regular fa-xl fa-circle-xmark"
            ></i>
          </Box>
          <Box sx={{ textAlign: "center", mt: 5, mb: 2 }}>
            <img src={DeleteImg} alt="" />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "#494949",
              fontWeight: 700,
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Delete This Room?
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
            Are you sure you want to delete this room? If you are sure, just
            click on delete it.
          </Typography>

          <Stack
            sx={{
              mt: 5,
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
            spacing={2}
            direction="row"
          >
            <Button
              onClick={deleteRoom}
              disabled={isSubmitting}
              type="submit"
              sx={{
                backgroundColor: "#203FC7",
                textTransform: "none",
                fontSize: "17px",
                fontWeight: 500,
                mt: 3,
              }}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
