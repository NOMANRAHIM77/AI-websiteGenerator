//signup.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchemas } from "../schemas/SignupSchemas";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, setUserDetails, userDetails } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchemas),
  });

  async function submit(data) {
    try {
      const cred = await signup(data.email, data.password);
      const user = cred.user;

      // Save extra user details in context
      setUserDetails({
        firstName: data.firstname,
        surName: data.surname,
        email: data.email,
        gender: data.gender,
        dateOfBirth: `${data.date}-${data.month}-${data.year}`,
      });

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    console.log("User Details:", userDetails);
  }, [userDetails]);

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] px-4">
      <h1 className="text-[40px] text-red-600 font-bold ">Pitch Craft</h1>

  <form   onSubmit={handleSubmit(submit)} >
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Create a new account</h2>
        <p className="text-center text-gray-600 text-sm mb-4">Get started with startup</p>
        <hr className="mb-4" />

        {/* First and Last Name */}
      
        <div className="flex gap-3 mb-3">
         <div  className='flex flex-col gap-2 w-auto' >
           <input
          {...register("firstname")}
            type="text"
            placeholder="First name"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div  className="h-1 w-full" >{errors.firstname && <p className="h-full w-full flex justify-items-start items-center  text-red-500 " >{errors.firstname.message}</p>}</div>
         </div>
         <div  className='flex flex-col gap-2 w-auto' >
           <input
           {...register("surname")}
            type="text"
            placeholder="Surname"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
            <div  className="h-1 w-full" > <p className="h-full w-full flex justify-items-start items-center  text-red-500 " ></p></div>
         </div>
        </div>

        {/* Date of Birth */}
        <label className="text-xs text-gray-600 font-medium mb-1 block">Date of birth</label>
        <div className="flex gap-3 mb-6">
          <select   {...register("date")}  className="w-1/3 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none">
                  {Array.from({ length: 31 }, (v, i) => (
                 <option key={i + 1}>{i + 1}</option>
                                 ))}
          </select>
          <select   {...register("month")} className="w-1/3 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none">
            {[
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ].map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <select    {...register("year")} className="w-1/3 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none">
              {Array.from({ length: 80 }, (v, i) => (
                 <option key={i + 1}>{i + 1946}</option>
                                 ))}
          </select>
        </div>

        {/* Gender */}
        <label className="text-xs text-gray-600 font-medium mb-1 block">Gender</label>
        <div className="flex gap-3 mb-3">
          {['Female', 'Male', 'Custom'].map((label) => (
            <label
              key={label}
              className="flex items-center w-1/3 border border-gray-300 rounded px-2 py-2 text-sm cursor-pointer"
            >
              <span className="flex-1">{label}</span>
              <input type="radio"  value={label.toLowerCase()} name="gender" {...register("gender")} className="ml-2" />
            </label>
          ))}
        </div>
          <div  className="h-12 w-full" >{errors.gender && <p className="h-full  w-full flex justify-items-start items-center font-1xl text-red-500 " >{errors.gender.message}</p>}</div>
         
        {/* Email and Password */}
        <input
        {...register("email")}
          type="text"
          placeholder="Mobile number or email address"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
 <div  className="h-4 w-full" >{errors.email && <p className="h-full w-full flex justify-items-start items-center font-1xl text-red-500 " >{errors.email.message}</p>}</div>
        <input
        {...register("password")}
          type="password"
          placeholder="New password"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
 <div  className="h-4 w-full" >{errors.password && <p className="h-full w-full flex justify-items-start items-center font-1xl text-red-500 " >{errors.password.message}</p>}</div>
        {/* Info Text */}
        <p className="text-[11px] text-gray-500 mb-2">
          People who use our service may have uploaded your contact information to PitchCraft. <a href="#" className="text-blue-600 hover:underline">Learn more.</a>
        </p>

        <p className="text-[11px] text-gray-500 mb-4">
          By clicking Sign Up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a>,
          <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a> and
          <a href="#" className="text-blue-600 hover:underline"> Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.
        </p>

        {/* Sign Up Button */}
        <input value="signup" type='submit' className="w-full bg-red-500 hover:bg-red-900 text-white font-bold py-2 rounded text-lg"/>
        
       
      </div>
      </form>

      {/* Already have an account */}
      <Link  to="/" className="mt-4 text-blue-600 text-sm font-medium hover:underline cursor-pointer">
        Already have an account?
      </Link>
    </div>
  );
};

export default Signup;
