import {
  ADDITEM_BY_ID,
  ADDITEM_LIST,
  ADD_CATEGORY,
  ALL_ATTENDEES,
  CREATE_EVENT,
  EXPORT_ATTENDEES,
  GET_CATEGORY,
  GET_EVENTS,
  GET_ONE_EVENT_BY_ID,
  LIVE_MULTI_EVENTS,
  LIVE_ONE_EVENT,
  OTHERCOST,
  OTHERCOST_BY_ID,
} from "../../api/constApi";
import authHeader from "./authHeader";
import { apiInstance } from "./axiosApi";

export const getCategory = (eventType) => {
  return apiInstance.get(GET_CATEGORY + `${eventType}`, {
    headers: authHeader(),
  });
};

export const getAllEvents = (payload) => {
  return apiInstance.post(GET_EVENTS, payload, { headers: authHeader() });
};

export const liveMulti = (payload) => {
  return apiInstance.post(LIVE_MULTI_EVENTS, payload, {
    headers: authHeader(),
  });
};

export const createEvent = (payload) => {
  return apiInstance.post(CREATE_EVENT, payload, {
    headers: authHeader(),
  });
};

export const liveOne = (payload) => {
  return apiInstance.post(LIVE_ONE_EVENT, payload, {
    headers: authHeader(),
  });
};

export const othercostById = (id) => {
  return apiInstance.get(`${OTHERCOST_BY_ID}${id}`, {
    headers: authHeader(),
  });
};

export const othercost = (payload) => {
  return apiInstance.post(OTHERCOST, payload, {
    headers: authHeader(),
  });
};

export const additemList = (type) => {
  return apiInstance.get(`${ADDITEM_LIST}${type}`, {
    headers: authHeader(),
  });
};

export const additemById = (id) => {
  return apiInstance.get(`${ADDITEM_BY_ID}${id}`, {
    headers: authHeader(),
  });
};

export const addCategory = (payload) => {
  return apiInstance.post(ADD_CATEGORY, payload, {
    headers: authHeader(),
  });
};

export const getAllAttendees = (payload) => {
  return apiInstance.post(ALL_ATTENDEES, payload, {
    headers: authHeader(),
  });
};

export const exportAttendees = (payload) => {
  return apiInstance.post(EXPORT_ATTENDEES, payload, {
    headers: authHeader(),
  });
};

