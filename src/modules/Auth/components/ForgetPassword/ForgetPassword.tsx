import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import forgetpassword from "../../../../assets/images/forgetpassword.png";
import { useForm } from "react-hook-form";
import { EmailValidation } from "../../../../constants/Validations";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { toast } from "react-toastify";

interface dataForgetPassword {
  email: string;
}

export default function ForgetPassword() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<dataForgetPassword>({ defaultValues: { email: "" } });

  const onSubmit = async (data: dataForgetPassword) => {
    try {
      const response = await axios.post(User_URls.forgetPassword, data);
      console.log(response);
      setTimeout(() => {
        navigate("/reset-password");
      }, 500);
      toast.success(response.data.message || "Email Sent Successfully");
    } catch (error: any) {
      console.error(error);
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
        <Grid container>
          <Grid width={{ xs: "85%", sm: "95%", md: "50%" }} xs={12} md={6}>
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
                  variant="h2"
                  style={{ fontSize: "30px", fontWeight: "500" }}
                >
                  ForgetPassword
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
                  <span>If you already have an account register you can</span>
                  <br />
                  <span>
                    You can {""}
                    <Link
                      to={"/login"}
                      style={{
                        color: "#d50000",
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
                  placeholder="Please type here ..."
                  {...register("email", EmailValidation)}
                />
                {errors.email && (
                  <FormHelperText style={{ color: "#d32f2f" }}>
                    {errors.email?.message}
                  </FormHelperText>
                )}
                <Button
                  disabled={isSubmitting}
                  sx={{ mt: 6 }}
                  type="submit"
                  variant="contained"
                >
                  Send Email
                </Button>
              </FormControl>
            </Stack>
          </Grid>

          {/* Grid for image */}
          <Grid display={{ xs: "none", md: "inline" }} xs={12} md={6}>
            <Stack
              sx={{
                height: "100vh",
                backgroundImage: `url(${forgetpassword})`,
                backgroundSize: "cover",
                backgroundPosition: "100% 100%",
                backgroundRepeat: "no-repeat",
                margin: "10px",
                borderRadius: "15px",
              }}
            ></Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
