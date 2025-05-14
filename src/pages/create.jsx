import { Field, Form, Formik } from "formik"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const CreateBlog = () => {
    const [image,setImage] = useState(null);
        const navigate = useNavigate();

      const {user} = useContext(AuthContext);

    const handleImageChange = (event)=>{
       const file = event.target.files[0];
         if(file){
            setImage(file);
         }
    }

    const handleSubmit = async(values)=>{
        console.log(values,image,user);
        const formData = new FormData();
           formData.append("title",values?.title)
           console.log(formData)
           formData.append("content",values?.content);
           if(image) formData.append("image",image);
           formData.append("author",user?._id);

          try {
               await axios.post("https://blog-hqx2.onrender.com/blog/create",formData)
                navigate("/");
          } catch (error) {
            console.log(error)
          }
    }
    
  return (
    <div className=" m-auto  ">
        <Navbar/>
        <Formik
          initialValues={{
             title:"",
             content:"",
          }}
          onSubmit={(values)=>{
            handleSubmit(values);
          }}
        >
            <Form className="w-1/3 mx-auto mt-20 bg-[#dbd4d4] shadow-md rounded px-8 pt-6 pb-10 mb-8 flex flex-col"> 
            <h1 className=" m-auto  flex text-3xl"> Craft Your New post </h1>
                <label  htmlFor="title" className="text-xl mr-4 ">Title</label>
                <Field type="text" name="title" placeholder="enter blog title" className="border-none rounded-md outline decoration-2 outline-[#00af9d]" />
                <label htmlFor="title" className="text-xl mr-4">Content</label>
                <Field type="text" name="content" placeholder="enter blog content" className="border-none rounded-md outline-[#00af9d]" />

                <div className="mt-4">
                    <label htmlFor="Image">Upload blog image</label> <br />
                      <input type="file" name="image" onChange={(event)=>handleImageChange(event)} className="border bg-amber-300" />
                </div>

                <button type="submit" className="p-2 bg-blue-500 rounded-lg text-white mt-10 cursor-pointer">Submit blog</button>
            </Form>





        </Formik>
    </div>
  )
}

export default CreateBlog