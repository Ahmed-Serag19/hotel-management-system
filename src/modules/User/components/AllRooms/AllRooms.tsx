import React, { useEffect, useState } from "react";

import { RoomsUrl } from "../../../../constants/End_Points";
import axios from "axios";

export default function AllRooms() {
  const [roomList, setRoomList] = useState([]);

  let getAllRoom = async () => {
    try {
      let response = await axios.get(`${RoomsUrl.getAllRoom}?
            page=1&size=10&startDate=2023-01-20&endDate=2023-01-30`);

      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  return <></>;
}
