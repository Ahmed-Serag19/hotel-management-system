import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import RegisterImg from "../../../../assets/images/register.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { Grid2 } from '@mui/material/Unstable_Grid2';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  interface FormValue {
    userName: string;
    phoneNumber: number;
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
    inputFormData.append("phoneNumber", data.phoneNumber.toString()); // Convert number to string
    if (data.profileImage.length > 0) {
      inputFormData.append("profileImage", data.profileImage[0]);
    }
    inputFormData.append("password", data.password);
    inputFormData.append("confirmPassword", data.confirmPassword);

    return inputFormData;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>({
    defaultValues: {
      userName: "",
      phoneNumber: 0,
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
<<<<<<< Updated upstream
      profileImage: undefined,
=======
      profileImage: FileList,
>>>>>>> Stashed changes
      role: "",
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
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
<<<<<<< Updated upstream
          overflow: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
=======
          overflow: "hidden", // Prevent scrolling
          display: "flex", // Flexbox to layout the image and form side by side
          flexDirection: { xs: "column", md: "row" }, // Stack items vertically on xs screens and horizontally on md and above
>>>>>>> Stashed changes
        }}
      >
        <Grid2 container sx={{ flex: 10 }}>
          {/* Form on the Right */}
          <Grid2
<<<<<<< Updated upstream
            sx={{
              width: { xs: "90%", sm: "95%", md: "50%" },
              margin: "auto",
              padding: { xs: 2, md: 4 },
              gridColumn: { xs: "span 12", md: "span 6" },
            }}
=======
            width={{ xs: "70%", sm: "65%", md: "50%" }} // Increased the grid size to avoid scrolling
            xs={12}
            md={6}
            sx={{ margin: "auto", padding: { xs: 2, md: 4 } }} // Center and add padding
>>>>>>> Stashed changes
          >
            <Typography
              variant="h5"
              style={{
                fontSize: "26px",
                fontWeight: "500",
                padding: "",
                position: "absolute",
                top: "20px",
              }}
              component="p"
            >
              <span style={{ color: "#3252DF" }}>Stay</span>
              <span style={{ color: "#152C5B" }}>cation.</span>
            </Typography>
            <Stack
              sx={{ marginLeft: { xs: 0, md: "3%" }, marginTop: "10px" }}
              height={{ xs: "auto", sm: "auto" }}
<<<<<<< Updated upstream
            ></Stack>
=======
            >
              <Typography
                variant="h5"
                style={{ fontSize: "22px", fontWeight: "500" }} // Reduced the font size
                component="p"
              >
                <span style={{ color: "#3252DF" }}>Stay</span>
                <span style={{ color: "#152C5B" }}>cation.</span>
              </Typography>
            </Stack>
>>>>>>> Stashed changes
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                margin: "auto",
              }}
            >
              <Stack>
                <Typography
                  variant="h2"
                  style={{ fontSize: "20px", fontWeight: "500" }} // Reduced the font size
                >
                  Sign Up
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "12px", // Reduced the text size
                    fontWeight: "500",
                    marginY: 2,
                  }}
                >
                  <span>If you already have an account, you can</span>
                  <br />
                  <span>
                    <Link
                      to={"/login"}
                      style={{
                        color: "#d50000",
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
<<<<<<< Updated upstream
                    paddingTop: "5px",
                    fontSize: "16px",
=======
                    fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Username
                </label>
                <TextField
                  sx={{
                    //
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                    width: "100%",
                    fontSize: "10px", // Smaller input text size
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
<<<<<<< Updated upstream
                  spacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Stack width="100%">
                    <label
                      htmlFor="phoneNumber"
                      style={{
                        paddingTop: "5px",
                        fontSize: "16px",
=======
                  spacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Stack spacing={1} width="100%">
                    <label
                      htmlFor="phoneNumber"
                      style={{
                        fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                        fontWeight: 400,
                        color: "#152C5B",
                      }}
                    >
                      Phone Number
                    </label>
                    <TextField
                      sx={{
                        marginBottom: 1,
                        bgcolor: "#f5f6f8",
                        border: "none",
                        width: "100%",
                        fontSize: "10px", // Smaller input size
                      }}
                      type="number"
                      placeholder="Please type here ..."
                      id="phoneNumber"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      })}
                    />
                  </Stack>

<<<<<<< Updated upstream
                  <Stack width="100%">
                    <label
                      htmlFor="country"
                      style={{
                        paddingTop: "5px",
                        fontSize: "16px",
=======
                  <Stack spacing={1} width="100%">
                    <label
                      htmlFor="country"
                      style={{
                        fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                        fontWeight: 400,
                        color: "#152C5B",
                      }}
                    >
                      Country
                    </label>
                    <TextField
                      sx={{
                        marginBottom: 1,
                        bgcolor: "#f5f6f8",
                        border: "none",
                        width: "100%",
                        fontSize: "10px", // Smaller input size
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
<<<<<<< Updated upstream
                    paddingTop: "5px",
                    fontSize: "16px",
=======
                    fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Email Address
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                    width: "100%",
                    fontSize: "10px", // Smaller input size
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
<<<<<<< Updated upstream
                    paddingTop: "5px",
                    fontSize: "16px",
=======
                    fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Password
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                    width: "100%",
                    fontSize: "10px", // Smaller input size
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
<<<<<<< Updated upstream
                    paddingTop: "5px",
                    fontSize: "16px",
=======
                    fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Confirm Password
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                    width: "100%",
                    fontSize: "10px", // Smaller input size
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
<<<<<<< Updated upstream
                    paddingTop: "5px",
                    paddingBottom: "10px",
                    fontSize: "16px",
=======
                    fontSize: "10px", // Smaller label size
>>>>>>> Stashed changes
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  style={{ marginTop: "8px" }}
                  {...register("profileImage")}
                />

                {/* Submit Button */}
                <Button
                  disabled={isSubmitting}
                  sx={{ mt: 3, width: "100%", fontSize: "12px" }} // Slightly larger button size for visibility
                  type="submit"
                  variant="contained"
                >
                  Sign Up
                </Button>
              </FormControl>
            </Stack>
          </Grid2>

          {/* Grid for Image */}
          <Grid2
            display={{ xs: "none", md: "block" }} // Hide the image on small screens
            size={{ xs: 12, md: 6 }}
            sx={{
              position: "sticky",
              top: 0, // Stick to the top of the viewport
              height: "100vh",
              backgroundImage: `url(${RegisterImg})`, // Your image will show here
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "15px",
              zIndex: 1, // Ensure it's on top of other content
            }}
          ></Grid2>
        </Grid2>
      </Box>
    </>
  );
}
