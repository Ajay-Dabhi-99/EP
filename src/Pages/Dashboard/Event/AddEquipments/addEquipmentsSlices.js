import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { addEventEquipment, deleteEventEquipment, equipmentById, equipmentList, selectEventEquipment } from "../../../../redux/services/eventServices/addEquipmentsServices";

const initialState = {
  equipment: [],
  equipmentsIDState: []
};

export const addEquipment = createAsyncThunk(
  "event/addEquipment",
  async (payload) => {
    return await addEventEquipment(payload);
  }
);

export const equipmentsId = createAsyncThunk(
  "event/equipmentbyid",
  async (id) => {
    return await equipmentById(id);
  }
);

export const selectEquipment = createAsyncThunk(
  "event/selectEquipment",
  async (payload) => {
    return await selectEventEquipment(payload);
  }
);

export const deleteEquipment = createAsyncThunk(
  "event/deleteEquipment",
  async (payload) => {
    return await deleteEventEquipment(payload);
  }
);

export const listOfEquipment = createAsyncThunk(
  "event/equipmentlist",
  async (id) => {
    return await equipmentList(id);
  }
);

const addEquipmentsSlices = createSlice({
  name: "addEquipmentsSlices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEquipment.fulfilled, (state, action) => {
      state.equipment = action?.payload?.data?.Data;
    });
    builder.addCase(equipmentsId.fulfilled, (state, action) => {
      state.equipmentsIDState = action?.payload?.data?.Data;
    });
  },
});
export default addEquipmentsSlices.reducer;


export const selectEquipmentsId = (state) => state.addEquipments.equipmentsIDState;

export const useEquipmentsId = () => {
  const equipmentsIDState = useSelector(selectEquipmentsId);
  return useMemo(() => equipmentsIDState, [equipmentsIDState]);
};