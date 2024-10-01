import { Box, Typography } from "@mui/material";
import Nodata from "../../../../assets/images/nodata.jpg";

export default function NoData() {
  return (
    <>
      
      <Box sx={{px:4,textAlign:"center" }} >
  
        <Box component="img" src={Nodata} alt="" sx={{width:{xs:"80%",md:"35%"}}} />
        <Typography  variant="h5" sx={{color: "#1F263E"}}>
        No Data 
        </Typography>
     
      </Box>
    </>
  )
}
