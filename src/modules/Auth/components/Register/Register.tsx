import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import RegisterImg from "../../../../assets/images/register.png";
import { User_URls } from "../../../../constants/End_Points";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  interface FormValue {
    userName: string;
    phoneNumber: string;
    country: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage: FileList;
    role: string;
  }

  const convertToFormData = (data: FormValue): FormData => {
    const inputFormData = new FormData();
    inputFormData.append("userName", data.userName);
    inputFormData.append("email", data.email);
    inputFormData.append("country", data.country);
    inputFormData.append("phoneNumber", data.phoneNumber);
    inputFormData.append("profileImage", data.profileImage[0]);
    inputFormData.append("password", data.password);
    inputFormData.append("confirmPassword", data.confirmPassword);
    inputFormData.append("role", data.role || "user");
    return inputFormData;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>({
    defaultValues: {
      userName: "",
      phoneNumber: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: undefined,
      role: "user",
    },
  });

  const onSubmit = async (data: FormValue) => {
    try {
      const formData = convertToFormData(data);
      await axios.post(User_URls.register, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message || "Failed to Register!");
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          maxHeight: "100vh",
          overflow: { xs: "auto", md: "hidden" },
        }}
      >
        <Grid2 container>
          <Grid2
            className="sideLeft"
            width={{ xs: "85%", sm: "95%", md: "50%" }}
            size={{ xs: 12, md: 6 }}
            maxHeight={"97vh"}
          >
            <Stack
              sx={{ marginLeft: "3%", marginTop: "10px" }}
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
                margin: { xs: "5%", sm: "auto" },
              }}
            >
              <Stack>
                <Typography
                  variant="h2"
                  style={{ fontSize: "24px", fontWeight: "600" }}
                >
                  Sign Up
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginY: 1,
                  }}
                >
                  <span>If you already have an account, you can</span>
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
                      Login here!
                    </Link>{" "}
                  </span>
                </Typography>
              </Stack>
              <FormControl
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
                component="form"
              >
                {/* Username */}
                <label
                  htmlFor="userName"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Username
                </label>
                <TextField
                  className="inputRegister"
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="text"
                  placeholder="Please type here ..."
                  id="userName"
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  {...register("userName", {
                    required: "Username is required",
                  })}
                />

                {/* Phone Number and Country */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <Stack width="100%">
                    <label
                      htmlFor="phoneNumber"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#152C5B",
                      }}
                    >
                      Phone Number
                    </label>
                    <TextField
                      className="inputRegister"
                      sx={{
                        marginBottom: 1,
                        bgcolor: "#f5f6f8",
                        border: "none",
                      }}
                      type="tel"
                      placeholder="Please type here ..."
                      id="phoneNumber"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      })}
                    />
                  </Stack>

                  <Stack width="100%">
                    <label
                      htmlFor="country"
                      style={{
                        fontSize: "15px",
                        fontWeight: 400,
                        color: "#152C5B",
                      }}
                    >
                      Country
                    </label>
                    <TextField
                      className="inputRegister"
                      sx={{
                        marginBottom: 1,
                        bgcolor: "#f5f6f8",
                        border: "none",
                      }}
                      type="text"
                      placeholder="Please type here ..."
                      id="country"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      {...register("country", {
                        required: "Country is required",
                      })}
                    />
                  </Stack>
                </Stack>

                {/* Email Address */}
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Email Address
                </label>
                <TextField
                  className="inputRegister"
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="email"
                  placeholder="Please type here ..."
                  id="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", { required: "Email is required" })}
                />

                {/* Password */}
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Password
                </label>
                <TextField
                  className="inputRegister"
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Please type here ..."
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <label
                  htmlFor="confirmPassword"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Confirm Password
                </label>
                <TextField
                  className="inputRegister"
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Please type here ..."
                  id="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Profile Image */}
                <label
                  htmlFor="profileImage"
                  style={{
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Profile Image
                </label>
                <Button
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                    padding: 1.5,
                  }}
                >
                  {/* Upload a Image */}
                  <input
                    className="inputRegister"
                    type="file"
                    id="profileImage"
                    {...register("profileImage", {
                      required: "profileImage is required",
                    })}
                  />
                </Button>
                {errors.profileImage && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.profileImage?.message}
                  </FormHelperText>
                )}
                {/* Submit Button */}
                <Button
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    backgroundColor: "#3252DF",
                    textTransform: "none",
                    fontSize: "17px",
                    fontWeight: 500,
                    marginTop: 3,
                  }}
                  type="submit"
                  variant="contained"
                >
                  Sign Up
                </Button>
              </FormControl>
            </Stack>
          </Grid2>
          {/* Grid2 for Image */}
          <Grid2 display={{ xs: "none", md: "block" }} size={{ xs: 12, md: 6 }}>
            <Stack
              className="img-Register"
              sx={{
                height: { md: "130vh", xl: "97vh" },
                backgroundImage: `url(${RegisterImg})`,
                backgroundSize: " cover",
                backgroundRepeat: "no-repeat",
                margin: "10px",
                borderRadius: "15px",
                backgroundPosition: "center center",
              }}
            >
              {/* <img  src={RegisterImg} style={{width:"97%",margin: "10px"}}/> */}
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}
