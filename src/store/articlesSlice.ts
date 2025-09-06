import { articlesArraySchema } from "./../types/Article";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../types/Article";
import { articlesService } from "../services/articles.service";
import { errorHandler } from "../utils/errorHandler";

interface ArticleState {
  entities: Article[] | null;
  errors: string | null;
  isLoading: boolean;
}

const initialState: ArticleState = {
  entities: [],
  errors: null,
  isLoading: false,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action: PayloadAction<Article[] | null>) => {
        state.isLoading = false;
        state.entities = action.payload;
      })
      .addCase(fetchAllArticles.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const fetchAllArticles = createAsyncThunk("articles/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await articlesService.getAll();
    const articlesData = articlesArraySchema.parse(data);
    return articlesData;
  } catch (error: unknown) {
    const errorMsg = errorHandler(error);
    return rejectWithValue(errorMsg);
  }
});

export const articlesReducer = articlesSlice.reducer;
