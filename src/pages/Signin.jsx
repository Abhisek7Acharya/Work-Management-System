import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
const Signin = () => {
  const { login } = useContext(AuthContext); // ✅ Access login from context
  const navigate = useNavigate();

  const formdata = [
    { label: "Email", name: "email", type: "email" },
    { label: "Password", name: "password", type: "password" },
  ];

  const loginuser = async (values) => {
    try {
      const response = await axios.post("https://blog-hqx2.onrender.com/user/login", values);

      const token = response.data.token;
      const user = response.data.user;

      // ✅ Save token and user using AuthContext login()
      login(token, user);

      // ✅ Navigate to blog page
      navigate("/Blog");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (

    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(3, "Password must be at least 3 characters")
            .required("Password is required"),
        })}
        onSubmit={(values) => loginuser(values)}

      >
        <Form className="w-1/2 mx-auto mt-10 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <div className="flex  flex-wrap justify-center mx-auto text-red-700 text-2xl">
            Welcome Back{" "}
          </div>
          {formdata.map((value, index) => {
            return (
              <div key={index} className="mb-4">
                <label
                  htmlFor={value.name}
                  className="block  flex-wrap text-gray-700 text-sm font-bold mb-2 "
                >
                  {value.label}
                </label>
                <Field
                  name={value.name}
                  type={value.type}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-wrap cursor-pointer"
                  placeholder={value.label}
                />
                <ErrorMessage
                  name={value.name}
                  component="div"
                  className="text-red-500 text-xs italic"
                />
               
              </div>
            );
          })}
          <div>
            <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4 cursor-pointer">
              Sign In
            </button>
          </div>
           <div>
                
                Don't have  an account <button className="text-red-700 "><Link to="/register" className="text-red">Register</Link> </button>
              </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signin;
