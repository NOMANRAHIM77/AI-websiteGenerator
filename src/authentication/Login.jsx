import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemas } from '../schemas/LoginSchemas';
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchemas),
  });

  async function submit(data) {
    try {
      await login(data.email, data.password);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
   <form onSubmit={handleSubmit(submit)}>
  <div className="w-screen min-h-screen bg-[#F2F4F7] flex justify-center items-center px-4">
    
    {/* Main container */}
    <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-center gap-10">
      
      {/* Left text section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-2 text-red-700 font-bold">
          PITCH CRAFT
        </h1>
        <h2 className="text-xl sm:text-2xl lg:text-3xl">
          Generate creative startup names & taglines
        </h2>
      </div>

      {/* Right form card */}
      <div className="w-full sm:w-[400px] bg-white shadow-lg flex flex-col justify-center rounded-md gap-5 p-6">
        
        <div className="flex flex-col w-full items-center gap-4">
          
          {/* Email */}
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            className="w-full border border-gray-400 px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm self-start">
            {errors.email?.message}
          </p>

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 px-3 py-2 rounded-md"
          />
          <p className="text-red-500 text-sm self-start">
            {errors.password?.message}
          </p>

          {/* Login button */}
          <button
            type="submit"
            className="w-full h-12 bg-red-600 hover:bg-red-800 text-white font-semibold rounded-md"
          >
            Log in
          </button>

          <hr className="w-3/4 mx-auto border-gray-300 my-2" />

          {/* Signup link */}
          <Link
            to="/signup"
            className="w-full h-12 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md flex justify-center items-center"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  </div>
</form>

  );
}

export default Login;
