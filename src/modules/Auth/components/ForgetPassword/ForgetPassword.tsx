import ImgLogin from "../../../../assets/images/forgetpassword.png";
import {
  Box,
  FormControl,
  FormHelperText,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import { EmailValidation } from "../../../../constants/Validations";

type DataForget = {
  email: string;
};

export default function ForgetPassword() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<DataForget>({ mode: "onChange" });

  const onSubmit = async (data: DataForget) => {
    try {
      const response = await axios.post(User_URls.forgetPassword, data);
      toast.success(response.data.message);
      navigate("/reset-password");
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
          {/* Left form */}
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
                  Forgot password
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
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Email
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
                    Send mail
                  </Button>
                </Stack>
              </FormControl>
            </Stack>
          </Grid2>
          {/* right image */}
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
