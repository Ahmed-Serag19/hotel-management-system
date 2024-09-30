import { Link } from "react-router-dom";
import Not from "../../../../assets/images/notfound.jpg";
import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../../context/authcontext";

export default function NotFound() {
  const { loginData }: any = useContext(AuthContext);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${Not})`,
          backgroundSize: "contain",
          backgroundPosition: "40%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            width: "90%",
            height: "30%",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#203FC7",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "Poppins",
              px: 4,
              py: 2,
            }}
            variant="contained"
          >
            <Link
              to={
                loginData?.role === "admin"
                  ? "/dashboard/home"
                  : "/dashboard/homepage"
              }
              style={{ textDecoration: "none", color: "white" }}
            >
              Back To Home
              <i
                style={{ marginLeft: "5px" }}
                className="fa-solid fa-house-chimney"
              ></i>
            </Link>
          </Button>
        </Box>
      </Box>
    </>
  );
}
