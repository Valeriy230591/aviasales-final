import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import tabReducer from "./slices/tabSlice";
import ticketReducer from "./slices/ticketSlice";

const store = configureStore({
  reducer: {
    filters: filterReducer,
    tabs: tabReducer,
    tickets: ticketReducer,
  },
});

export default store;
