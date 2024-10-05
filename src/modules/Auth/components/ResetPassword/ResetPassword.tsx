import {
  Box,
  css,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import {
  ConfirmPasswordValidation,
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/Validations";
import { Link, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ImgLogin from "../../../../assets/images/resetpassword.png";
import Stack from "@mui/material/Stack";
import { User_URls } from "../../../../constants/End_Points";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

type DataForget = {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
};
export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<DataForget>({ mode: "onChange" });

  const onSubmit = async (data: DataForget) => {
    try {
      const response = await axios.post(User_URls.resetPassword, data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  // const css = `
  //   input: {
  //     '& input': {
  //       '@media (min-width: 610px) and (max-width: 899px)': {
  //         height: '16px !important',
  //         padding: '16px !important',
  //       },
  //       '@media (min-width: 900px) and (max-width: 1366px)': {
  //         height: '15px !important',
  //         padding: '14px !important',
  //       },

  //     },
  //   },
  // `

  return (
    <div>
      <Box
        sx={{
          height: "97vh",
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
              height={{ xs: "6%", sm: "9%" }}
            >
              <Typography
                variant="h5"
                style={{ fontSize: "26px", fontWeight: "600" }}
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
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Reset Password
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "13px",
                    fontWeight: "500",
                    marginY: 2,
                  }}
                >
                  <span>If you already have an account register</span>
                  <br />
                  <span>
                    You can {""}
                    <Link
                      to={"/login"}
                      style={{
                        color: "#eb5148",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Login here !
                    </Link>{" "}
                  </span>
                </Typography>
              </Stack>

              <FormControl
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
                component="form"
              >
                {/* Email */}
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Email
                </label>
                <TextField
                  className="inputReset"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="email"
                  id="email"
                  error={!!errors.email}
                  placeholder="Please type here ..."
                  {...register("email", EmailValidation)}
                />
                {errors.email && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.email?.message}
                  </FormHelperText>
                )}
                {/* OTP */}
                <label
                  htmlFor="seed"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  OTP
                </label>
                <TextField
                  className="inputReset"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="text"
                  id="seed"
                  error={!!errors.seed}
                  placeholder="Please type here ..."
                  {...register("seed", {
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "OTP must have at least 4 characters",
                    },
                  })}
                />
                {errors.seed && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.seed?.message}
                  </FormHelperText>
                )}
                {/* Password */}
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                    marginTop: "10px",
                  }}
                >
                  Password
                </label>
                <OutlinedInput
                  className="inputReset"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "1px",
                  }}
                  placeholder="Please type here ..."
                  id="password"
                  error={!!errors.password}
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
                {/* Confirm Password */}
                <label
                  htmlFor="ConfirmPassword"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                    marginTop: "10px",
                  }}
                >
                  Confirm Password
                </label>
                <OutlinedInput
                  className="inputReset"
                  sx={{
                    marginTop: 1,
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "1px",
                  }}
                  placeholder="Please type here ..."
                  id="ConfirmPassword"
                  error={!!errors.confirmPassword}
                  {...register("confirmPassword", ConfirmPasswordValidation)}
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        style={{ color: "#ABABAB" }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.confirmPassword && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.confirmPassword?.message}
                  </FormHelperText>
                )}

                <Stack sx={{ my: 2 }} spacing={2} direction="row">
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    type="submit"
                    sx={{
                      width: "100%",
                      backgroundColor: "#3252DF",
                      textTransform: "none",
                      fontSize: "17px",
                      fontWeight: 500,
                    }}
                  >
                    Reset
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
                height: "97vh",
                backgroundImage: `url(${ImgLogin})`,
                backgroundSize: "cover",
                backgroundPosition: "100% 100%",
                backgroundRepeat: "no-repeat",
                margin: "10px",
                borderRadius: "15px",
              }}
            >
              {/* <img  src={ImgLogin} style={{width:"97%",margin: "10px"}}/> */}
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}
