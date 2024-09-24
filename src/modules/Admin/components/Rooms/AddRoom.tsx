import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  Typography,
  Stack,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Dropzone from "react-dropzone";
import axios from "axios";
import { facility_Urls, roomsUrl } from "../../../../constants/End_Points";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

// Styled container for the form
const FormContainer = styled(Box)`
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
`;

// InputField styling
const InputField = styled(TextField)`
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 16px;

  & .MuiInputBase-root {
    padding: 8px;
  }
`;

// Styled DropzoneArea
const DropzoneArea = styled(Box)`
  background-color: #f0fdf4;
  border: 1px dashed #22c55e;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #22c55e;
  cursor: pointer;
  margin-bottom: 16px;
`;

// Styled Save and Cancel buttons
const SaveButton = styled(Button)`
  background-color: #203fc7;
  color: white;
  font-size: 16px;
  padding: 8px 20px;
  border-radius: 8px;
  text-transform: none;
  &:hover {
    background-color: #1d36b8;
  }
`;

const CancelButton = styled(Button)`
  border: 1px solid #7c3aed;
  color: #7c3aed;
  font-size: 16px;
  padding: 8px 20px;
  border-radius: 8px;
  text-transform: none;
`;

// Type definitions
type Facility = {
  _id: string;
  name: string;
};

type Room = {
  _id: string;
  roomNumber: string;
  price: number;
  discount: number;
  capacity: number;
  images: string[];
  facilities: Facility[];
};

export default function AddRoomForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const roomToEdit: Room | undefined = location.state?.room;

  useEffect(() => {
    fetchFacilities();
    if (roomToEdit) {
      setValue("roomNumber", roomToEdit.roomNumber);
      setValue("price", roomToEdit.price);
      setValue("capacity", roomToEdit.capacity);
      setValue("discount", roomToEdit.discount);
      setSelectedFacilities(roomToEdit.facilities.map((f) => f._id));
      setExistingImages(roomToEdit.images);
    }
  }, [roomToEdit, setValue]);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(facility_Urls.getAllFacility, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setFacilities(response.data.data.facilities);
    } catch (error) {
      console.error("Failed to fetch facilities", error);
      toast.error("Failed to fetch facilities");
    }
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  };

  // Handle deletion of existing images
  const handleDeleteExistingImage = (image: string) => {
    setExistingImages((prev) => prev.filter((img) => img !== image));
  };

  // Handle deletion of newly uploaded files before submission
  const handleDeleteSelectedFile = (file: File) => {
    setSelectedFiles((prev) => prev.filter((f) => f !== file));
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);
    selectedFacilities.forEach((facilityId) => {
      formData.append("facilities", facilityId); // Append multiple facilities
    });

    // Append existing images URLs
    existingImages.forEach((image) => {
      formData.append("existingImages", image); // Assuming backend can handle existing images separately
    });

    // Append new uploaded images
    selectedFiles.forEach((file) => {
      formData.append("newImages", file);
    });

    try {
      if (roomToEdit) {
        // Update room if in edit mode
        await axios.put(roomsUrl.updateRoom(roomToEdit._id), formData, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        toast.success("Room Edited Successfully");
      } else {
        // Create a new room
        await axios.post(roomsUrl.createRoom, formData, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        toast.success("Room Added Successfully");
      }
      reset();
      setSelectedFiles([]);
      setExistingImages([]);
      navigate("/dashboard/rooms"); // Navigate back to rooms list after saving
    } catch (error: any) {
      console.error("Failed to create/update room", error);
      toast.error(
        error.response?.data?.message || "Failed to create/update room"
      );
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        {roomToEdit ? "Edit Room" : "Add a New Room"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Room Number */}
        <InputField
          label="Room Number"
          variant="outlined"
          {...register("roomNumber", { required: "Room number is required" })}
          error={!!errors.roomNumber}
          helperText={errors.roomNumber?.message as string}
        />

        {/* Price and Capacity */}
        <Box display="flex" gap={2} mb={2}>
          <InputField
            label="Price ($)"
            variant="outlined"
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price cannot be negative" },
            })}
            error={!!errors.price}
            helperText={errors.price?.message as string}
          />
          <InputField
            label="Capacity (persons)"
            variant="outlined"
            type="number"
            {...register("capacity", {
              required: "Capacity is required",
              min: { value: 1, message: "At least 1 person" },
            })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message as string}
          />
        </Box>

        {/* Discount */}
        <InputField
          label="Discount ($)"
          variant="outlined"
          type="number"
          {...register("discount", {
            required: "Discount is required",
            min: { value: 0, message: "Discount cannot be negative" },
          })}
          error={!!errors.discount}
          helperText={errors.discount?.message as string}
        />

        {/* Facilities */}
        <Controller
          control={control}
          name="facilities"
          rules={{ required: "At least one facility is required" }}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              displayEmpty
              value={selectedFacilities}
              onChange={(e) =>
                setSelectedFacilities(e.target.value as string[])
              }
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Facilities</em>;
                }

                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => {
                      const facility = facilities.find((f) => f._id === value);
                      return facility ? (
                        <Chip key={value} label={facility.name} />
                      ) : null;
                    })}
                  </Box>
                );
              }}
              sx={{
                backgroundColor: "#f7f7f7",
                borderRadius: "8px",
                width: "100%",
                marginBottom: "16px",
              }}
            >
              {facilities.map((facility) => (
                <MenuItem key={facility._id} value={facility._id}>
                  {facility.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.facilities && (
          <FormHelperText error>
            {errors.facilities.message as string}
          </FormHelperText>
        )}

        {/* Existing Images */}
        {roomToEdit && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Existing Images:
            </Typography>
            {existingImages.length > 0 ? (
              <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
                {existingImages.map((image, index) => (
                  <Box key={index} position="relative">
                    <img
                      src={image}
                      alt={`Existing room ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteExistingImage(image)}
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        backgroundColor: "#fff",
                        color: "#f44336",
                        "&:hover": { backgroundColor: "#fff" },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography>No existing images</Typography>
            )}
          </>
        )}

        {/* Dropzone for new images */}
        <Dropzone onDrop={onDrop} accept={{ "image/*": [] }} multiple>
          {({ getRootProps, getInputProps }) => (
            <DropzoneArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography>
                Drag & Drop or{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#22C55E",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Choose Room Images
                </Box>{" "}
                to Upload
              </Typography>
            </DropzoneArea>
          )}
        </Dropzone>

        {/* List of newly uploaded files */}
        {selectedFiles.length > 0 && (
          <List>
            {selectedFiles.map((file, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteSelectedFile(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        )}

        {/* Form Actions */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <CancelButton onClick={() => navigate("/dashboard/rooms")}>
            Cancel
          </CancelButton>
          <SaveButton type="submit">
            {roomToEdit ? "Update" : "Save"}
          </SaveButton>
        </Stack>
      </form>
    </FormContainer>
  );
}
