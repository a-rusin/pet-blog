import { CreatedUserSchema, UserCreated, UserLogin, UserSchemaServerResponce } from "./../types/Auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegister } from "../types/Auth";
import { authService } from "../services/auth.service";
import { errorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";

interface AuthState {
  user: UserCreated | null;
  errors: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      .addCase(login.fulfilled, (state, action: PayloadAction<UserCreated>) => {
        state.user = action.payload;
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
  },
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ payload, onSuccess }: { payload: UserRegister; onSuccess: () => void }, { rejectWithValue }) => {
    try {
      const data = await authService.register(payload);
      UserSchemaServerResponce.parse(data);
      const { password, ...userWithourPassword } = payload;

      const newUser: UserCreated = {
        id: data.localId,
        ...userWithourPassword,
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
  async ({ payload, onSuccess }: { payload: UserLogin; onSuccess: () => void }, { rejectWithValue }) => {
    try {
      const data = await authService.login(payload);
      UserSchemaServerResponce.parse(data);

      const userInfo = await authService.getUser(data.localId);
      CreatedUserSchema.parse(userInfo);

      onSuccess();
      toast.success("Successful login");

      return userInfo;
    } catch (error: unknown) {
      const errorMsg = errorHandler(error);
      return rejectWithValue(errorMsg);
    }
  }
);

export const authReducer = authSlice.reducer;
