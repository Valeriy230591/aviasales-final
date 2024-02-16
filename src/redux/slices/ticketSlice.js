import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchId } from "../serverActions/serverActions";

const initialState = {
  tickets: [],
  id: "",
  isLoading: false,
  errorMessage: "",
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTickets: (state, action) => {
      state.tickets.push(...action.payload);
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    onError(state, action) {
      state.errorMessage = action.payload;
    },
    clearError(state, action) {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchId.fulfilled, (state, action) => {
      state.id = action.payload;
    });
  },
});

export const { addTickets, isLoading, onError, clearError } =
  ticketSlice.actions;
export default ticketSlice.reducer;
