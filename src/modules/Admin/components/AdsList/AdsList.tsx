import {
  Box,
  Divider,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
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
import DeleteImg from "../../../../assets/images/delete.png";
import TitleTables from "../../../Shared/components/TitleTables/TitleTables";
import { FirstCell, LastCell } from "../Facilities/FacilitiesData";

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

const modalStyle = {
  position: "absolute",
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
  const [OpenConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [adsId, setAdsId] = useState("");

  const handleOpenAdd = () => {
    setOpen(true);
    setIsUpdate(false);
  };

  const handleOpenUpdate = (id: string) => {
    setIsUpdate(true);
    setAdsId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenDelete = (id: string) => {
    setAdsId(id);
    setOpenConfirmDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenConfirmDelete(false);
  };

  const getAdsList = async () => {
    try {
      const res = await axios.get(Ads_URls.getAds, {
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

  const deleteAds = async () => {
    try {
      const response = await axios.delete(Ads_URls.deleteAds(adsId), {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      toast.success(response.data.message || "deleted successfully");
      getAdsList();
      handleCloseDelete();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getAdsList();
    gitRoomsList();
  }, []);

  const onSubmit = async (data: object) => {
    // TO DO
    try {
      const response = await axios({
        method: isUpdate ? "PUT" : "POST",
        url: isUpdate ? Ads_URls.updateAds(adsId) : Ads_URls.addAds,
        data,
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success(response.data.message);
      getAdsList();
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
      <TitleTables titleTable="Ads" btn="Ads" onClick={handleOpenAdd} />

      <Stack sx={{ padding: 1.5,overflowX:{xs:"visible",md:"hidden"} }} >
        {ads.length > 0 ? (
          <Table
            sx={{
              minWidth: 350,
              [`& .${tableCellClasses.root}`]: {
                borderBottom: "none",
              },
            }}
            aria-label="simple table"
          >
            <TableHead sx={{ backgroundColor: "#E2E5EB" }}>
              <TableRow>
                <TableCell sx={FirstCell}>Room Number</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Discount</TableCell>
                <TableCell align="center">Capacity</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell sx={LastCell} align="center">
                  Action
                </TableCell>
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
                      <MenuItem onClick={() => handleOpenDelete(ad._id)}>
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
      {/* Modal comfirm delete */}
      <Modal
        open={OpenConfirmDelete}
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
            Delete This AD?
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
            Are you sure you want to delete this Ads Room? If you are sure, just
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
              onClick={deleteAds}
              // disabled={isSubmitting}
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
    </Box>
  );
}

export default AdsList;
