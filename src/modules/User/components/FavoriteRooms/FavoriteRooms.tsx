import { useContext, useEffect, useState } from "react";
import { favoriteUrl, RoomsUrl } from "../../../../constants/End_Points";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Box,
  Container,
  Grid2,
  ImageList,
  ImageListItem,
  Pagination,
  Stack,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/authcontext";
import NoData from "../../../Shared/components/NoData/NoData";
import HeaderUserRoom from "../../../Shared/components/HeaderUserRoom/HeaderUserRoom";

export default function FavoriteRoom() {
  let { loginData }: any = useContext(AuthContext);
  let navigate = useNavigate();
  if (loginData?.role != "user") {
    navigate("/NotFound");
  }
  const [totalCount, setTotalCount] = useState(0);
  const [favoriteList, setFavoriteList] = useState([]);

  let getAllFavorite = async () => {
    try {
      let response = await axios.get(favoriteUrl.getAllFavorites, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setFavoriteList(response.data.data.favoriteRooms[0].rooms);
      setTotalCount(response.data.data.totalCount);
      console.log(response.data);
    } catch (error) {}
  };

  let removeFavorite = async (roomId: string) => {
    try {
      let response = await axios.delete(
        favoriteUrl.delete(roomId),

        {
          data: { roomId: roomId },
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      toast.success(" Successfully Delete from Favorites ");
      getAllFavorite();
      console.log(response);
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
          {favoriteList.length > 0 ? (
            <Container>
              <HeaderUserRoom
                title={"Your Favorites"}
                linkTo={`favorite-room`}
                NameLink={"Favorites"}
                Name={"Your Rooms"}
              />

              <Grid2 container sx={{textAlign:"center"}}>
                {favoriteList.map((room: any) => (
                  <Grid2
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ my: 2 }}
                    key={room._id}
                  >
                    <Box
                      sx={{ width: "90%", height: "215px" }}
                      className="ImgList "
                    >
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
                      <Box className="LayerIcon">
                        <Box className="IconsBar">
                          <Tooltip title="Details Room">
                            <VisibilityIcon
                              fontSize="large"
                              onClick={() => navigate(``)}
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

              {/* 
<ImageList cols={3} sx={{ width: "100%" }}>
 {favoriteList.map((room: any) => (
  
     <ImageListItem className="ImgList" key={room._id} sx={{ m: 2 }}>


     <Box component="img"
         alt="img-room"
         src={room?.images[0]}
         loading="lazy"
         sx={{
         
           height:{xs:"120px",sm:"160px",md:"215px"},
           borderRadius: "15px",
           width:"100%",
           
         }}
       />

       <Box className="LayerIcon">
         <Box className="IconsBar">

         <Tooltip title="Details Room">
      <VisibilityIcon fontSize="large" onClick={()=>navigate(``)}/>
       </Tooltip>
       
         <Tooltip title="Delete From Favorite! ">
         <FavoriteBorderIcon fontSize="large" onClick={()=>removeFavorite(room._id)} sx={{marginLeft:"15px"}}/>
          </Tooltip>
         </Box>


       </Box>

     </ImageListItem>
  
 ))}
</ImageList> */}
            </Container>
          ) : (
            <NoData />
          )}
        </Box>
      ) : (
        navigate("/NotFound")
      )}
    </>
  );
}
