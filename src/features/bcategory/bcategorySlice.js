import { createSlice, createAsyncThunk, createAction} from "@reduxjs/toolkit";
import bCategoryService from "./bcategoryService";

export const getBCategories = createAsyncThunk(
  "blogCategory/get-categories",
  async ( thunkAPI) => {
    try {
      return await bCategoryService.getBCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBCategory = createAsyncThunk(
  "blogCategory/create-category",
  async (bCategoryData, thunkAPI) => {
    try {
      return await bCategoryService.createBCategory(bCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getaBCategory = createAsyncThunk(
  "blogCategory/get-a-category",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getaBCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBCategory = createAsyncThunk(
  "blogCategory/update-category",
  async (bCategory, thunkAPI) => {
    try {
      return await bCategoryService.updateBCategory(bCategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBCategory = createAsyncThunk(
  "blogCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  bcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bCategorySlice = createSlice({
  name: "bcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategories = action.payload;
      })
      .addCase(getBCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBCategory = action.payload;
      })
      .addCase(createBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getaBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bcategoryName = action.payload.title;
      })
      .addCase(getaBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBCategory = action.payload;
      })
      .addCase(updateBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteBCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBCategory = action.payload;
      })
      .addCase(deleteBCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bCategorySlice.reducer;
