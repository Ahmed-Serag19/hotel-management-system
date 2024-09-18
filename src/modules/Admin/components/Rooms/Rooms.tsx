import { useState, useEffect } from "react";
import TitleTables from "../../../Shared/TitleTables/TitleTables";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { roomsUrl } from "../../../../constants/End_Points";
import styled from "@emotion/styled";
import { tableCellClasses } from "@mui/material/TableCell";
import NoData from "../../../Shared/components/NoData/NoData";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const StyledTableRow = styled(TableRow)`
    &:nth-of-type(even) {
      background-color: #f8f9fb;
    }
    font-family: "Poppins" !important;
  `;

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

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TitleTables titleTable="Rooms Table Details" />
      <Box sx={{ mx: 3, mb: 4 }}>
        {rooms.length > 0 ? (
          <>
            <Table
              sx={{
                minWidth: 350,
                [`& .${tableCellClasses.root}`]: {
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
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Category</TableCell>
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
                    <TableCell>Double Room</TableCell>
                    <TableCell>tag1</TableCell>
                    <TableCell>
                      {room.capacity > 2 ? "Noodles" : "Chicken"}
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
