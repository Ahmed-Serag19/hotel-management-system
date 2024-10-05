import {
  Box,
  Button,
  CardContent,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";

import { User_URls } from "../../../../constants/End_Points";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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
      reset();
      toast.success(response.data.message || "Password changed successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "75%", md: "50%" },
          boxShadow: "2",
          p: 3,
          borderRadius: "15px",
        }}
      >
        <CardContent>
          <Typography
            component="div"
            variant="h5"
            sx={{ mb: 4, color: "#3252df" }}
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
                paddingY: "15px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Change Password
            </Button>
          </FormControl>
        </CardContent>
      </Box>
    </Box>
  );
}
