import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import { useMyProfileQuery } from "./redux/api/api";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import BlogPage from "./page/Bloge";
import AllBlogs from "./page/AllBlogs";
import Layout from "./component/Layout";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError } = useMyProfileQuery();
  useEffect(() => {
    if (isSuccess && data && data.user) {
      dispatch(userExist(data?.user));
    }
    if (isError) {
      dispatch(userNotExist());
    }
  }, [dispatch, data, isSuccess, isError]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/blogs" element={<AllBlogs />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
