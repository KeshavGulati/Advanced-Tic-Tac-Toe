import React, { useRef } from "react";
import { faXmark, faO } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login: React.FC = () => {

  const navigate = useNavigate();
  const handleLogin = async (username: string | null, 
                      password: string | null) => {
    
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })

      });

      const data = await response.json();

      if (response.ok) {
        const { firstname, lastname, username, email } = data;
        toast.success("Login successful");
        navigate(`/Home/${firstname}/${lastname}/${username}/${email}`);

      } else {
        toast.error(data.message);

      }

    } catch {
      toast.error("Something went wrong. Please try again.");

    }

  }
  
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
	<div className="login-modal 
    bg-[#1f3641] text-white flex flex-col gap-[1px]
    w-[50%] h-[70%]
    justify-evenly items-center
    absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
    border border-transparent rounded-lg
    shadow-xl shadow-gray-900/80
  ">
    <h1 className="text-5xl font-bold underline">Login</h1>
    <div className="icon-div-login">
      <FontAwesomeIcon icon={faXmark} className="x-mark text-4xl"/>
      <FontAwesomeIcon icon={faO} className="text-[#F2B137] text-4xl" />
    </div>
    <form className="
        h-[50%]
        flex flex-col justify-evenly items-center
      ">
      <span className="usernameSpan">
        {/* <label htmlFor="username">Username:</label> */}
        <input type="text" id="username" name="username" required placeholder="Username" className="border rounded-xl w-80 ml-5 p-2" 
        ref={usernameRef}/>
      </span>
      <br />
      <span className="passwordSpan">
        {/* <label htmlFor="password">Password:</label> */}
        <input type="password" id="password" name="password" required placeholder="Password" className="border rounded-xl w-80 ml-5 p-2" 
        ref={passwordRef} />
      </span>
      <br />
      <div className="options-div flex justify-between w-80">
        <div className="remember-me-div flex items-center">
          <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2" />
          <label htmlFor="rememberMe" className="font-light">Remember me</label>
        </div>
        <span className="forgot-password">Forgot Password?</span>
      </div>
      <button
        className="bg-[#31C3BD] text-white w-80 pt-2 pb-2 pl-4 pr-4 rounded-2xl uppercase
        transition-all duration-500 hover:tracking-wider
        hover:cursor-pointer
        "
        onClick={(e) => {
          e.preventDefault();
          handleLogin(usernameRef.current!.value, passwordRef.current!.value);

        }}
      >
        <span className="font-bold">Login</span>
      </button>
      <div className="register-span font-light">
        Don't have an account? <Link to="/Signup" className="font-bold text-[#F2B137] cursor-pointer">Register</Link>.
      </div>
    </form>
	</div>
    )

}

export default Login;
