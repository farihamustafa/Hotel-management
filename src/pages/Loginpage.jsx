import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { apiService } from "../services/apiservice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {


  //   const fetchData = async () => {
//     try {
//       const result = await apiService.getData('/products');  // Replace with your API endpoint
//       setData(result);
//       console.log(result)
//     } catch (err) {
//       setError('Error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

const router = useNavigate();

  return (
    <div className="flex min-h-screen">
       <Toaster position="top-center"  reverseOrder={false} />
      <div className="hidden md:flex md:w-3/5 bg-gray-200">
        <img
          src="/assets/img/hotelimage.jpg"
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center md:w-2/5 w-full p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-primary mb-2 text-center">
            Welcome To Hotel Management
          </h1>
          <h2 className="text-sm text-gray-600 mb-6 text-center">
            Please sign in to your account
          </h2>
          <Formik
          initialValues={{
            email: "", password:""
          }}
          validationSchema={Yup.object({
            email: Yup.string().required(),
            password: Yup.string().required(),
          })}

          onSubmit={async (values)=>{
            try {
                    const result = await apiService.postData('/auth/admin/login',values);
                    toast.success("Login successfully")
                    localStorage.setItem('token',result.token)
                    setTimeout( () => {
                      window.location.href = '/'
                      }, 2000);
                  } catch (err) {
                    console.log(err.response.data.message)
                    toast.error(err.response.data.message || 'Network Error');
                  } finally {
                   
                  }
          }}
          >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <Field
                name="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>

            {/* <div className="flex justify-between items-center mb-6">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
            </div> */}

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
            >
              Login
            </button>
          </Form>
          </Formik>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
