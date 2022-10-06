import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice";
import usersReducer from "../features/users/usersSlice";
export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
