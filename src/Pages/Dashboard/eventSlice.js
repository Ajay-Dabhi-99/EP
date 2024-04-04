import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  addCategory,
  additemById,
  additemList,
  createEvent,
  exportAttendees,
  getAllAttendees,
  getAllEvents,
  getCategory,
  getEventByID,
  liveMulti,
  liveOne,
  othercost,
  othercostById,
} from "../../redux/services/eventServices";

const initialState = {
  categoryByType: [],
  allEventList: [],
};

export const getCategoryByType = createAsyncThunk(
  "event/getCategory",
  async (payload) => {
    return await getCategory(payload);
  }
);

export const getAllEventDetails = createAsyncThunk(
  "event/getAllEvents",
  async (payload) => {
    return await getAllEvents(payload);
  }
);

export const liveMultiEvents = createAsyncThunk(
  "event/liveMulti",
  async (payload) => {
    return await liveMulti(payload);
  }
);

export const liveOneEvents = createAsyncThunk(
  "event/liveOne",
  async (payload) => {
    return await liveOne(payload);
  }
);

export const createNewEvent = createAsyncThunk(
  "event/createEvent",
  async (payload) => {
    return await createEvent(payload);
  }
);

export const othercostId = createAsyncThunk(
  "event/othercostbyid",
  async (id) => {
    return await othercostById(id);
  }
);

export const otherCost = createAsyncThunk(
  "event/othercost",
  async (payload) => {
    return await othercost(payload);
  }
);

export const listOfAdditem = createAsyncThunk(
  "event/additemlist",
  async (type) => {
    return await additemList(type);
  }
);

export const additemId = createAsyncThunk(
  "event/additembyid",
  async (id) => {
    return await additemById(id);
  }
);

export const addNewCategory = createAsyncThunk(
  "event/addCategory",
  async (payload) => {
    return await addCategory(payload);
  }
);

export const allAttendeesGet = createAsyncThunk(
  "event/allAttendees",
  async (payload) => {
    return await getAllAttendees(payload);
  }
);

export const exportAttendeeByID = createAsyncThunk(
  "event/exportAttendee",
  async (payload) => {
    return await exportAttendees(payload);
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    RemoveCategoryByType: (state, action) => {
      state.categoryByType = [];
    },
    RemoveEventList: (state, action) => {
      state.allEventList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryByType.fulfilled, (state, action) => {
      state.categoryByType = action?.payload?.data?.Data;
    });
    builder.addCase(getAllEventDetails.fulfilled, (state, action) => {
      state.allEventList = action?.payload?.data?.Data;
    });
    builder.addCase(createNewEvent.fulfilled, (state, action) => {
      localStorage.setItem("displayName", action.payload.data?.Data?.display_name);
    });
  },
});

export default eventSlice.reducer;

export const selectCategory = (state) => state.event.categoryByType;
export const { RemoveCategoryByType, RemoveEventList } = eventSlice.actions;

export const useCategory = () => {
  const categoryByType = useSelector(selectCategory);
  return useMemo(() => categoryByType, [categoryByType]);
};

export const selectEvent = (state) => state.event.allEventList;
export const useEventList = () => {
  const allEventList = useSelector(selectEvent);
  return useMemo(() => allEventList, [allEventList]);
};


