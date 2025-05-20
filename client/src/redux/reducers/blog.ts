import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Blog {
  _id: string;
  title: string;
  content: string;
  tags: [string];
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}

interface initialstate {
  blogs: Blog[] | null;
}

const initialState: initialstate = {
  blogs: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs: (state, action: PayloadAction<Blog[]>) => {
      const existingIds = new Set((state.blogs ?? []).map((blog) => blog._id));
      const newBlogs = action.payload.filter(
        (blog) => !existingIds.has(blog._id)
      );
      state.blogs = [...newBlogs, ...(state.blogs ?? [])];
    },
  },
});

export default blogSlice;
export const { setBlogs } = blogSlice.actions;
