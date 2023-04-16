import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    value: [],
  },
  reducers: {
    addPost: (state: any, action) => {
      console.log("AddPost Action");
      state.value.unshift(action?.payload);
    },
    addAllPost: (state: any, action) => {
      console.log("AddPost Action");
      if(state.value.length === 0)
        state.value.push(...action?.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPost, addAllPost } = postSlice.actions;
export const selectPost = (state: any) => state.post.value;
export default postSlice.reducer;