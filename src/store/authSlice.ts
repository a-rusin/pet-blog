import { CreatedUserSchema, UserCreated, UserRegisterSchemaServerResponce } from "./../types/Auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRegister } from "../types/Auth";
import { authService } from "../services/auth.service";

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
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const register = createAsyncThunk("auth/register", async (payload: UserRegister) => {
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

    return CreatedUserSchema;
  } catch (error) {}
});

export const createUser = createAsyncThunk("auth/createUser", async () => {});

export const authReducer = authSlice.reducer;
