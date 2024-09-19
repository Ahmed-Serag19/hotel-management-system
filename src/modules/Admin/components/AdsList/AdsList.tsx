import {
  Box,
  Divider,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Ads_URls, roomsUrl } from "../../../../constants/End_Points";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { FaRegEdit } from "react-icons/fa";

interface AdsTypes {
  room: {
    capacity: number;
    roomNumber: number;
    discount: number;
    price: number;
  };
  isActive: boolean;
  _id: string;
}
interface RoomsTypes {
  roomNumber: number;
  _id: string;
}

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#F8F9FB",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AdsList() {
  const [ads, setAds] = useState<AdsTypes[]>([]);
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);
  const {
    register,
    unregister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setidUpdate] = useState("");

  const handleOpenAdd = () => {
    setOpen(true);
    setIsUpdate(false);
  };

  const handleOpenUpdate = (id: string) => {
    setIsUpdate(true);
    setidUpdate(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const gitAdsList = async () => {
    try {
      const res = await axios.get(Ads_URls.gitAds, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setAds(res.data.data.ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const gitRoomsList = async () => {
    try {
      const res = await axios.get(roomsUrl.getAllRooms, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      setRooms(res.data.data.rooms);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

  const deleteAds = async (id: string) => {
    try {
      const response = await axios.delete(Ads_URls.deleteAds(id), {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      toast.success(response.data.message || "deleted successfully");
      gitAdsList();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
    }
  };

  useEffect(() => {
    gitAdsList();
    gitRoomsList();
  }, []);

  const onSubmit = async (data: object) => {
    // TO DO
    try {
      const response = await axios({
        method: isUpdate ? "PUT" : "POST",
        url: isUpdate ? Ads_URls.updateAds(idUpdate) : Ads_URls.addAds,
        data,
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success(response.data.message);
      gitAdsList();
      reset();
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.success(
          error?.response?.data.message ||
            "you have already ads with the same room"
        );
      }
    }
  };

  useEffect(() => {
    if (isUpdate) {
      unregister("room");
    }
  }, [isUpdate, unregister]);

  return (
    <Box component="section">
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1.5,
          mb: 5,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            ADS Table Details
          </Typography>
          <Typography variant="h5">You can check all details</Typography>
        </Box>
        <Box>
          <Button
            onClick={handleOpenAdd}
            sx={{
              px: 5,
              backgroundColor: "#203FC7",
              textTransform: "none",
              fontSize: { xs: "12px", md: "16px" },
            }}
            variant="contained"
            size="large"
          >
            Add New Ads
          </Button>
        </Box>
      </Stack>
      <Stack sx={{ padding: 1.5 }}>
        {ads.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#E2E5EB" }}>
                <TableRow>
                  <TableCell sx={{ padding: 3 }}>Room Number</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Discount</TableCell>
                  <TableCell align="center">Capacity</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ads.map((ad) => (
                  <StyledTableRow
                    key={ad.room.roomNumber}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Room {ad.room.roomNumber}
                    </TableCell>
                    <TableCell align="center">{ad.room.price}</TableCell>
                    <TableCell align="center">{ad.room.discount}</TableCell>
                    <TableCell align="center">{ad.room.capacity}</TableCell>
                    <TableCell align="center">
                      {ad.isActive ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
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
                        <MenuItem onClick={() => handleOpenUpdate(ad._id)}>
                          <FaRegEdit
                            style={{ color: "#203FC7", marginRight: "10px" }}
                          />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => deleteAds(ad._id)}>
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
          </TableContainer>
        ) : (
          <NoData />
        )}
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={style}>
          <Typography variant="h4" fontWeight={"bold"}>
            Ads
          </Typography>
          {/* text field for room number */}
          {!isUpdate && (
            <TextField
              id="outlined-select"
              select
              fullWidth
              label="Room Number"
              margin="normal"
              variant="filled"
              {...register("room", {
                required: !isUpdate ? "Room Number is Required" : false,
              })}
            >
              {rooms.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.roomNumber}
                </MenuItem>
              ))}
            </TextField>
          )}

          {errors.room && typeof errors.room.message === "string" && (
            <FormHelperText sx={{ color: "#d32f2f" }} id="component-error-text">
              {errors.room.message}
            </FormHelperText>
          )}
          {/* text field for Discount */}
          <TextField
            fullWidth
            id="filled-basic"
            label="Discount"
            variant="filled"
            margin="normal"
            {...register("discount", {
              required: "Discount is Required",
            })}
          />
          {errors.discount && typeof errors.discount.message === "string" && (
            <FormHelperText sx={{ color: "#d32f2f" }} id="component-error-text">
              {errors.discount.message}
            </FormHelperText>
          )}
          {/* text field for isActive */}
          <TextField
            id="outlined-select-active"
            select
            fullWidth
            label="Active"
            margin="normal"
            variant="filled"
            {...register("isActive", {
              required: "isActive is Required",
            })}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </TextField>
          {errors.isActive && typeof errors.isActive.message === "string" && (
            <FormHelperText sx={{ color: "#d32f2f" }} id="component-error-text">
              {errors.isActive.message}
            </FormHelperText>
          )}
          <Divider sx={{ marginY: 2 }} />
          <Button type="submit" size="large" variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default AdsList;
