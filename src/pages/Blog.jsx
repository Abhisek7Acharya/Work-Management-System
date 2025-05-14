import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://blog-hqx2.onrender.com/blog")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    
    return <p className="text-center mt-10 text-lg">Loading blogs...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Discover Blog Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              to={`/singleblogs/${blog._id}`}
              key={blog._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-2">
                  {blog.content.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-500">
                  By:{" "}
                  <span className="text-green-600">
                    {blog.author?.name || "Unknown"}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogList;
