import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../component/auth/authSlice";
import invoiceSlice from "../Pages/Invoice/invoiceSlice";
import gallerySlice from "../Pages/Entertainment/gallerySlice";
import notificationSlice from "../component/Notification/notificationSlice";
import bookingSlice from "../Pages/Booking/bookingSlice";
import profileSlice from "../Pages/Profile/profileSlice";
import eventSlice from "../Pages/Dashboard/eventSlice";
import stepProgressCountSlice from "../Common/CommonSlice/stepProgressCountSlice";
import addServiceSlice from "../Pages/Dashboard/Event/AddService/addServiceSlice";
import eventAddPlaceSlice from "../Pages/Dashboard/Event/AddPlace/eventAddPlaceSlice";
import eventAboutPlaceSlice from "../Pages/Dashboard/Event/AboutPlace/eventAboutPlaceSlice";
import eventPersonalDetailsSlice from "../Pages/Dashboard/Event/PersonalDetails/personalDetailsSlice";
import eventPhotoAndVideoSlice from "../Pages/Dashboard/Event/Photos&Videos/photoAndVideoSlice";
import eventCapacitySlice from "../Pages/Dashboard/Event/Capacity/capacitySlice";
import eventCompanyDetailsSlice from "../Pages/Dashboard/Event/CompanyDetails/companyDetailsSlice";
import eventTermsAndConditionSlice from "../Pages/Dashboard/Event/Terms&Conditions/termsAndVideoSlice";
import eventDiscountSlice from "../Pages/Dashboard/Event/Discount/discountSlice";
import eventCalenderSlice from "../Pages/Dashboard/Event/Calendar/calenderSlice";
import addItemsSlice from "../Pages/Dashboard/Event/AddItems/addItemsSlice";
import addEquipmentsSlices from "../Pages/Dashboard/Event/AddEquipments/addEquipmentsSlices";
import notificationstepPogressCountSlice from "../Common/CommonSlice/notificationstepPogressCountSlice";
import billDetailsSlice from "../component/Notification/Events/BillDetails/billDetailsSlice";
import publishDateAndTimeSlice from "../component/Notification/Events/PublishDateAndTime/publishDateAndTimeSlice";
import selectBusinessSlice from "../component/Notification/Events/SelectBusiness/selectBusinessSlice";
import userSlice from "../component/Notification/Events/User/userSlice";
import languageSlice from "../Common/CommonSlice/languageSlice";
import redeemSlice from "../Pages/Redeem/redeemSlice";

const combineReducer = combineReducers({
  auth: authSlice,
  event: eventSlice,
  eventAboutPlace: eventAboutPlaceSlice,
  eventAddPlace: eventAddPlaceSlice,
  profile: profileSlice,
  invoice: invoiceSlice,
  gallery: gallerySlice,
  booking: bookingSlice,
  notification: notificationSlice,
  stepProgressCount: stepProgressCountSlice,
  notificationstepPogressCount: notificationstepPogressCountSlice,
  addService: addServiceSlice,
  eventPersonalDetails: eventPersonalDetailsSlice,
  eventPhotoAndVideo: eventPhotoAndVideoSlice,
  eventCapacity: eventCapacitySlice,
  eventCompanyDetails: eventCompanyDetailsSlice,
  eventTermsAndCondition: eventTermsAndConditionSlice,
  eventDiscount: eventDiscountSlice,
  eventCalender: eventCalenderSlice,
  addItems: addItemsSlice,
  addEquipments: addEquipmentsSlices,
  billDetails: billDetailsSlice,
  publishDateAndTime: publishDateAndTimeSlice,
  selectBusiness: selectBusinessSlice,
  user: userSlice,
  language: languageSlice,
  redeem: redeemSlice,
});

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(),
});

export default store;
