import { Base_Url, RoomsUrl, favoriteUrl } from "../../../../constants/End_Points";
import { Box, Container, Grid2, Tooltip, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../../context/authcontext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeaderUserRoom from "../../../Shared/components/HeaderUserRoom/HeaderUserRoom";
import LoadingScreen from "../../../Shared/components/LoadingScreen/LoadingScreen";
import NoData from "../../../Shared/components/NoData/NoData";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";

export default function AllRooms() {
  let { loginData }: any = useContext(AuthContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [isLoading, setLoading] = useState(false);
  // Handle the incoming values from location.state
  const { startDate, endDate, capacity } = location.state || {};

  const [roomList, setRoomList] = useState([]);

  const [, setTotalCount] = useState(0);
  const [page] = useState(0);
  const [, setTotalPages] = useState(1);
  const pageSize = 10;
  const defaultStartDate = "2023-01-20";
  const defaultEndDate = "2023-01-30";

  const handleRoomClick = (
    roomId: string,
    capacity?: number,
    startDate?: string,
    endDate?: string
  ) => {
    // Navigate with roomId, and pass only if values are defined
    navigate(`/dashboard/room-details/${roomId}`, {
      state: {
        capacity: capacity || 2, // Default to 2 if not provided
        startDate:
          startDate || defaultStartDate || format(new Date(), "yyyy-MM-dd"),
        endDate: endDate || defaultEndDate || format(new Date(), "yyyy-MM-dd"),
      },
    });
  };

  //Fetch all rooms with optional startDate, endDate, and capacity
  // let getAllRoom = async (page: number) => {
  //   try {
  //     let response = await axios.get(`${RoomsUrl.getAllRoom}/available`, {
  //       params: {
  //         page: page + 1,
  //         size: pageSize,
  //         startDate: startDate
  //           ? format(new Date(startDate), "yyyy-MM-dd")
  //           : defaultStartDate || format(new Date(), "yyyy-MM-dd")  ,
  //         endDate: endDate
  //           ? format(new Date(endDate), "yyyy-MM-dd")
  //           : defaultEndDate || format(new Date(), "yyyy-MM-dd") ,
  //         capacity: capacity || 2, // Default capacity to 2
  //       },
  //     });

  let getAllRoom = async (page: number) => {
    try {
      let params: any = {
        page: page + 1,
        size: pageSize,
      };
      if (startDate) {
        params.startDate = format(new Date(startDate), "yyyy-MM-dd") || format(new Date(), "yyyy-MM-dd") ;
      }
  
      if (endDate) {
        params.endDate = format(new Date(endDate), "yyyy-MM-dd")  || format(new Date(), "yyyy-MM-dd") ;
      }
  
      if (capacity) {
        params.capacity = capacity || 2;
      }
  
      let response;
  
    
      if (startDate || endDate || capacity) {
        response = await axios.get(`${Base_Url}/portal/rooms/available`, {
          params,
        });
      } 
     
      else {
        response = await axios.get(RoomsUrl.getAllRoom);
      }
      setRoomList(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
     //count={Math.ceil(totalCount / size)}
    } catch (error: any) {
      toast.error("Failed to fetch rooms", error);
    }
  };
  let addToFav = async (id: string) => {
    try {
      await axios.post(
        favoriteUrl.add,
        { roomId: id },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      toast.success(" Successfully Added To Favorites ");
    } catch (error: any) {
      if (loginData?.role === "user") {
        toast.error("Failed to add to Favorites", {
          autoClose: 5000,
        });
      } else {
        toast.error("You need to login to add a room to Favorites");
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllRoom(page);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [page, startDate, endDate, capacity]);

  return (
    <>
      {!isLoading ? (
        <Box>
          {roomList.length > 0 ? (
            <Container>
              <HeaderUserRoom
                title={"Explore ALL Rooms"}
                linkTo={"all-rooms"}
                NameLink={"Explore"}
                Name={"ALL Rooms"}
              />

              <Grid2 container>
                {roomList.map((room: any) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ my: 2 }}
                    key={room._id}
                  >
                    <Box
                      className="ImgList "
                      sx={{ height: "215px", width: "90%" }}
                    >
                      <Box sx={{ position: "relative" }}>
                        <Box
                          component="img"
                          alt="img-room"
                          src={room?.images[0]}
                          sx={{
                            height: "215px",
                            borderRadius: "15px",
                            width: "100%",
                          }}
                        />
                        <Box className="headerImg">
                          <Typography>
                            {"$" + room.price + "" + " per night"}
                          </Typography>
                        </Box>
                      </Box>
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

                          <Tooltip title="Add To Favorite">
                            <FavoriteIcon
                              fontSize="large"
                              onClick={() => addToFav(room._id)}
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
            <NoData />
          )}
        </Box>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
