import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article } from "../types/Article";
import { articlesService } from "../services/articles.service";

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
      });
  },
});

export const fetchAllArticles = createAsyncThunk("articles/fetchAll", async () => {
  const data = await articlesService.getAll();
  return data;
});

export const articlesReducer = articlesSlice.reducer;
