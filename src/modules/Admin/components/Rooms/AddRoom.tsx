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
} from "@mui/material";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import axios from "axios";
import { facility_Urls, roomsUrl } from "../../../../constants/End_Points";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Styled container for the form
const FormContainer = styled(Box)`
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  max-width: 900px;
  margin: auto;
`;

// Common styles for input fields with max height
const InputField = styled(TextField)`
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 16px;
  max-height: 60px;
  & .MuiInputBase-root {
    padding: 0px; /* Keep padding small */
    height: 60px; /* Set input height */
  }
`;

// Select style with smaller height
const CustomSelect = styled(Select)`
  background-color: #f7f7f7;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 16px;
  max-height: 60px; /* Set max height */
  & .MuiSelect-root {
    padding: 8px 12px; /* Set smaller padding */
    height: 60px; /* Set select height */
  }
`;

// Styled dropzone area
const DropzoneArea = styled(Box)`
  background-color: #f0fdf4;
  border: 1px dashed #22c55e;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  color: #22c55e;
  cursor: pointer;
`;

// Styled save button
const SaveButton = styled(Button)`
  background-color: #203fc7;
  color: white;
  font-size: 16px;
  padding: 8px 20px; /* Reduced padding */
  border-radius: 8px;
  text-transform: none;
  &:hover {
    background-color: #1d36b8;
  }
`;

// Styled cancel button
const CancelButton = styled(Button)`
  border: 1px solid #7c3aed;
  color: #7c3aed;
  font-size: 16px;
  padding: 8px 20px; /* Reduced padding */
  border-radius: 8px;
  text-transform: none;
`;

// Facility type
type Facility = {
  _id: string;
  name: string;
};

export default function AddRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  // State for facilities and selected items
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Uploaded files
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]); // Multiple selection

  // Get the room data from the state if in edit mode
  const location = useLocation();
  const navigate = useNavigate();
  const roomToEdit = location.state?.room;

  useEffect(() => {
    fetchFacilities();
    if (roomToEdit) {
      // Prepopulate form with room data if editing
      setValue("roomNumber", roomToEdit.roomNumber);
      setValue("price", roomToEdit.price);
      setValue("capacity", roomToEdit.capacity);
      setValue("discount", roomToEdit.discount);
      setSelectedFacilities(roomToEdit.facilities.map((f: any) => f._id));
    }
  }, [roomToEdit]);

  // Fetch the available facilities
  const fetchFacilities = async () => {
    try {
      const response = await axios.get(facility_Urls.getAllFacility, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setFacilities(response.data.data.facilities);
    } catch (error) {
      console.error("Failed to fetch facilities", error);
    }
  };

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  // Handle form submit
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("roomNumber", data.roomNumber);
    formData.append("price", data.price);
    formData.append("capacity", data.capacity);
    formData.append("discount", data.discount);
    selectedFacilities.forEach((facilityId) => {
      formData.append("facilities", facilityId); // Append multiple facilities
    });
    selectedFiles.forEach((file) => {
      formData.append("imgs", file);
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
      setSelectedFiles([]); // Clear the file list
      navigate("/dashboard/rooms"); // Navigate back to rooms list after saving
    } catch (error) {
      console.error("Failed to create/update room", error);
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        {roomToEdit ? "Edit Room" : "Add a New Room"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Room Number"
          variant="outlined"
          {...register("roomNumber", { required: "Room number is required" })}
          error={!!errors.roomNumber}
          helperText={errors.roomNumber?.message as string}
        />
        <Box display="flex" gap={2}>
          <InputField
            label="Price"
            variant="outlined"
            {...register("price", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price?.message as string}
          />
          <InputField
            label="Capacity"
            variant="outlined"
            {...register("capacity", { required: "Capacity is required" })}
            error={!!errors.capacity}
            helperText={errors.capacity?.message as string}
          />
        </Box>
        <Box display="flex" gap={2}>
          <InputField
            label="Discount"
            variant="outlined"
            {...register("discount", { required: "Discount is required" })}
            error={!!errors.discount}
            helperText={errors.discount?.message as string}
          />
          <CustomSelect
            fullWidth
            variant="outlined"
            multiple
            value={selectedFacilities}
            onChange={(e) => setSelectedFacilities(e.target.value as string[])}
            displayEmpty
            renderValue={(value) => {
              const selected = value as string[];
              if (selected.length === 0) {
                return "Select Facilities";
              }
              return facilities
                .filter((facility) => selected.includes(facility._id))
                .map((facility) => facility.name)
                .join(", ");
            }}
            error={!!errors.facilities}
          >
            <MenuItem value="" disabled>
              Select Facilities
            </MenuItem>
            {facilities.map((facility) => (
              <MenuItem key={facility._id} value={facility._id}>
                {facility.name}
              </MenuItem>
            ))}
          </CustomSelect>
          {errors.facilities && (
            <FormHelperText error>
              {errors.facilities?.message as string}
            </FormHelperText>
          )}
        </Box>

        <Dropzone onDrop={onDrop} accept={{ "image/*": [] }} multiple>
          {({ getRootProps, getInputProps }) => (
            <DropzoneArea {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography>
                Drag & Drop or{" "}
                <Box
                  component="span"
                  sx={{ color: "#22C55E", cursor: "pointer" }}
                >
                  Choose Room Images
                </Box>{" "}
                to Upload
              </Typography>
            </DropzoneArea>
          )}
        </Dropzone>

        {/* List to show uploaded files */}
        {selectedFiles.length > 0 && (
          <List>
            {selectedFiles.map((file) => (
              <ListItem key={file.name}>
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        )}

        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "flex-end" }}
          spacing={2}
          mt={4}
        >
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
