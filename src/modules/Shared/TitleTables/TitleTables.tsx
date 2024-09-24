import { Box, Button, Stack, Typography } from "@mui/material";


interface TitleData {
  titleTable?: string;
  onClick?: () => void;
  btn?: string;
}
export default function TitleTables({ titleTable, onClick, btn }: TitleData) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt:2,
          mb:5,
          height:{xs:"30px",sm:"100px"},
        }}
      >
        <Stack sx={{ color: "#1F263E" , }} >
          <Typography variant="h6" sx={{ fontFamily: "Poppins" ,fontSize:{xs:"16px",md:"20px"} }}>
            {titleTable} Table Details
          </Typography>
          <Typography
            sx={{fontSize:{xs:"12px",md:"14px"},  lineHeight: "2px" }}
          >
            You can check all details
          </Typography>
        </Stack>

        <Stack  direction="row">
          <Button
            onClick={onClick}
            type="submit"
            sx={{
              width: "100%",
              backgroundColor: "#203FC7",
              textTransform: "none",
              fontSize: {xs:"12px",md:"16px"},
              fontWeight: 700,
              px: { xs:2, sm: "50px" },
              py: 1,
            }}
            variant="contained"
          >
            Add New <span style={{fontWeight: 400, marginLeft:"5px"}}>{btn}</span> 
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
