import { CreatedUserSchema, User, UserLogin, UserSchemaServerResponce, UserServerResponce } from "./../types/Auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegister } from "../types/Auth";
import { authService } from "../services/auth.service";
import { errorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";
import { localStorageService } from "../services/localStorage.service";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_EXPIRES_IN_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
  LOCAL_STORAGE_USER_ID,
  USER_DEFAULT_AVATAR_IMAGE_URL,
} from "../consts/auth";

interface AuthState {
  user: User | null;
  errors: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.errors = null;
      state.isLoading = false;
    },
    resetAuthLoading(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errors = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const setAuthLocalStorage = (data: UserServerResponce) => {
  localStorageService.set(LOCAL_STORAGE_USER_ID, data.localId);
  localStorageService.set(LOCAL_STORAGE_ACCESS_TOKEN, data.idToken);
  localStorageService.set(LOCAL_STORAGE_REFRESH_TOKEN, data.refreshToken);
  localStorageService.set(LOCAL_STORAGE_EXPIRES_IN_TOKEN, data.expiresIn);
};

export const clearAuthLocalStorage = () => {
  localStorageService.remove(LOCAL_STORAGE_USER_ID);
  localStorageService.remove(LOCAL_STORAGE_ACCESS_TOKEN);
  localStorageService.remove(LOCAL_STORAGE_REFRESH_TOKEN);
  localStorageService.remove(LOCAL_STORAGE_EXPIRES_IN_TOKEN);
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ payload, onSuccess }: { payload: UserRegister; onSuccess: () => void }, { rejectWithValue }) => {
    try {
      const data = await authService.register(payload);
      UserSchemaServerResponce.parse(data);
      const { password, ...userWithourPassword } = payload;

      const newUser: User = {
        id: data.localId,
        ...userWithourPassword,
        avatarUrl: USER_DEFAULT_AVATAR_IMAGE_URL,
      };
      const createdUser = await authService.createUser(newUser);
      CreatedUserSchema.parse(createdUser);

      onSuccess();
      toast.success("Successful registration");

      return createdUser;
    } catch (error: unknown) {
      const errorMsg = errorHandler(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ payload, onSuccess }: { payload: UserLogin; onSuccess: () => void }, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.login(payload);
      UserSchemaServerResponce.parse(data);

      await dispatch(getUser(data.localId));

      setAuthLocalStorage(data);

      onSuccess();
      toast.success("Successful login");

      return data;
    } catch (error: unknown) {
      const errorMsg = errorHandler(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId: UserServerResponce["localId"], { rejectWithValue }) => {
    try {
      const userInfo = await authService.getUser(userId);
      CreatedUserSchema.parse(userInfo);

      return userInfo;
    } catch (error: unknown) {
      clearAuthLocalStorage();
      const errorMsg = errorHandler(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const authReducer = authSlice.reducer;
export const { logout, resetAuthLoading } = authSlice.actions;
