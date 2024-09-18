import {
  Box,
  Divider,
  MenuItem,
  Paper,
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
import { Ads_URls } from "../../../../constants/End_Points";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';

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

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F8F9FB",
  },
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AdsList() {
  const [ads, setAds] = useState<AdsTypes[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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

  const deleteAds = async (id:string) => {
    try {
       await axios.delete(Ads_URls.deleteAds(id), {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });
      // TO DO: add toast delete
      gitAdsList();
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
            onClick={handleOpen}
            sx={{ backgroundColor: "primary.main" }}
            variant="contained"
            size="large"
          >
            Add New Ads
          </Button>
        </Box>
      </Stack>
      <Stack sx={{ padding: 1.5 }}>
        {ads.length > 0 ? <TableContainer component={Paper}>
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
                    <Button onClick={()=>deleteAds(ad._id)} variant="outlined" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : <h1>No Data</h1> } {/* TO DO: add component NoData  */}
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box 
          component="form"
          sx={style}
        >
          <Typography variant="h4" fontWeight={"bold"}>Ads</Typography>
        {/* text field for room number */}
        <TextField
          id="outlined-select"
          select
          fullWidth
          label="Room Number"
          defaultValue="EUR"
          sx={{marginTop: 3}}
          variant="filled"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* text field for Discount */}
        <TextField
          fullWidth
          id="filled-basic"
          label="Discount"
          variant="filled"
          sx={{marginTop: 3}}
        />
        {/* text field for isActive */}
        <TextField
          id="outlined-select-active"
          select
          fullWidth
          label="Active"
          defaultValue={'true'}
          sx={{ marginTop: 3 }}
          variant="filled"
          onChange={(e) => {
            const value = e.target.value === 'true' ? true : false;
            console.log(value);
          }}
        >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
        </TextField>
        <Divider sx={{marginY: 2}} />
        <Button size="large" variant="contained">Save</Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default AdsList;
