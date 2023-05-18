import { ICatagoryIntialState } from "../../modal/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// This is the initial state of the catagory reducer
const catagoryInitialState: ICatagoryIntialState = {
  catagoryLoading: false,
  catagoryData: {
    catagory: [],
  },
  catagoryError: "",
};

// This is the async thunk which is used to fetch the catagory list
export const fetachCatagoryList = createAsyncThunk(
  "catagory/fetch",
  async () => {
    const response = await axios.get(
      "https://646312614dca1a661353d0ee.mockapi.io/api/Category"
    );
    return {
      catagory: response.data,
    };
  }
);

// This is the slice of the catagory reducer
const catagorySlice = createSlice({
  name: "catagory",
  initialState: catagoryInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetachCatagoryList.pending, (state) => {
        return {
          ...state,
          catagoryLoading: true,
        };
      })
      .addCase(fetachCatagoryList.fulfilled, (state, action) => {
        return {
          ...state,
          catagoryData: action.payload,
          catagoryLoading: false,
        };
      })
      .addCase(fetachCatagoryList.rejected, (state) => {
        return {
          ...state,
          catagoryError: "Something went wrong",
          catagoryLoading: false,
        };
      });
  },
});

// This is the reducer of the catagory reducer
export default catagorySlice.reducer;
