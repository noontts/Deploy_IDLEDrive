import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navbarUserData, navbarRentalData } from "./navbarData";
import Logo from "../../images/idle-w-light.png";
import { AuthContext } from "../../service/context/AuthContext";
import BASE_URL from '../../service/baseURL'

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = user !== null;
  let userType;

  if (isLoggedIn) {
    userType = user.role;
  }

  return (
    <>
      <div className="navbar bg-white shadow-md sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
            >
              {isLoggedIn && userType === "carRentalOwner"
                ? navbarRentalData.map((menu, index) => (
                    <li key={index}>
                      <NavLink to={menu.path}>{menu.title}</NavLink>
                    </li>
                  ))
                : navbarUserData.map((menu, index) => (
                    <li key={index}>
                      <NavLink to={menu.path}>{menu.title}</NavLink>
                    </li>
                  ))}
            </ul>
          </div>
          {userType === "carRentalOwner" ? (
            <Link to={"/merchant/dashboard"}>
              <img src={Logo} className="object-center h-14"></img>
            </Link>
          ) : (
            <Link to={"/"}>
              <img src={Logo} className="object-center h-14"></img>
            </Link>
          )}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal px-1">
            {isLoggedIn && userType === "carRentalOwner"
              ? navbarRentalData.map((menu, index) => (
                  <li key={index}>
                    <NavLink to={menu.path}
                    className={({ isActive }) =>
                        isActive
                          ? "w-full p-3 font-extrabold text-base text-[#1D4FB1] hover:text-[#1D4FB1]  border-b-2 rounded-none border-blue-700 hover:bg-white  "
                          : "w-full p-3 font-extrabold text-base text-black"
                      }>{menu.title}</NavLink>
                  </li>
                ))
              : navbarUserData.map((menu, index) => (
                  <li key={index}>
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        isActive
                          ? "w-full p-3 font-extrabold text-base text-[#1D4FB1] hover:text-[#1D4FB1]  border-b-2 rounded-none border-blue-700 hover:bg-white"
                          : "w-full p-3 font-extrabold text-base text-black"
                      }
                    >
                      {menu.title}
                    </NavLink>
                  </li>
                ))}
            {/* <li>
              <a>Item 1</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={`${BASE_URL}/api/v1/idledrive/images/${user.profileURL}`} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={`${user.id ? `/editprofile/${user.id}` : `/merchant/editprofile/${user.id_rental}`}`} className="justify-between ">
                  โปรไฟล์
                    <span className="badge">ใหม่</span>
                  </Link>
                </li>
                <li>
                  <Link to={`${user.id ? `/history` : `/merchant/history`}`}>ประวัติ</Link>
                </li>
           
                <li>
                  <a
                    className="bg-red-500 text-white hover:bg-red-400 hover:text-white"
                    onClick={() => {
                      dispatch({ type: "LOGOUT" });
                      navigate(`/`);
                    }}
                  >
                    ออกจากระบบ
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/register" className="btn btn-primary text-white">
                Sign up
              </Link>

              <Link to="/login" className="btn btn-primary text-white">
                Log In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};
