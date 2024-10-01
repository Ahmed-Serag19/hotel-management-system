import { Box, CircularProgress } from '@mui/material'

export default function LoadingScreen() {
  return (
    <Box>
    <Box style={{position:"fixed",top:0,bottom:0,left:0,right:0,backgroundColor:"white",display:"flex" , justifyContent:"center",alignItems:"center"}} >
    <CircularProgress  />
    
</Box>
 </Box>
  )
}
