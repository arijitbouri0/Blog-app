import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../redux/api/api";
import toast from "react-hot-toast";

const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: blog,
    isLoading,
    error,
  } = useGetBlogByIdQuery(id ?? "");

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading blog...", { id: "loadingBlog" });
    } else {
      toast.dismiss("loadingBlog");
    }

    if (error) {
      toast.error("Failed to load blog");
    }
  }, [isLoading, error]);

  if (!blog) return <div className="p-4">Blog not found.</div>;

  return (
    <div className="p-4 w-full max-w-[1000px] bg-white mx-auto h-auto">
      <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
      <small className="text-gray-500 mb-4 block">Status: {blog.status}</small>
      <div className="mb-4 flex flex-wrap gap-2">
        {blog.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p className="whitespace-pre-line">{blog.content}</p>
    </div>
  );
};

export default BlogPage;
