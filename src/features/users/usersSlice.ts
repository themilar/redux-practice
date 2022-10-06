import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const initialState = [
  { id: "0", name: "Dude Lebowski" },
  { id: "1", name: "Neil Young" },
  { id: "2", name: "Dave Gray" },
];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios(USERS_URL);
  return response.data;
});
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
interface UserState {
  users: { id: string; name: string }[];
}
export const selectAllUsers = (state: UserState) => state.users;

export default usersSlice.reducer;
