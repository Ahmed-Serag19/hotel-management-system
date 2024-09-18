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
          mx:3,
          mt:2,
          mb:5,
          height:{xs:"30px",sm:"120px"},
        }}
      >
        <Stack sx={{ color: "#1F263E" }}>
          <Typography variant="h6" sx={{ fontFamily: "Poppins" }}>
            {titleTable} Table Details
          </Typography>
          <Typography
            sx={{ fontSize: "14px",  lineHeight: "2px" }}
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
              fontSize: "16px",
              fontWeight: 700,
              px: { xs: 3, sm: "50px" },
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
