import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../../constants/api";

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface Blog {
  _id: string;
  title: string;
  content: string;
  tags: [string];
  status: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
  __v:number;
}

interface BlogInput {
  title: string;
  content: string;
  tags: string;
}

const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${url}/api/`,
    credentials: "include", // Important if you're using cookies
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "user/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "user/register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "user/logout",
        method: "POST",
      }),
    }),
    myProfile: builder.query<AuthResponse, void>({
      query: () => ({
        url: "user/me",
        method: "GET",
      }),
    }),
    getAllBlogs: builder.query<Blog[], void>({
      query: () => ({
        url: "blogs/",
        method: "GET",
      }),
    }),
    getBlogById: builder.query<Blog, string>({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "GET",
      }),
    }),
    createBlog: builder.mutation<Blog, BlogInput>({
      query: (body) => ({
        url: "blogs/publish",
        method: "POST",
        body,
      }),
    }),
    saveDraft: builder.mutation<Blog, BlogInput>({
      query: (body) => ({
        url: "blogs/save-draft",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useMyProfileQuery,
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useSaveDraftMutation
} = blogApi;

export default blogApi;
