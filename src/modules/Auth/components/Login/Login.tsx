import ImgLogin from "../../../../assets/images/login.png";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { AuthContext } from "../../../../context/authcontext";
import { toast } from "react-toastify";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/Validations";

type DataLogin = {
  email: string;
  password: string;
};
export default function Login() {
  /*functions for eye toggle */
  const { saveLoginData }: any = useContext(AuthContext);
  let navigate = useNavigate();
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
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<DataLogin>({ mode: "onChange" });

  const onSubmit = async (data: DataLogin) => {
    try {
      let response = await axios.post(User_URls.login, data);
      console.log(response);
      localStorage.setItem("token", response.data.data.token);
      saveLoginData();
      toast.success(response.data.message || "Login Successfully");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          overflow: { xs: "auto", md: "hidden" },
        }}
      >
        <Grid2 container>
          <Grid2
            width={{ xs: "85%", sm: "95%", md: "50%" }}
            size={{ xs: 12, md: 6 }}
          >
            <Stack
              sx={{ marginLeft: "3%", marginTop: "20px" }}
              height={{ xs: "6%", sm: "13%" }}
            >
              <Typography
                variant="h5"
                style={{ fontSize: "26px", fontWeight: "500" }}
                component="p"
              >
                <span style={{ color: "#3252DF" }}>Stay</span>
                <span style={{ color: "#152C5B" }}>cation.</span>
              </Typography>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", sm: "80%", md: "70%" },
                margin: { xs: "10%", sm: "auto" },
              }}
            >
              <Stack>
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
                  <span>If you don’t have an account register</span>
                  <br />
                  <span>
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
                  </span>
                </Typography>
              </Stack>

              <FormControl
                onSubmit={handleSubmit(onSubmit)}
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
                  error={!!errors.email}
                  //helperText={errors.email?.message}
                  placeholder="Please type here ..."
                  {...register("email", EmailValidation)}
                />
                {errors.email && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.email?.message}
                  </FormHelperText>
                )}

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
                  error={!!errors.password}
                  // helperText={errors.password?.message}
                  {...register("password", PasswordValidation)}
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
                {errors.password && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.password?.message}
                  </FormHelperText>
                )}

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
                  Forgot Password?
                </Link>

                <Stack sx={{ my: 4 }} spacing={2} direction="row">
                  <Button
                    disabled={isSubmitting}
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
            </Stack>
          </Grid2>

          <Grid2
            display={{ xs: "none", md: "inline" }}
            size={{ xs: 12, md: 6 }}
          >
            <Stack
              sx={{
                height: "100vh",
                backgroundImage: `url(${ImgLogin})`,
                backgroundSize: "cover",
                backgroundPosition: "100% 100%",
                backgroundRepeat: "no-repeat",
                margin: "10px",
                borderRadius: "15px",
              }}
            ></Stack>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}
