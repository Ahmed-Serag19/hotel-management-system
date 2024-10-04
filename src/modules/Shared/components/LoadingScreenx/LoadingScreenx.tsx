import { Box } from '@mui/material'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div>
       <div style={{position:"fixed",top:0,bottom:0,start:0,end:0,bgcolor:"white",display:"flex" , justifyContent:"center",alignItems:"center"}} >
        <i style={{color:"#3252df"}} className='fa-solid fa-spinner fa-7x  fa-spin spinner-load '></i>

</div>
    </div>
  )
}
