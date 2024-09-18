export const Base_Url = "https://upskilling-egypt.com:3000/api/v0";
export const Base_Img_Url = "https://upskilling-egypt.com:3000/";

const Base_Users = `${Base_Url}/portal/users`;

export const User_URls = {
  login: `${Base_Users}/Login`,
  register: `${Base_Users}`,
  forgetPassword: `${Base_Users}/forgot-password`,
  resetPassword: `${Base_Users}/reset-password`,
  changePassword: `${Base_Users}/change-password`,
};
const Base_facilities = `${Base_Url}/admin`;
export const facility_Urls = {
  getAllFacility: `${Base_facilities}/room-facilities`,
  createFacility: `${Base_facilities}/room-facilities`,
};
const Base_rooms = `${Base_Url}/admin/rooms`;
export const roomsUrl = {
  getAllRooms: `${Base_rooms}?page=1&size=10`,
  createRoom: `${Base_rooms}/room-facilities`,
};
