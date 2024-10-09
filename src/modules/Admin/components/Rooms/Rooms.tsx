import {
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  MenuItem,
  Modal,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import DeleteImg from "../../../../assets/images/delete.png";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NoData from "../../../Shared/components/NoData/NoData";
import { RiDeleteBin6Line } from "react-icons/ri";
import TitleTables from "../../../Shared/components/TitleTables/TitleTables";
import axios from "axios";
import { roomsUrl } from "../../../../constants/End_Points";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FirstCell, LastCell } from "../Facilities/FacilitiesData";
import { AuthContext } from "../../../../context/authcontext";
import LoadingScreen from "../../../Shared/components/LoadingScreen/LoadingScreen";
import LoadingScreenTable from "../../../Shared/components/LoadingScreenTables/LoadingScreenTables";

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f8f9fb;
  }
  font-family: "Poppins" !important;
`;

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

type Room = {
  _id: string;
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  images: string[];
  facilities: { _id: string; name: string }[];
};

const RoomDetailsModal = ({
  room,
  open,
  handleClose,
}: {
  room: Room | null;
  open: boolean;
  handleClose: () => void;
}) => {
  if (!room) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="room-details-title"
      aria-describedby="room-details-description"
    >
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography id="room-details-title" variant="h6" component="h2">
            Room Details - {room.roomNumber}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="subtitle1">
          <strong>Room Number:</strong> {room.roomNumber}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Price:</strong> ${room.price}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Discount:</strong> ${room.discount}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Capacity:</strong> {room.capacity} persons
        </Typography>

        <Typography variant="subtitle1" mt={2}>
          <strong>Facilities:</strong>
        </Typography>
        <Box pl={2}>
          {room.facilities.length > 0 ? (
            room.facilities.map((facility) => (
              <Typography key={facility._id}>- {facility.name}</Typography>
            ))
          ) : (
            <Typography>No facilities</Typography>
          )}
        </Box>

        <Typography variant="subtitle1" mt={2}>
          <strong>Images:</strong>
        </Typography>
        {room.images.length > 0 ? (
          <ImageList cols={3} rowHeight={160}>
            {room.images.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image}
                  alt={`Room ${index}`}
                  style={{ objectFit: "cover" }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography>No images available</Typography>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default function Rooms() {
  const navigate = useNavigate();
  let { loginData }: any = useContext(AuthContext);
  if (loginData?.role != "admin") {
    navigate("/NotFound");
  }
  const [isLoading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); // For viewing room details
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewOpen, setViewOpen] = useState(false); // State to control view modal



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
    setLoading(true);
    getRooms();
    setTimeout(() => {
      setLoading(false);
    }, 1500);

  }, [page, rowsPerPage]);

  const handleOpenDelete = (roomId: string) => {
    setSelectedRoomId(roomId);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedRoomId(null);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteRoom = async () => {
    if (!selectedRoomId) return;

    try {
      setIsSubmitting(true);
      await axios.delete(roomsUrl.deleteRoom(selectedRoomId), {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Room Deleted Successfully");

      setIsSubmitting(false);
      setOpenDelete(false);
      setSelectedRoomId(null);
      getRooms();
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed Delete");
      setIsSubmitting(false);
    }
  };

  const handleAddRoomRoute = () => {
    navigate("/dashboard/add-room");
  };

  const handleViewClick = (room: Room) => {
    setSelectedRoom(room); // Set the room to be viewed
    setViewOpen(true); // Open the view modal
  };

  const handleEditClick = (room: Room) => {
    navigate("/dashboard/add-room", { state: { room } });
  };

  const handleCloseView = () => {
    setViewOpen(false); // Close the view modal
  };

  return (
    <>
     {loginData?.role === "admin" ?<Box>
      {!isLoading ? <Box>


        <TitleTables titleTable="Rooms" btn="Room" onClick={handleAddRoomRoute} />

<Box sx={{ mx: 3, mb: 4 ,overflowX:{xs:"visible",md:"hidden"}}}>
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
            <TableCell sx={FirstCell || { fontWeight: "bold", fontFamily: "Poppins" }}>
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
            <TableCell sx={LastCell || { fontWeight: "bold", fontFamily: "Poppins" }}>
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
                    onClick={() => handleViewClick(room)}
                  >
                    <FaRegEye
                      style={{ color: "#203FC7", marginRight: "10px" }}
                    />{" "}
                    View
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                    value="edit"
                    onClick={() => handleEditClick(room)}
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
      </Box> : (
        <LoadingScreenTable />
      )}

 

     </Box>: navigate("/NotFound")}

      {/* View Room Modal */}
      <RoomDetailsModal
        room={selectedRoom}
        open={viewOpen}
        handleClose={handleCloseView}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ fontFamily: "Poppins", padding: "60px" }}
      >
        <Box sx={modalStyle}>
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
