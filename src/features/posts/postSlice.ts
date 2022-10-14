import {
  createAsyncThunk,
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import sub from "date-fns/sub";
import { RootState } from "../../app/store";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const postsAdapter = createEntityAdapter({
  sortComparer: (a: Posts, b: Posts) => b.date.localeCompare(a.date),
});
const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: "",
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios(POSTS_URL);
  return response.data;
});
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPostData: { title: string; body: string; userId: number }) => {
    const response = await axios.post(POSTS_URL, newPostData);
    return response.data;
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost: {
    title: string | undefined;
    body: string | undefined;
    userId: number | undefined;
    id: number;
    reactions: {
      thumbsUp: number;
      wow: number;
      heart: number;
      rocket: number;
      coffee: number;
    };
  }) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err: any) {
      // console.error(err);
      return initialPost; //to work with placeholder api
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost: { id: number }) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err: any) {
      return err.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction }: { postId: string; reaction: string } =
        action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[
          reaction as keyof typeof existingPost.reactions
        ]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post: Posts) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message!;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        // const sortedPosts = state.posts.sort((a, b) => {
        //   if (a.id > b.id) return 1;
        //   if (a.id < b.id) return -1;
        //   return 0;
        // });
        // action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDss

        // action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("update couldnt be completed");
          console.log();
          return;
        }
        action.payload.date = new Date().toISOString();
        // action.payload.userId = Number(action.payload.userId);
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export interface Posts {
  id: number;
  title: string;
  body: string;
  userId: number;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}
export interface PostsState {
  posts: Posts[];
  error: string | undefined;
  status: string;
}
export const { reactionAdded } = postSlice.actions;
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts);

export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post: Posts) => post.userId === userId)
);
export default postSlice.reducer;
