import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService";

export const getPCategories = createAsyncThunk(
  "productCategory/get-categories",
  async ( thunkAPI) => {
    try {
      return await pCategoryService.getPCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createPCategory = createAsyncThunk(
  "productCategory/create-category",
  async (pCategoryData, thunkAPI) => {
    try {
      return await pCategoryService.createPCategory(pCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getaPCategory = createAsyncThunk(
  "productCategory/get-a-category",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getaPCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePCategory = createAsyncThunk(
  "productCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await pCategoryService.updatePCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePCategory = createAsyncThunk(
  "productCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deletePCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const pCategorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getPCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createPCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdPCategory = action.payload;
      })
      .addCase(createPCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getaPCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getaPCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getaPCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updatePCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deletePCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deletePCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);;
  },
});

export default pCategorySlice.reducer;
