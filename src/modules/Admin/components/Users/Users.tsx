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
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { get_user } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { tableCellClasses } from "@mui/material/TableCell";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteImg from "../../../../assets/images/delete.png";

interface UsersData {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: FileList;
}

export default function UsersTable() {
  const [users, setUsers] = useState<UsersData[]>([]);
  const [openView, setOpenView] = useState(false); // View modal
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // Total users count

  const handleCloseView = () => setOpenView(false);
  const handleOpenView = (id: string) => {
    setSelectedUserId(id);
    setOpenView(true);
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

  // Get all users
  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${get_user.getAllUsers}?page=${page}&limit=${rowsPerPage}`,
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
        }
      );

      setUsers(response.data.data.users);
      setTotalCount(response.data.data.totalCount);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };

  // Get user by ID
  const getUserById = async () => {
    try {
      const response = await axios.get(
        get_user.getUserProfile(selectedUserId),
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );

      const user = response.data.data;
      console.log("Fetched user:", user);

      toast.success("User data fetched successfully");
      handleCloseView();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
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
    getUsers();
  }, [page, rowsPerPage]);

  // Pagination handlers
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <>
      {/* View Modal */}
      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="view-modal-title"
        aria-describedby="view-modal-description"
        sx={{ fontFamily: "Poppins", padding: "60px" }}
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "end", mb: "60px" }}>
            <i
              onClick={handleCloseView}
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
            View User?
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
            Are you sure you want to view this user profile? If so, click on
            "View".
          </Typography>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "end" }}>
            <Button
              onClick={getUserById}
              sx={{
                backgroundColor: "#203FC7",
                fontSize: "17px",
                fontWeight: 500,
              }}
              variant="contained"
            >
              View
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Users Table */}
      <Box sx={{ pb: 3, overflowX: "auto" }}>
        {users.length > 0 ? (
          <Table
            sx={{
              minWidth: 350,
              [`& .${tableCellClasses.root}`]: { borderBottom: "none" },
              mt: "50px",
              tableLayout: "auto",
            }}
            aria-label="users table"
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
                  Username
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Country</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>Image</TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((userData) => (
                <StyledTableRow key={userData._id}>
                  <TableCell sx={{ color: "#3A3A3D" }}>
                    {userData.userName}
                  </TableCell>
                  <TableCell>{userData.email}</TableCell>
                  <TableCell>{userData.phoneNumber}</TableCell>
                  <TableCell>{userData.country}</TableCell>
                  <TableCell>{userData.role}</TableCell>
                  <TableCell>
                    {userData.profileImage?.[0]?.name || "No Image"}
                  </TableCell>
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
                        onClick={() => handleOpenView(userData._id)}
                      >
                        <RiDeleteBin6Line
                          style={{ color: "#203FC7", marginRight: "10px" }}
                        />
                        View
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

      {/* Table Pagination */}
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
