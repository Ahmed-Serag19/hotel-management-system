import ImgLogin from "../../../../assets/images/login.png";
import {
  Box,
  FormControl,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Link } from "react-router-dom";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
export default function Login() {
  /*functions for eye toggle */
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          overflow: { xs: "auto", sm: "auto", md: "hidden" },
        }}
      >
        <Grid2 container>
          <Grid2 width={"50%"} size={{ xs: 12, sm: 12, md: 6 }}>
            <Box sx={{ marginLeft: "5%", marginTop: "20px", height: "13%" }}>
              <Typography
                variant="h5"
                style={{ fontSize: "26px", fontWeight: "500" }}
                component="p"
              >
                <span style={{ color: "#3252DF" }}>Stay</span>
                <span style={{ color: "#152C5B" }}>cation.</span>
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "80%", md: "70%" },
                margin: { xs: "10%", sm: "auto", md: "auto" },
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  style={{ fontSize: "30px", fontWeight: "500" }}
                >
                  Sign in
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginY: 3,
                  }}
                >
                  <p>If you don’t have an account register</p>
                  <p>
                    You can {""}
                    <Link
                      to={"/register"}
                      style={{
                        color: "#152C5B",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Register here !
                    </Link>{" "}
                  </p>
                </Typography>
              </Box>

              <FormControl
                sx={{ display: "flex", flexDirection: "column" }}
                component="form"
              >
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Email Address
                </label>
                <TextField
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="email"
                  id="email"
                  placeholder="Please type here ..."
                />

                <label
                  htmlFor="password"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                    marginTop: "10px",
                  }}
                >
                  Password
                </label>
                <OutlinedInput
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "1px",
                  }}
                  placeholder="Please type here ..."
                  id="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#ABABAB" }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <Link
                  to={"/forget-password"}
                  style={{
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "#4D4D4D",
                    textAlign: "end",
                    textDecoration: "none",
                  }}
                >
                  ForgetPassword?
                </Link>

                <Stack sx={{ marginBlock: "7%" }} spacing={2} direction="row">
                  <Button
                    type="submit"
                    sx={{
                      width: "100%",
                      backgroundColor: "#3252DF",
                      textTransform: "none",
                      fontSize: "17px",
                      fontWeight: 500,
                    }}
                    variant="contained"
                  >
                    Login
                  </Button>
                </Stack>
              </FormControl>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 12, md: 6 }}>
            <Box
              sx={{
                height: "100vh",
                backgroundImage: `url(${ImgLogin})`,
                backgroundSize: "cover",
                backgroundPosition: "100% 100%",
                backgroundRepeat: "no-repeat",
                margin: "10px",
                borderRadius: "15px",
              }}
            ></Box>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}
