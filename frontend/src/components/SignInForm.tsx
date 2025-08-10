import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "prajwal-medium-comman01";
import axios from "axios";

function SignInForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const { success } = signUpSchema.safeParse({ email, password });
    if (!success) {
      alert("Invalid Inputs, Please try Again");
    }
    try {
      console.log(email, password);
      const res = await axios.post(
        "https://backend.prajwaljadhav051.workers.dev/api/v1/user/signin",
        {
          email,
          password,
        }
      );

      if (res.data.token) {
        const token = res.data.token;
        localStorage.setItem("authToken", token);

        navigate("/dashboard");
        console.log("SignIN Succesful");
      } else {
        alert(res.data.message);
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      alert("Internal Server Error, please try again");
    }
  };
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center  gap-10 h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-4xl">Sign in to an account</h1>
        <h3 className="text-gray-500">
          Don't have an account?{" "}
          <a
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/signup")}
          >
            Sign Up.
          </a>
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="w-full  flex flex-col gap-2 px-16 lg:px-0 lg:w-1/2"
      >
        <h3 className="font-semibold">Email</h3>
        <input
          type="email"
          placeholder="Abc@example.com"
          className="input-box"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <h3 className="font-semibold">Password</h3>
        <input
          type="password"
          className="input-box"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />

        <button className="bg-black text-white p-2 font-semibold cursor-pointer rounded-md hover:text-gray-500 shadow-gray-300">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
