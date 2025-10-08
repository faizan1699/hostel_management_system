"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/errorMessage"
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (data) => {
    console.log("Form Data:", formData);
  };
  const callApi = async () => {
    try {
      const res = await axios.get("api/server");
      console.log(server)
    }
    catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    callApi();
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      {...register("email", { required: true })}
                      onChange={handleChange}
                      autoComplete="off"
                      id="email"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    <ErrorMessage error={errors.email} />
                  </div>
                  <div className="relative">
                    <input
                      {...register("password", { required: true })}
                      onChange={handleChange}

                      autoComplete="off"
                      id="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    <ErrorMessage error={errors.password} />
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full"
                    >
                      Submit
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
