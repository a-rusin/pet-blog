import { ArticleClient, articlesArraySchema, articlesSchemaServer } from "./../types/Article";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleServer } from "../types/Article";
import { articlesService } from "../services/articles.service";
import { errorHandler } from "../utils/errorHandler";
import { authService } from "../services/auth.service";
import { User } from "../types/Auth";

interface ArticleState {
  entities: ArticleClient[] | null;
  errors: string | null;
  isLoading: boolean;
}

const initialState: ArticleState = {
  entities: [],
  errors: null,
  isLoading: true,
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
      .addCase(fetchAllArticles.fulfilled, (state, action: PayloadAction<ArticleClient[] | null>) => {
        state.isLoading = false;
        state.entities = action.payload;
      })
      .addCase(fetchAllArticles.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(createUpdateArticle.fulfilled, (state, action: PayloadAction<ArticleClient>) => {
        const isExist = state.entities?.find((item) => item.id === action.payload.id);
        if (isExist) {
          state.entities =
            state.entities && state.entities.map((item) => (item.id === action.payload.id ? action.payload : item));
        } else {
          state.entities?.push(action.payload);
        }
      });
  },
});

export const fetchAllArticles = createAsyncThunk("articles/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const data = await articlesService.getAll();
    articlesArraySchema.parse(data);

    const articlesWithAuthorsData = (await prepareToClient(data)) as ArticleClient[];

    return articlesWithAuthorsData;
  } catch (error: unknown) {
    const errorMsg = errorHandler(error);
    return rejectWithValue(errorMsg);
  }
});

const prepareToClient = async (
  data: ArticleServer | ArticleServer[] | null
): Promise<ArticleClient | ArticleClient[] | null> => {
  if (Array.isArray(data)) {
    const authorIds = [...new Set<string>(data?.map((item: ArticleServer) => item.author))];

    const authorsResponse = await Promise.all(authorIds.map((authorId) => authService.getUser(authorId)));

    const authorsMap: Record<User["id"], User> = {};
    authorsResponse.forEach((author) => {
      authorsMap[author.id] = author;
    });

    const articlesWithAuthorsData = data?.map((article) => ({
      ...article,
      author: authorsMap[article.author],
    })) as ArticleClient[];

    return articlesWithAuthorsData;
  } else if (typeof data === "object") {
    const authorId = data?.author;
    const authorResponse = await authService.getUser(authorId!);
    const articleWithAuthorData = {
      ...data,
      author: authorResponse,
    } as ArticleClient;
    return articleWithAuthorData;
  }

  return null;
};

export const createUpdateArticle = createAsyncThunk(
  "articles/createUpdate",
  async ({ payload, cb }: { payload: ArticleClient; cb?: () => void }, { rejectWithValue }) => {
    try {
      const serverData: ArticleServer = {
        ...payload,
        author: payload.author.id,
      };
      const data: ArticleServer = await articlesService.createAndUpdate(serverData);
      articlesSchemaServer.parse(data);

      if (cb) cb();

      return payload;
    } catch (error: unknown) {
      const errorMsg = errorHandler(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const articlesReducer = articlesSlice.reducer;
