import React, { useContext, useState } from "react";
import { AuthContext } from "../../service/context/AuthContext";
import { loginUser } from "../../service/users";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await loginUser(credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
    }
  };

  return (
    <>
      <div className="text-center mt-10 font-medium text-4xl">
        เข้าสู่ระบบ
        <span className="font-medium text-4xl text-blue-700"> | ผู้ใช้งาน</span>
      </div>

      <div className="login_Container my-5 flex justify-center content-center items-center flex-col w-full h-full">
        <div className="my-10 py-16 bg-white w-1/2 h-full flex flex-col items-center drop-shadow-lg shadow-lg rounded-lg">
          <div className="text-2xl font-bold mb-5 text-blue-700">ล็อกอิน</div>

          <div className="form-control w-full">
            {error && (
              <div className="alert bg-red-500 w-3/5 mx-auto text-white">
                <box-icon name='error-circle' color='#ffffff' ></box-icon>
                <span>Email or Password is Incorrect!</span>
              </div>
            )}
            <label className="label w-full max-w-md mx-auto">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="Type here"
              className="input input-bordered w-full max-w-md mx-auto focus:border-blue-700 focus:outline-none"
              onChange={handleChange}
            />
          </div>

          <div className="form-control w-full">
            <label className="label w-full max-w-md mx-auto">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              id="password"
              className="input input-bordered w-full max-w-md mx-auto focus:border-blue-700 focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <button
            className="btn btn-primary mt-8 bg-blue-700 text-white w-full max-w-md mx-auto hover:bg-sky-400"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-ring loading-xs"></span>
            ) : (
              <span>เข้าสู่ระบบ</span>
            )}
          </button>
          <div className="text-center mt-5">
            <span className="text-xs text-gray-400 font-semibold">
              Don't have account?{" "}
            </span>
            <Link to={'/register'} className="text-xs font-semibold text-blue-700">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
