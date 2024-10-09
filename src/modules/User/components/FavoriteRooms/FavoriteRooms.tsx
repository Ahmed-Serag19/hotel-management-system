import { Box, Container, Grid2, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../context/authcontext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HeaderUserRoom from "../../../Shared/components/HeaderUserRoom/HeaderUserRoom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { favoriteUrl } from "../../../../constants/End_Points";
import { format } from "date-fns";
import { toast } from "react-toastify";
import LoadingScreen from "../../../Shared/components/LoadingScreen/LoadingScreen";
export default function FavoriteRoom() {
  let navigate = useNavigate();
  let { loginData }: any = useContext(AuthContext);
  if (loginData?.role != "user") {
    navigate("/NotFound");
  }
  let location = useLocation();
  const [, setTotalCount] = useState(0);
  const { startDate, endDate, capacity } = location.state || {};
  const [favoriteList, setFavoriteList] = useState([]);
  const handleRoomClick = (
    roomId: string,
    capacity?: number,
    startDate?: string,
    endDate?: string
  ) => {
    navigate(`/dashboard/room-details/${roomId}`, {
      state: {
        capacity: capacity || 2,
        startDate: startDate || format(new Date(), "yyyy-MM-dd"),
        endDate: endDate || format(new Date(), "yyyy-MM-dd"),
      },
    });
  };

  let getAllFavorite = async () => {
    try {
      let response = await axios.get(favoriteUrl.getAllFavorites, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setFavoriteList(response.data.data.favoriteRooms[0].rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {}
  };

  let removeFavorite = async (roomId: string) => {
    try {
      await axios.delete(
        favoriteUrl.delete(roomId),

        {
          data: { roomId: roomId },
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      toast.success(" Successfully Delete from Favorites ");
      getAllFavorite();
    } catch (error: any) {
      toast.error("Failed To Delete ");
    }
  };
  useEffect(() => {
   
    getAllFavorite();
   
  }, []);

  return (
    <>
      {loginData?.role === "user" ? (
        <Box>
          
            <Box>
              {favoriteList.length > 0 ? (
                <Container>
                  <HeaderUserRoom
                    title={"Your Favorites"}
                    linkTo={`favorite-room`}
                    NameLink={"Favorites"}
                    Name={"Your Rooms"}
                  />

                  <Grid2 container sx={{ textAlign: "center" }}>
                    {favoriteList.map((room: any) => (
                      <Grid2
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{ my: 2 }}
                        key={room._id}
                      >
                        <Box
                          sx={{ width: "90%", height: {xs:"175px",sm:"215px"}}}
                          className="ImgList "
                        >
                          <Box
                            component="img"
                            alt="img-room"
                            src={room?.images[0]}
                            sx={{
                              height:{xs:"175px",sm:"215px"},
                              borderRadius: "15px",
                              width: "100%",
                            }}
                          />
                          <Box className="LayerIcon">
                            <Box className="IconsBar">
                              <Tooltip title="Details Room">
                                <VisibilityIcon
                                  fontSize="large"
                                  onClick={() =>
                                    handleRoomClick(
                                      room._id,
                                      capacity,
                                      startDate,
                                      endDate
                                    )
                                  }
                                />
                              </Tooltip>
                              <Tooltip title="Delete From Favorite! ">
                                <FavoriteBorderIcon
                                  fontSize="large"
                                  onClick={() => removeFavorite(room._id)}
                                  sx={{ marginLeft: "15px" }}
                                />
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      </Grid2>
                    ))}
                  </Grid2>
                </Container>
              ) : (
                <LoadingScreen />
              )}
            </Box>
          
        </Box>
      ) : (
        navigate("/NotFound")
      )}
    </>
  );
}
