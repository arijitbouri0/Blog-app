import React from "react";
import BlogList from "../component/BlogList";
import CreateBlogForm from "../component/CreateBlog";

const Home: React.FC = () => {
  return (
    <div className="max-w-[1000px] w-full mx-auto flex flex-col md:flex-row-reverse p-2 gap-2">
      <div className="md:sticky md:top-18 md:self-start md:w-2/5 bg-white p-4 space-y-2">
        <h1 className="text-lg font-semibold">Create new Blogs</h1>
        <CreateBlogForm />
      </div>
      <div className="overflow-y-auto md:w-3/5 bg-white p-4 space-y-2">
        <h1 className="text-lg font-semibold">Recent Blogs</h1>
        <BlogList />
      </div>
    </div>
  );
};
export default Home;
