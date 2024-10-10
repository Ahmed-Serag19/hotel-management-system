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
import {
  FirstCell,
  LastCell,
  Numbers,
  StyledTableRow,
  TableBorderRow,
  selectStyle,
  style,
} from "../Facilities/FacilitiesData";
import { useContext, useEffect, useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import ModalPop from "../../../Shared/components/ModalPop/ModalPop";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RiDeleteBin6Line } from "react-icons/ri";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TitleTables from "../../../Shared/components/TitleTables/TitleTables";
import axios from "axios";
import { facility_Urls } from "../../../../constants/End_Points";
import { tableCellClasses } from "@mui/material/TableCell"; // for table border
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authcontext";
import LoadingScreenTable from "../../../Shared/components/LoadingScreenTables/LoadingScreenTables";

export default function Facilities() {
  let navigate = useNavigate();
  let { loginData }: any = useContext(AuthContext);
  if (loginData?.role != "admin") {
    navigate("/NotFound");
  }
  const [facility, setFacility] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); //add& update
  const [isUpdate, setIsUpdate] = useState(false); //add& update
  const handleCloseDelete = () => setOpenDelete(false); //delete modal
  const [openDelete, setOpenDelete] = useState(false); //delete modal
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [facId, setFacId] = useState<string>("");
  const [totalCount, setTotalCount] = useState(0);
  //delete modal
  const handleOpenDelete = (id: string) => {
    setFacId(id);
    setOpenDelete(true);
  };
  //add& update
  const openAddModal = () => {
    setIsUpdate(false);
    setModalOpen(true);
    setFacId("");
    reset();
  };

  const openUpdateModal = (facilityData: any) => {
    setValue("name", facilityData.name);
    setFacId(facilityData._id);
    setIsUpdate(true);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: "onChange" });

  //get all facility
  let getFacility = async () => {
    try {
      let response = await axios.get(
        `${facility_Urls.getAllFacility}?page=${page + 1}&size=${rowsPerPage}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setFacility(response.data.data.facilities);
      setTotalCount(response.data.data.totalCount);
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed ");
    }
  };

  //add  and update facility

  const saveOrUpdateFacility = async (data: object) => {
    try {
      const url = isUpdate
        ? facility_Urls.update(facId)
        : facility_Urls.createFacility;
      const method = isUpdate ? "put" : "post";

      const response = await axios({
        method,
        url,
        data,
        headers: { Authorization: localStorage.getItem("token") },
      });

      toast.success(response?.data?.message);
      getFacility();
      reset();
      closeModal();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

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

  //Pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getFacility();
    // setLoading(true);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 1000);
  }, [page, rowsPerPage]);

  return (
    <>
      {loginData?.role == "admin" ? (
        <Box>
          {/* {!isLoading ? (<Box> */}
          <TitleTables
            titleTable="Facilities"
            btn="Facility"
            onClick={openAddModal}
          />

          {/* modAl add && update*/}

          <Modal
            open={modalOpen}
            onClose={closeModal}
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
                  {isUpdate ? "Update Facility" : "Add Facility"}
                </Typography>
                <i
                  onClick={closeModal}
                  style={{
                    color: "#CC0000",
                    textAlign: "right",
                    cursor: "pointer",
                  }}
                  className="fa-regular fa-xl fa-circle-xmark"
                ></i>
              </Box>
              <form
                onSubmit={handleSubmit((data) => saveOrUpdateFacility(data))}
              >
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
                    onClick={saveOrUpdateFacility}
                    disabled={isSubmitting}
                    type="submit"
                    sx={{
                      backgroundColor: "#203FC7",
                      textTransform: "none",
                      fontSize: "17px",
                      fontWeight: 500,
                    }}
                    variant="contained"
                  >
                    {isUpdate ? "Update" : "Save"}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Modal>
          {/* model delete */}
          <ModalPop
            open={openDelete}
            handleClose={handleCloseDelete}
            FunctionBtn={deleteFacility}
          />

          <Box sx={{ pb: 1, overflowX: { xs: "visible", md: "hidden" } }}>
            {facility.length > 0 ? (
              <Box>
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
                    <TableRow sx={TableBorderRow}>
                      <TableCell sx={FirstCell}>Name</TableCell>
                      <TableCell
                        sx={{
                          color: "#1F263E",
                          fontWeight: 500,
                          fontFamily: "Poppins",
                        }}
                      >
                        Created at
                      </TableCell>

                      <TableCell sx={LastCell}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      border: "none",
                      borderTop: "none",
                      borderCollapse: "none",
                    }}
                  >
                    {facility.map((facilityData: any) => (
                      <StyledTableRow
                        key={facilityData._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          fontFamily: "Poppins",
                        }}
                      >
                        <TableCell
                          sx={{ color: "#3A3A3D", fontFamily: "Poppins" }}
                        >
                          {facilityData.name}
                        </TableCell>
                        <TableCell>{Numbers(facilityData.createdAt)}</TableCell>
                        <TableCell>
                          <Select
                            sx={selectStyle}
                            value=""
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            IconComponent={MoreHorizIcon}
                          >
                            <MenuItem
                              onClick={() => openUpdateModal(facilityData)}
                              sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                              value={20}
                            >
                              <FaRegEdit
                                style={{
                                  color: "#203FC7",
                                  marginRight: "10px",
                                }}
                              />{" "}
                              Edit
                            </MenuItem>
                            <MenuItem
                              sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                              onClick={() => handleOpenDelete(facilityData._id)}
                              value={30}
                            >
                              <RiDeleteBin6Line
                                style={{
                                  color: "#203FC7",
                                  marginRight: "10px",
                                }}
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
              </Box>
            ) : (
              <LoadingScreenTable />
            )}
          </Box>
        </Box>
      ) : (
        navigate("/NotFound")
      )}
    </>
  );
}
