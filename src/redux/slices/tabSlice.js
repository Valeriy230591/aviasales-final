import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabs: [
    { label: "Самый дешевый", name: "cheapest", active: true },
    { label: "Самый быстрый", name: "fastest", active: false },
    { label: "Оптимальный", name: "optimal", active: false },
  ],
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.tabs = state.tabs.map((item) =>
        item.name === action.payload
          ? { ...item, active: true }
          : { ...item, active: false },
      );
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
