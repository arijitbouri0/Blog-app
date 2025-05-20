import React, { useEffect } from "react";
import { useGetAllBlogsQuery } from "../redux/api/api";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../redux/reducers/blog";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const BlogList: React.FC = () => {
  const { data, isLoading, error } = useGetAllBlogsQuery();
  const { blogs } = useSelector((state: RootState) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setBlogs(data));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading blogs...", { id: "loading" });
    } else {
      toast.dismiss("loading");
    }

    if (error) {
      toast.error("Error loading blogs");
    }
  }, [isLoading, error]);

  return (
    <div className="bg-white w-full h-[calc(100vh-72px)] p-2">
      {(blogs ?? []).length > 0 ? (
        (blogs ?? []).map((blog) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="block borders p-2 mb-2 rounded hover:bg-gray-100 border border-black"
          >
            <h2 className="text-lg font-semibold text-blue-600 hover:underline">
              {blog.title}
            </h2>
            <p>{blog.content}</p>
            <small>Status: {blog.status}</small>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {blog.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-sm bg-gray-200 text-gray-800 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))
      ) : (
        <div className="w-full text-3xl font-semibold items-center justify-center flex h-full">
          No Blogs
        </div>
      )}
    </div>
  );
};

export default BlogList;
