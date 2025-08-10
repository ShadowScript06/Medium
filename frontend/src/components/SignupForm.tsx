import axios from "axios";
import { signUpSchema } from "prajwal-medium-comman01";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignupForm() {
    const navigate=useNavigate();
    const [username,setusername]=useState<string>('');
    const[email,setEmail]=useState<string>('');
    const [password,setPassword]=useState<string>('');


    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const {success}=signUpSchema.safeParse({email,password});
        if(!success){
            alert("Invalid Inputs, Please try Again")
        }
        try {
             console.log(email,password);
             const res=await axios.post('https://backend.prajwaljadhav051.workers.dev/api/v1/user/signup',
                {
                    email,
                    password
                }
             )


             console.log(res.data);
            

             if(res.data.token){
                 const token=res.data.token;
                 localStorage.setItem('authToken',token);
                navigate('/dashboard');
             }else{
                alert(res.data.message);
             }
             
             
             console.log("SignUp Succesful");
        setEmail('');
        setPassword('');
        setusername('');
        } catch (error) {
            console.log(error);
            alert("Internal Server Error, please try again");
        }

       
    }
  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center  gap-10 h-screen">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-4xl">Create an account</h1>
        <h3 className="text-gray-500">
          Already have an account? <a className="cursor-pointer hover:text-black" onClick={()=>navigate('/signin')}>Login</a>
        </h3>
      </div>



      <form onSubmit={handleSubmit} action="" method="post" className="w-full  flex flex-col gap-2 px-16 lg:px-0 lg:w-1/2">
        <h3 className="font-semibold">Username</h3>
        <input type="text" className="input-box" value={username} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setusername(e.target.value)} placeholder="Enter your Username"/>
        <h3 className="font-semibold">Email</h3>
        <input type="email" placeholder="Abc@example.com"  className="input-box"  value={email} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} />
        <h3 className="font-semibold">Password</h3>
        <input type="password" placeholder="Min 6 Characters" className="input-box"   value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />

        <button className="bg-black text-white p-2 font-semibold cursor-pointer rounded-md hover:text-gray-500 shadow-gray-300">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
