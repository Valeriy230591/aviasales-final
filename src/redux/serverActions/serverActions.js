import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearError,
  onError,
  isLoading,
  addTickets,
} from "../slices/ticketSlice";

export const fetchSearchId = createAsyncThunk(
  "tickets/fetchSearchId",
  async (api) => {
    try {
      const url = `https://aviasales-test-api.kata.academy/search`;
      const res = await fetch(`${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch searchId`);
      }
      const data = await res.json();
      return data.searchId;
    } catch (e) {
      if (e.message === `Could not fetch searchId`) {
        api.dispatch(onError(e.message));
        api.dispatch(clearError());
      }
    }
  },
);
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (id, api) => {
    api.dispatch(isLoading(true));
    try {
      const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${id}`;
      const res = await fetch(`${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch tickets`);
      }
      const data = await res.json();

      if (!data.stop) {
        api.dispatch(addTickets(data.tickets));
        await api.dispatch(fetchTickets(id));
      } else {
        api.dispatch(isLoading(false));
      }
    } catch (e) {
      if (e.message === `Could not fetch tickets`) {
        await api.dispatch(fetchTickets(id));
      }

      return api.rejectWithValue(e.message);
    }
  },
);
