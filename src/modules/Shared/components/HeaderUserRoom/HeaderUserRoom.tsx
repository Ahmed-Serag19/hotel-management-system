import { Box, Typography } from '@mui/material'
import { Link, NavLink, } from 'react-router-dom'
interface DataRoom{
    title:string
    linkTo:any
    NameLink:string
    Name:string

}
export default function HeaderUserRoom({title,linkTo,NameLink,Name}:DataRoom) {
  return (
    <>
     <Box>
          <Typography
          variant="h3"
          sx={{ textAlign: "center", color: "#1F263E", fontWeight: "600", fontFamily:"Poppins", pt:1 ,fontSize:{xs:"26px",md:"36px"}}}

        >
          {/* Explore ALL Rooms */} {title}
        </Typography>
        <Box sx={{ mb:5,fontWeight: "300", marginTop:{xs:3,md:0}, fontSize:{xs:"13px" , md:"16px"} }}>
          <Link style={{textDecoration:"none", color: "#B0B0B0"}} to={"/dashBoard"} >Home</Link>
          <Typography component="span" sx={{mx:2,color: "#B0B0B0" }}>/</Typography>
          <NavLink  style={{textDecoration:"none", color: "#B0B0B0"}} to={`/dashBoard/${linkTo}`} >{NameLink}</NavLink>
        </Box>
        <Typography
          sx={{ color: "#1F263E", fontWeight: "500", fontFamily:"Poppins", fontSize:"24px" }}
        >
        {/* ALL Rooms */} {Name}
        </Typography>

          </Box>

          {/* "/dashBoard/all-rooms" 
          Explore
          */}

      
    </>
  )
}
