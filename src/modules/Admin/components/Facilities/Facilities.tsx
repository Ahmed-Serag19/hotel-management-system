import TitleTables from "../../../Shared/TitleTables/TitleTables";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { facility_Urls } from "../../../../constants/End_Points";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { tableCellClasses } from "@mui/material/TableCell"; // for border rows
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteImg from "../../../../assets/images/delete.png";
export default function Facilities() {
  const [facility, setFacility] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDelete = () => setOpenDelete(false); //delete modal
  const [openDelete, setOpenDelete] = useState(false); //delete modal
  const [facId, setFacId] = useState<string>(""); //delete modal
  const handleOpenDelete = (id: string) => {
    //delete modal
    setFacId(id);
    setOpenDelete(true);
  };

  //for modAl
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
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  //get all facility
  let getFacility = async () => {
    try {
      let response = await axios.get(facility_Urls.getAllFacility, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setFacility(response.data.data.facilities);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed ");
    }
  };

  //add  facility
  let addFacility = async (data: object) => {
    try {
      let response = await axios.post(facility_Urls.createFacility, data, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success(response.data.message || "Add Successfully");
      getFacility();
      reset();
      handleClose();
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed Add");
    }
  };
  //

  //delete  facility
  let deleteFacility = async () => {
    try {
      let response = await axios.delete(facility_Urls.delete(facId), {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success(response.data.message || "Delete Successfully");
      getFacility();
      handleCloseDelete();
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed Delete");
    }
  };

  /*for color rows  */
  const StyledTableRow = styled(TableRow)`
    &:nth-of-type(even) {
      background-color: #f8f9fb;
    }

    font-family: "Poppins" !important;
  `;

  //spilt numbers createdAt
  const Numbers = (dateString: string): string => {
    const afterDecimal = dateString.split(".")[1]?.split("Z")[0];
    return afterDecimal || "";
  };

  useEffect(() => {
    getFacility();
  }, []);
  return (
    <>
      <TitleTables
        titleTable="Facilities"
        btn="Facility"
        onClick={handleOpen}
      />

      {/* modAl add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ fontFamily: "Poppins" }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: "25px", fontWeight: "700", color: "#494949" }}
              variant="h6"
              component="h2"
            >
              Add Facility
            </Typography>

            <i
              onClick={handleClose}
              style={{
                color: "#CC0000",
                textAlign: "right",
                cursor: "pointer",
              }}
              className="fa-regular fa-xl fa-circle-xmark"
            ></i>
          </Box>
          <form onSubmit={handleSubmit(addFacility)}>
            <TextField
              id="name"
              label="Name"
              type="text"
              autoComplete="name"
              sx={{ bgcolor: "#F7F7F7", width: "100%", mt: "70px", mb: 1 }}
              error={!!errors.name}
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {typeof errors.name?.message === "string"
                  ? errors.name?.message
                  : ""}
              </FormHelperText>
            )}

            <Stack
              sx={{
                mt: 5,
                width: "100%",
                display: "flex",
                justifyContent: "end",
                borderTop: "3px",
              }}
              spacing={2}
              direction="row"
            >
              <Button
                onClick={addFacility}
                disabled={isSubmitting}
                //  disabled={isSubmitting}
                type="submit"
                sx={{
                  backgroundColor: "#203FC7",
                  textTransform: "none",
                  fontSize: "17px",
                  fontWeight: 500,
                }}
                variant="contained"
              >
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>

      {/* modAl delete */}
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
            Delete This Facility ?
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
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </Typography>

          <Stack
            sx={{
              mt: 5,
              width: "100%",
              display: "flex",
              justifyContent: "end",
              borderTop: "3px",
            }}
            spacing={2}
            direction="row"
          >
            <Button
              onClick={deleteFacility}
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

      {/* table */}

      <Box sx={{ mx: 3, mb: 4 }}>
        {facility.length > 0 ? (
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
                  Created at
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{ border: "none", borderTop: "none", borderCollapse: "none" }}
            >
              {facility.map((facilityData: any) => (
                <StyledTableRow
                  key={facilityData._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    fontFamily: "Poppins",
                  }}
                >
                  <TableCell sx={{ color: "#3A3A3D", fontFamily: "Poppins" }}>
                    {facilityData.name}
                  </TableCell>
                  <TableCell>{Numbers(facilityData.createdAt)}</TableCell>
                  <TableCell>
                    {/* ----select----- */}
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
                        value={10}
                      >
                        <FaRegEye
                          style={{ color: "#203FC7", marginRight: "10px" }}
                        />{" "}
                        View
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                        value={20}
                      >
                        <FaRegEdit
                          style={{ color: "#203FC7", marginRight: "10px" }}
                        />{" "}
                        Edit
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                        onClick={() => handleOpenDelete(facilityData._id)}
                        value={30}
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
        ) : (
          <NoData />
        )}
      </Box>
    </>
  );
}
