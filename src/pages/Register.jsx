import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formdata = [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ];

  const postformdata = async (values) => {
    try {
      const response = await axios.post("https://blog-hqx2.onrender.com/user/register", values);
      toast.success("Registration successful");

      const token = response.data.token;
      const user = response.data.user;

      console.log(token, "this is token from register page");
      console.log(user, "this is user from register page");

      login(token, user); 
      navigate("/"); 
    } catch (error) {
      toast.error("Registration failed");
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Error registering:", errorMessage);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        })}
        onSubmit={(values) => {
          postformdata(values);
        }}
      >
        <Form className="w-1/2 mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center text-red-700 text-2xl mb-6">
            Welcome to Sign Up Page
          </div>

          {formdata.map((value, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={value.name}
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {value.label}
              </label>
              <Field
                name={value.name}
                type={value.type}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder={value.label}
              />
              <ErrorMessage
                name={value.name}
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>

          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-700">Already have an account?</span>
            <Link to="/signin" className="text-blue-500 hover:text-blue-800 font-bold">
              Sign In
            </Link>
          </div>
        </Form>
      </Formik>

      <ToastContainer /> {/* ✅ required for toast messages */}
    </div>
  );
};

export default Register;
