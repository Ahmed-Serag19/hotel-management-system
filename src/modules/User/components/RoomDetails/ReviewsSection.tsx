import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CommentUrls, ReviewsUrls } from "../../../../constants/End_Points";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface CommentResponse {
  data: {
    comment: string;
    roomId: string;
  };
}

const ReviewsSection: React.FC = () => {
  const { roomId } = useParams<Record<string, string>>(); // Use Record type
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setToken(authToken);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Function to create a comment
  const createComment = async () => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      await axios.post<CommentResponse>(
        CommentUrls.createComment,
        {
          comment: comment,
          roomId: roomId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComment(""); // Clear the comment input after successful submission
      toast.success("Comment added succefully");
    } catch (error) {
      toast.error("Error creating comment");
    }
  };

  // Function to create a review
  const createReview = async () => {
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    if (rating === 0) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!review) {
      toast.error("Review cannot be empty");
      return;
    }

    if (!roomId) {
      toast.error("Room ID is missing");
      return;
    }

    try {
      await axios.post(
        ReviewsUrls.createReview,
        {
          roomId: roomId,
          rating: rating,
          review: review,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Review successfully created:");
      setReview("");
      setRating(0);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Error creating review:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        paddingY: 5,
        paddingX: 2,
        display: "flex",
        flexDirection: { md: "row", sm: "column", xs: "column" },
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      {loggedIn ? (
        <>
          {/* Review Section */}
          <Stack
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              padding: 5,
              mb: 5,
              flex: 1,
              width: { sm: "100%" },
            }}
            spacing={2}
          >
            <Typography variant="h6" color="#152C5B">
              Rate and Review
            </Typography>
            {/* Rating Stars */}
            <Box>
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  color={value <= rating ? "#DFCB1D" : "#ddd"}
                  onClick={() => setRating(value)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Box>

            {/* Review Text Field */}
            <TextField
              id="review"
              label="Your Review"
              multiline
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            {/* Submit Review Button */}
            <Button
              onClick={createReview}
              variant="contained"
              sx={{
                backgroundColor: "#3252DF",
                width: "25%",
                textTransform: "none",
              }}
            >
              Submit Review
            </Button>
          </Stack>

          {/* Comment Section */}
          <Stack
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              padding: 5,
              flex: 1,
              width: { sm: "100%" },
            }}
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            divider={
              <Divider
                sx={{
                  backgroundColor: "rgb(32, 63, 199, 0.5)",
                  borderWidth: "2px",
                }}
                orientation="vertical"
                flexItem
              />
            }
          >
            <Stack
              spacing={2}
              sx={{
                width: { xs: "100%", md: "100%" },
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" color="#152C5B">
                Add Your Comment
              </Typography>
              <TextField
                id="comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ borderColor: "3252DF" }}
              />
              <Button
                onClick={createComment}
                variant="contained"
                sx={{
                  backgroundColor: "#3252DF",
                  width: "25%",
                  alignSelf: "end",
                  textTransform: "none",
                }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <Typography
          variant="h6"
          color="#152C5B"
          sx={{ textAlign: "center", color: "green" }}
        >
          Please log in to add a review or rate.
        </Typography>
      )}
    </Box>
  );
};

export default ReviewsSection;
