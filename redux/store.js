import { configureStore } from "@reduxjs/toolkit";
import gifReducer from "./gifSlice";

export const store = configureStore({
  reducer: {
    gif: gifReducer,
  },
});
