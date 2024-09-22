import { useForm } from "react-hook-form";
import resetPhoto from "../../../../assets/images/resetpassword.png";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { toast } from "react-toastify";

export default function ChangePassword() {
  interface UserData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>();

  const changePasswordSubmation = async (data: UserData) => {
    try {
      const response = await axios.post(User_URls.changePassword, data, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(response.data.message);
      reset();
      toast.success(response.data.message || "Password changed successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: "500px",
        marginTop: "3rem",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box>
        <CardContent>
          <Typography
            component="div"
            variant="h3"
            sx={{ marginBottom: "25px" }}
          >
            Change Password
          </Typography>

          <FormControl
            component="form"
            onSubmit={handleSubmit(changePasswordSubmation)}
            sx={{
              width: "100%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Old Password"
              variant="outlined"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              error={!!errors.oldPassword}
            />
            {errors.oldPassword && (
              <FormHelperText style={{ color: "#d32f2f" }}>
                {errors?.oldPassword?.message as string}
              </FormHelperText>
            )}

            <TextField
              sx={{
                marginTop: "15px",
              }}
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              {...register("newPassword", {
                required: "New password is required",
              })}
              error={!!errors.newPassword}
            />
            {errors.newPassword && (
              <FormHelperText style={{ color: "#d32f2f" }}>
                {errors?.newPassword?.message as string}
              </FormHelperText>
            )}

            <TextField
              sx={{
                marginTop: "15px",
              }}
              id="outlined-basic"
              label="Confirm New Password"
              variant="outlined"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <FormHelperText style={{ color: "#d32f2f" }}>
                {errors?.confirmPassword?.message as string}
              </FormHelperText>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "30px",
              }}
            >
              Change Password
            </Button>
          </FormControl>
        </CardContent>
      </Box>

      <CardMedia
        className="changePassword"
        component="img"
        sx={{ width: 350 }}
        image={resetPhoto}
        alt="Live from space album cover"
      />
    </Card>
  );
}
