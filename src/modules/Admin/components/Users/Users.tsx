import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MoreHoriz } from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  Typography,
  TablePagination,
  Stack,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { get_user } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { tableCellClasses } from "@mui/material/TableCell";
import NoData from "../../../Shared/components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authcontext";
import LoadingScreenTable from "../../../Shared/components/LoadingScreenTables/LoadingScreenTables";

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
  let navigate = useNavigate();
  let { loginData }: any = useContext(AuthContext);
  if (loginData?.role != "admin") {
    navigate("/NotFound");
  }
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersData[]>([]);
  const [openView, setOpenView] = useState(false); // View modal
  const [selectedUser, setSelectedUser] = useState<UsersData | null>(null); // Store the selected user's data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0); // Total users count

  const handleCloseView = () => setOpenView(false);
  const handleOpenView = (user: UsersData) => {
    setSelectedUser(user); // Set the selected user data
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
        `${get_user.getAllUsers}?page=${page + 1}&size=${rowsPerPage}`,
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

  useEffect(() => {

    
    setLoading(true);
    getUsers();
    setTimeout(() => {
      setLoading(false);
    }, 1200);


  
  }, [page, rowsPerPage]);

  // Style rows (color alternation)
  const StyledTableRow = styled(TableRow)`
    &:nth-of-type(even) {
      background-color: #f8f9fb;
    }
    font-family: "Poppins" !important;
  `;

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
        sx={{ fontFamily: "Poppins" }}
      >


        <Box sx={style}>
          <Typography
            id="view-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            User Details
          </Typography>
          {selectedUser && (
            <>
              <Typography variant="subtitle1">
                <strong>Username:</strong> {selectedUser.userName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Phone Number:</strong> {selectedUser.phoneNumber}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Country:</strong> {selectedUser.country}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Role:</strong> {selectedUser.role}
              </Typography>

              <Box mt={4} display="flex" justifyContent="center">
                <Button variant="contained" onClick={handleCloseView}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
        
      
      {loginData?.role === "admin" ?<Box>
        
      {!isLoading ? (<Box>

        <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height:{xs:"30px",sm:"100px"},
        }}
      >
        <Stack sx={{ color: "#1F263E" , }} >
          <Typography variant="h6" sx={{ fontFamily: "Poppins" ,fontSize:{xs:"16px",md:"20px"} }}>
           Users Table Details
          </Typography>
          <Typography
            sx={{fontSize:{xs:"12px",md:"14px"},  lineHeight: "2px" }}
          >
            You can check all details
          </Typography>
        </Stack>

       
      </Box>

      {/* Users Table */}
      <Box sx={{ pb: 3, overflowX:{xs:"visible",md:"hidden"}}}>
        {users.length > 0 ? (
          <Box>
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
                {/* <TableCell sx={{ fontWeight: 500 }}>Image</TableCell> */}
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
                  {/* <TableCell>
                    {userData.profileImage?.[0]?.name || "No Image"}
                  </TableCell> */}
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
                      IconComponent={MoreHoriz}
                    >
                      <MenuItem
                        sx={{ color: "#1F263E", fontFamily: "Poppins" }}
                        onClick={() => handleOpenView(userData)}
                      >
                        View
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
                    
                    </Box>) : (
          <NoData />
        )}
      </Box>
</Box>) : (
        <LoadingScreenTable/>
      )}

</Box> : navigate("/NotFound")}
      


    </>
  );
}
