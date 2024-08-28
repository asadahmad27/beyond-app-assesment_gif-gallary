import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GiphyFetch } from "@giphy/js-fetch-api";

const gf = new GiphyFetch("aQn2gKVZdUXVOuFFNvmQcN9yZscbyJO4");

// Async thunk to fetch GIFs from Giphy API
export const fetchGifs = createAsyncThunk(
  "gifs/fetchGifs",
  async (_, { getState }) => {
    const { gif } = getState();
    const response = await gf.trending({ limit: 9, offset: gif.offset });
    return { data: response.data, offset: gif.offset + 9 };
  }
);

const initialState = {
  gifs: [],
  offset: 0,
  status: "idle",
  error: null,
};

export const gifSlice = createSlice({
  name: "gif",
  initialState,
  reducers: {
    updateGifs: (state, action) => {
      state.gifs = state.gifs.concat(action.payload);
    },
    updateOffset: (state, action) => {
      state.offset = state.offset + action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGifs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGifs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gifs = state.gifs.concat(action.payload.data);
        state.offset = action.payload.offset;
      })
      .addCase(fetchGifs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectGifById = (state, gifId) => {
  console.log(state, gifId);
  return state.gif.gifs.find((gif) => gif.id === gifId);
};
//   state.gif.gifs.find((gif) => gif.id === gifId);

// Action creators are generated for each case reducer function
export const { updateGifs, updateOffset } = gifSlice.actions;

export default gifSlice.reducer;
