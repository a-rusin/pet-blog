import { CreatedUserSchema, UserCreated, UserRegisterSchemaServerResponce } from "./../types/Auth";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserRegister } from "../types/Auth";
import { authService } from "../services/auth.service";
import { errorHandler } from "../utils/errorHandler";
import { toast } from "react-toastify";

interface AuthState {
  userId: string | null;
  errors: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  userId: null,
  isLoading: false,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = null;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
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
      UserRegisterSchemaServerResponce.parse(data);
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

export const authReducer = authSlice.reducer;
