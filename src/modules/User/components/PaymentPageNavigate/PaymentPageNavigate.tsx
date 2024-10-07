import { Box, Button, CardContent, Grid2, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/authcontext';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
export default function PaymentPageNavigate() {
    
  return (
    <>
        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "75%", md: "50%" },
          py: 3,
          px:1,
          borderRadius: "15px",
          bgcolor:"#F1F5F9"

        }}
      >
        <CardContent >
          <Typography
            component="div"
            variant="h5"
            sx={{ mb: 3, color: "#33a18b" ,textAlign:"center",fontWeight:700}}
          >
           Payment Successfully <CheckCircleIcon className='PaymentIcon'  fontSize="large"/>
          </Typography>
          <Typography sx={{color:"#152c5b",textAlign:"center",mb:5,fontWeight:600}}>
            Thank You For Your Purchase.
          </Typography>

          <Box  sx={{display:{xs:"inline" ,sm:"flex"} , justifyContent:"space-evenly" } }>

          <Button
            sx={{
              color: "#203FC7",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "Poppins",
             
              py: 2,
              px:2.5,
              my:1,
             marginLeft:{xs:"20px",sm:"70px",md:0}
            }}
            variant="outlined"
             size="medium"
          >
            <Link
              to={
                
                "/dashboard/homepage"
              }
              style={{ textDecoration: "none", color: "#203FC7" }}
            >
              Back To Home
              <i
                style={{ marginLeft: "5px",color: "#203FC7" }}
                className="fa-solid fa-house-chimney"
              ></i>
            </Link>
          </Button>
          <Button
            sx={{
              color: "#FF498B",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "Poppins",
              my:1,
              px:2 ,
              py:1.7,
              marginLeft:{xs:"20px",sm:"70px",md:0}
            }}
            variant="outlined"
             size="medium"
             
          >
            <Link
              to={"/dashboard/all-bookings"
              }
              style={{ textDecoration: "none", color: "#FF498B" }}
            >
              Your Bookings
              <ReceiptLongIcon className='PaymentIcon' sx={{ color: "#FF498B" ,ms:"5px"}} />
        
            </Link>
          </Button>
          </Box>

          
        </CardContent>
      </Box>
    </Box>
      
    </>
  )
}
