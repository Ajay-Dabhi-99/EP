/* AUTH */
export const LOGIN = "/organizer/login";
export const LOGOUT = "/api/logout";
export const FORGET_PASSWORD = "/organizer/register/forgotpassword";
export const NEW_PASSWORD = "/organizer/register/changepassword";
export const OTP = "/organizer/register/verifyotp";
export const RESEND_OTP = "/organizer/register/forgotpassword";
export const REGISTER = "/organizer/register";

/* LANDING PAGE */

export const GET_IN_TOUCH = "/landing/getintouch";

/* PROFILE */
export const PROFILE = "/organizer/profile";
export const PROFILE_PIC = "/organizer/profile/profilepic";
export const BUSINESS_PROFILE = "/organizer/profile/businessprofile";
export const BUSINESS_PROFILE_PIC = "/organizer/profile/businessprofilepic";

/* DASHBOARD EVENT */
export const GET_CATEGORY = "/organizer/events/listcategory?event_type=";
export const GET_EVENTS = "/organizer/events/list";
export const LIVE_MULTI_EVENTS = "/organizer/events/livemulti";
export const CREATE_EVENT = "/organizer/events/save";
export const LIVE_ONE_EVENT = "/organizer/events/liveone";
export const ALL_ATTENDEES = "/organizer/events/attendees";
export const EXPORT_ATTENDEES = "/organizer/events/attendees/export";

/* DASHBOARD ADD NEW CATEGORY */
export const ADD_CATEGORY = "/organizer/events/addcategory";

/* DASHBOARD EVENT - ADD PLACES */
export const ADD_PLACES_EVENT = "/organizer/events?eventid=";
export const REMOVE_PLACES_EVENT = "/organizer/events/remove";

/* DASHBOARD EVENT - ABOUT PLACES */
export const ABOUT_PLACES_PHOTOUPLOAD = "/organizer/events/banner";
export const ABOUT_PLACES_EVENT = "/organizer/events/aboutplace";
export const ABOUT_PLACES_BY_ID = "/organizer/events/aboutplace?eventid=";

/* DASHBOARD EVENT - PERSONAL DETAIL */
export const PERSONAL_DETAIL_ID = "/organizer/events/personaldetail?eventid=";
export const PERSONAL_DETAIL_EVENT = "/organizer/events/personaldetail";

/* DASHBOARD EVENT - PHOTOS && VIDEOS */
export const MEDIA_BY_ID = "/organizer/events/media?eventid=";
export const PHOTOS_UPLOAD = "/organizer/events/image";
export const VIDEOS_UPLOAD = "/organizer/events/video";
export const MEDIA = "/organizer/events/media";

/* DASHBOARD EVENT - CAPACITY */
export const CAPACITY_BY_ID = "/organizer/events/capacity?eventid=";
export const CAPACITY = "/organizer/events/capacity";

/* DASHBOARD EVENT - COMPANY-DETAILS */
export const COMPANYDETAIL_BY_ID = "/organizer/events/companydetail?eventid=";
export const PDF_UPLOAD = "/organizer/events/document";
export const IMG_UPLOAD = "/organizer/events/image";
export const VIDEO_UPLOAD = "/organizer/events/video";
export const COMPANY_DETAIL = "/organizer/events/companydetail";

/* DASHBOARD EVENT - TERMS & CONDITION */
export const TANDC_BY_ID = "/organizer/events/tandc?eventid=";
export const TANDCS = "/organizer/events/tandc";

/* DASHBOARD EVENT - DISCOUNT */
export const DISCOUNT_LIST = "/organizer/discount/list";
export const DISCOUNT_BY_ID = "/organizer/events/discount?eventid=";
export const DISCOUNT = "/organizer/events/discount";
export const GETSELECTSERVICE_BY_ID =
  "/organizer/events/discount/getselectservice?eventid=";
export const GET_SELECT_SERVICE_DISCOUNT =
  "/organizer/events/getselectservice?eventid=";

/* DASHBOARD EVENT - CALENDER */
export const GET_ONE_EVENT_BY_ID = "/organizer/events/getone?eventid=";
export const CALENDER_ID = "/organizer/events/calendar"

/* DASHBOARD EVENT - ADD SERVICE */
export const ADD_SERVICE = "/organizer/events/addservice";
export const DELETE_SERVICE = "/organizer/events/removeservice";
export const SELECT_SERVICE = "/organizer/events/selectservice";
export const LISTSERVICE = "/organizer/events/listservice?eventType=";
export const GETSELECTSERVICE = "/organizer/events/getselectservice?eventid=";

/* DASHBOARD EVENT - ADD ITEMS */
export const ADD_ITEM = "/organizer/events/additem";
export const SELECT_ITEM = "/organizer/events/selectitem";
export const DELETE_ITEM = "/organizer/events/removeitem";

/* DASHBOARD EVENT - ADD EQUIPMENT */
export const ADD_EQUIPMENT = "/organizer/events/addequipment";
export const SELECT_EQUIPMENT = "/organizer/events/selectequipment";
export const DELETE_EQUIPMENT = "/organizer/events/removeequipment";

/* DASHBOARD EVENT - PSB  */
export const EQUIPMENT_LIST = "/organizer/events/listequipment?eventType=";
export const EQUIPMENT_BY_ID = "/organizer/events/getselectequipment?eventid=";
export const OTHERCOST_BY_ID = "/organizer/events/othercost?eventid=";
export const OTHERCOST = "/organizer/events/othercost";

/* DASHBOARD EVENT -  ADDITEM */
export const ADDITEM_LIST = "/organizer/events/listitem?eventType=";
export const ADDITEM_BY_ID = "/organizer/events/getselectitem?eventid=";
export const SELECT_ITEM_EVENTS = "/organizer/events/selectitem";

/* BOOKING */
export const BOOKING = "/organizer/booking/list";

/* INVOICE */
export const INVOICE = "/organizer/invoice/list";
export const GET_ONE_INVOICE = "/organizer/invoice/getone";

/* ENTERTAINMENT */
export const GALLERY = "/organizer/gallery";
export const GALLERY_MYPOST = "/organizer/gallery/mypost"
export const ALL_COMMENT = "/organizer/gallery/allcomments"
export const SEND_COMMENT = "/organizer/gallery/comment"

/* NOTIFICATION */
export const NOTIFICATION = "/organizer/notification";
export const PHOTOUPLOAD = "/organizer/events/banner";
export const CREATE_NOTIFICATION = "/organizer/notification/save";
export const NOTIFICATION_SETTING = "/organizer/notification/setting";
export const GETONE_NOTIFICATION = "/organizer/notification/getone";
export const NOTIFICATION_SETSCHEDULE = "/organizer/notification/setschedule";
export const SELECT_USER = "/organizer/notification/selectusers";
export const NOTIFICATION_COUPON_LIST = "/organizer/notificationcoupons/list";
export const SELECT_BUSINESS = "/organizer/notification/selectusertype";
export const PAY_NOW = "/organizer/notification/paynow";

/* REFER TO EARN */
export const REDEEM = "/organizer/redeem/history"

/* GLOBAL SEARCH */
export const SEARCH = "/organizer/search"

/* PINCODE */
export const PINCODEMATCH = "https://api.postalpincode.in/pincode/"