import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../helpers/apiHelper';

// Define the initial state for posts
const initialState = {
  posts: [],
  status: 'idle',
  error: null
};

// Define the async thunk to fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { response, status } = await get('/posts');
  if (status === 200) {
    return response.data;
  }
  throw Error(response.message);
});

// Create the posts slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    deletePost: (state, action) => {
      // Remove the post from the state by filtering out the post with the deleted post ID
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload.filter((val, i) => i < 10);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

// Define the deletePost action
export const { deletePost } = postsSlice.actions;

// Export the posts reducer
export default postsSlice.reducer;