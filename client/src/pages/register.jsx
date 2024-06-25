import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useCookies } from "react-cookie";
import instance from "../hooks/API.js";

const Register = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState({});
  const [lastLogin, setLastLogin] = useState(null);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    birthday: "",
  });

  useEffect(() => {
    if (cookies.user) {
      setUser(cookies.user);
      setLastLogin(cookies.user.lastLoggedIn);
    }
  }, [cookies]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post("/auth/register", {
        userInfo,
      });
      navigate("/login");
    } catch (error) {
      if (error.response.status === 500) {
        const eMsg = document.querySelector("h2");
        eMsg.textContent = "Please fill out all required fields";
        eMsg.style.color = "red";
        return;
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className='grid place-items-center h-full mt-24'>
      <div className='bg-slate-600 p-5 rounded-lg shadow-lg'>
        <h1 className='text-white text-3xl font-bold text-center pb-5'>
          Login
        </h1>
        <h2></h2>
        <form className='grid grid-cols-1 gap-4' onSubmit={register}>
          <input
            type='text'
            placeholder='Full Name'
            name='name'
            className='p-2 rounded-md shadow-md'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='E-Mail'
            name='email'
            className='p-2 rounded-md shadow-md'
            onChange={handleChange}
          />
          <input
            type='text'
            placeholder='Username'
            name='username'
            className='p-2 rounded-md shadow-md'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            className='p-2 rounded-md shadow-md'
            onChange={handleChange}
          />
          <input
            type='date'
            placeholder='Birthday'
            name='birthday'
            className='p-2 rounded-md shadow-md'
            onChange={handleChange}
          />

          <button
            type='submit'
            className='bg-blue-light p-2 rounded-md shadow-md'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
