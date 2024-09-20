export const Base_Url = "https://upskilling-egypt.com:3000/api/v0";
export const Base_Img_Url = "https://upskilling-egypt.com:3000/";

const Base_Users = `${Base_Url}/portal/users`;

export const User_URls = {
  login: `${Base_Users}/Login`,
  register: `${Base_Users}`,
  forgetPassword: `${Base_Users}/forgot-password`,
  resetPassword: `${Base_Users}/reset-password`,
  changePassword: `${Base_Users}/change-password`,
  getAllUsers: `${Base_Users}/?page=1&size=10`,
  getUserProfile: (id: string) => `${User_URls}/${id}`,
};

// const Base_facilities = `${Base_Url}/admin/room-facilities`;
// export const facility_Urls = {
//   getAllFacility: `${Base_facilities}`,
//   createFacility: `${Base_facilities}`,
//   delete: (id: string) => `${Base_facilities}/${id}`,
//   update: (id: string) => `${Base_facilities}/${id}`,
//   details: (id: string) => `${Base_facilities}/${id}`,
// };

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
  createRoom: `${Base_rooms}/room-facilities`,
  deleteRoom: (id: string) => `${Base_rooms}/${id}`,
};

const Base_booking = `${Base_Url}/admin/booking`;
export const bookingUrl = {
  getAllBooking: `${Base_booking}?page=1&size=10`,
  delete: (id: string) => `${Base_booking}/${id}`,
  details: (id: string) => `${Base_booking}/${id}`,
};

export const getDashboard = `${Base_Url}/admin/dashboard`;
