import { Box, Button,Stack,Typography,Modal } from '@mui/material';
import DeleteImg from "../../../../assets/images/delete.png";
import {style } from"../../../Admin/components/Facilities/FacilitiesData"
interface DataModal{
    open?:any;
    handleClose?:()=>void;
    FunctionBtn?:()=>void;
}
export default function ModalPop({open,handleClose,FunctionBtn}:DataModal) {


  return (
    <>
          {/* modAl delete */}

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ fontFamily: "Poppins", padding: "60px" }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mb: "60px",
            }}
          >
            <i
              onClick={handleClose}
              style={{
                color: "#CC0000",
                textAlign: "right",
                cursor: "pointer",
              }}
              className="fa-regular fa-xl fa-circle-xmark"
            ></i>
          </Box>
          <Box sx={{ textAlign: "center", mt: 5, mb: 2 }}>
            <img src={DeleteImg} alt="" />
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: "#494949",
              fontWeight: 700,
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Delete This Facility ?
          </Typography>
          <Typography
            sx={{
              color: "#494949",
              fontSize: "15px",
              textAlign: "center",
              opacity: "60%",
              mt: 2,
              mb: 5,
            }}
          >
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </Typography>

          <Stack
            sx={{
              mt: 5,
              width: "100%",
              display: "flex",
              justifyContent: "end",
              borderTop: "3px",
            }}
            spacing={2}
            direction="row"
          >
            <Button
              onClick={FunctionBtn}
              
              type="submit"
              sx={{
                backgroundColor: "#203FC7",
                textTransform: "none",
                fontSize: "17px",
                fontWeight: 500,
                mt: 3,
              }}
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      
    </>
  )
}
