import {
  Box,
  Button,
  IconButton,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NoData from "../../../Shared/components/NoData/NoData";
import TitleTables from "../../../Shared/TitleTables/TitleTables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { roomsUrl } from "../../../../constants/End_Points";
import styled from "@emotion/styled";

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f8f9fb;
  }
  font-family: "Poppins" !important;
`;

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    room: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRoom(room);
  };

  // Handle closing the Popover menu
  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRoom(null);
  };

  // Fetch rooms data
  const getRooms = async () => {
    try {
      const response = await axios.get(
        `${roomsUrl.getAllRooms}&page=${page + 1}&size=${rowsPerPage}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setRooms(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      console.error("Failed to fetch rooms");
    }
  };

  useEffect(() => {
    getRooms();
  }, [page, rowsPerPage]);

  // Handle pagination page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      p: 3,
                      borderTopLeftRadius: "1rem",
                      borderBottomLeftRadius: "1rem",
                      color: "#1F263E",
                      fontFamily: "Poppins",
                      
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Discount
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Capacity
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                    }}
                  >
                    Facilities
                  </TableCell>
                  <TableCell   sx={{
                    color: "#1F263E",
                    fontWeight: 500,
                    fontFamily: "Poppins",
                    borderTopRightRadius: "1rem",
                    borderBottomRightRadius: "1rem",
                  }}></TableCell> {/* For the 3 dots dropdown */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rooms.map((room: any) => (
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
                      {/* IconButton for the dropdown */}
                      <IconButton
                        aria-describedby={id}
                        onClick={(event) => handleClick(event, room)}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      {/* Popover for dropdown */}
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <Box
                          p={2}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <Button
                            startIcon={<VisibilityIcon />}
                            onClick={handleClose}
                            sx={{ textTransform: "none" }}
                          >
                            <span style={{ color: "black" }}>View</span>
                          </Button>
                          <Button
                            startIcon={<EditIcon />}
                            onClick={handleClose}
                            sx={{ textTransform: "none" }}
                          >
                            <span style={{ color: "black" }}>Edit</span>
                          </Button>
                          <Button
                            startIcon={<DeleteIcon />}
                            onClick={handleClose}
                            sx={{ textTransform: "none" }}
                          >
                            <span style={{ color: "black" }}>Delete</span>
                          </Button>
                        </Box>
                      </Popover>
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
    </>
  );
}
