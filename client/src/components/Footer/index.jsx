import React from "react";
import logo from '../../images/idle-w-light.png';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-white border-t-[#D9D9D9] border-t-2"
      style={{boxShadow: "0px -1px 3px 0px rgba(0, 0, 0, 0.05), 0px -6px 6px 0px rgba(0, 0, 0, 0.04), 0px -12px 7px 0px rgba(0, 0, 0, 0.03), 0px -22px 9px 0px rgba(0, 0, 0, 0.01), 0px -34px 10px 0px rgba(0, 0, 0, 0.00)"}}>
        <aside>
          <img src={logo} className="w-60"></img>
          <p>
            IDLE-DRIVE GROUP Ltd.
            <br />
            Providing reliable tech since 2023
          </p>
        </aside>
        <nav>
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#1D4FB1"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#1D4FB1"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#1D4FB1"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <div className="">
          <h3 className="footer-title">Partner</h3>
            <Link to={"/merchant/register"} 
            className="w-full justify-start btn btn-xs sm:btn-sm md:btn-xs lg:btn-md border-none bg-white text-blue-700 hover:bg-blue-700 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            ร่วมเป็นพาร์ทเนอร์กับ IDLE Drive</Link>
            <Link to={"/merchant"} 
            className="w-full justify-start btn btn-xs sm:btn-sm md:btn-xs lg:btn-md border-none bg-white text-blue-700 hover:bg-blue-700 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            เข้าสู่เมนูพาร์ทเนอร์</Link>
   

        </div>
      </footer>
    </>
  );
};

export default Footer;