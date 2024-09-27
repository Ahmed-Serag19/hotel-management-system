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

const Base_get_users = `${Base_Url}/admin/users`;
export const get_user = {
  getAllUsers: `${Base_get_users}/?page=1&size=10`,
  getUserProfile: (id: string) => `${Base_get_users}/${id}`,
};

const Base_facilities = `${Base_Url}/admin/room-facilities`;
export const facility_Urls = {
  getAllFacility: `${Base_facilities}`,
  createFacility: `${Base_facilities}`,
  delete: (id: string) => `${Base_facilities}/${id}`,
  update: (id: string) => `${Base_facilities}/${id}`,
  details: (id: string) => `${Base_facilities}/${id}`,
};
const Base_rooms = `${Base_Url}/admin/rooms`;
export const roomsUrl = {
  getAllRooms: `${Base_rooms}?page=1&size=10`,
  createRoom: `${Base_rooms}`,
  deleteRoom: (id: string) => `${Base_rooms}/${id}`,
  updateRoom: (id: string) => `${Base_rooms}/${id}`,
  roomDetails: (id: string) => `${Base_rooms}/${id}`,
};

const Base_Ads = `${Base_Url}/admin/ads`;
export const Ads_URls = {
  getAds: `${Base_Ads}`,
  addAds: `${Base_Ads}`,
  updateAds: (id: string): string => `${Base_Ads}/${id}`,
  deleteAds: (id: string): string => `${Base_Ads}/${id}`,
};

const Base_booking = `${Base_Url}/admin/booking`;
export const bookingUrl = {
  getAllBooking: `${Base_booking}?page=1&size=10`,
  delete: (id: string) => `${Base_booking}/${id}`,
  details: (id: string) => `${Base_booking}/${id}`,
};

export const getDashboard = `${Base_Url}/admin/dashboard`;


const Base_Portal= `${Base_Url}/portal`;
export const RoomsUrl ={
  getAllRoom:`${Base_Portal}/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30`
}

const Base_comment= `${Base_Url}/portal/room-comments`;
export const CommentUrls ={
  getAllComments:`${Base_comment}`,
  createComment:`${Base_comment}`
}


