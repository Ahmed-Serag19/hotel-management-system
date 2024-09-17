import {
  Box,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { Ads_URls } from "../../../../constants/End_Points";
import { useEffect, useState } from "react";

interface AdsTypes {
  room: {
    capacity: number;
    roomNumber: number;
    discount: number;
    price: number;
  };
  isActive: boolean;
}

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F8F9FB",
  },
}));

function AdsList() {
  const [ads, setAds] = useState<AdsTypes[]>([]);

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

  useEffect(() => {
    gitAdsList();
  }, []);

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
            sx={{ backgroundColor: "primary.main" }}
            variant="contained"
            size="large"
          >
            Add New Ads
          </Button>
        </Box>
      </Stack>
      <Stack sx={{ padding: 1.5 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#E2E5EB" }}>
              <TableRow>
                <TableCell>Room Number</TableCell>
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
                    {ad.isActive ? "Yes": "No" }
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ marginRight: 1 }}
                    >
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default AdsList;
