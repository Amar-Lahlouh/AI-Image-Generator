import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, MyImages, Profile, Signup } from "./pages";
function Route1() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/myimages" element={<MyImages />} />
    </Routes>
  );
}

export default Route1;
