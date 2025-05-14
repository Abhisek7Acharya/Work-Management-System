import React from "react";

import Register from "./pages/Register";
import Signin from "./pages/Signin"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./pages/home";
import Blog from "./pages/Blog";
import Navbar from "./pages/Navbar";
import { FaBeer } from 'react-icons/fa'
import { MdHome } from 'react-icons/md'
import { BsFillAlarmFill } from 'react-icons/bs'
import SingleBlogpage from "./pages/SingleBlogpage";
import CreateBlog from "./pages/create";
import EditBlogs from "./pages/editblog";



function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/Blog" element={<Blog/>} />
          {/* <Route path={`/singleblogs/${Blog._id}`} element={<Blog/>} /> */}
         <Route path="/create" element={<CreateBlog/>} />
        <Route path="/singleblogs/:id" element={<SingleBlogpage/>} />
          <Route path="/Editblog" element={<EditBlogs/>} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
