import { useState } from "react";
import {  Logo } from "../assets";
import { navLinks } from "../constants";
import { IoIosMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";




function Navbar() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  
  return (
    <>
        {/* border line #EBEBEB 1px.          *shadow is prettier */}
            <nav className="w-auto bg-white border-b border-linecolor">
              <div className="container mx-auto px-4 py-2 flex items-center justify-between ">
                  <div className="flex items-center m-2">
                    <img
                      className="w-24"
                      src={Logo}
                      alt="Logo"
                    /> 
                  </div>
                    <div className="sm:flex hidden mr-56">
                          <ul className="flex space-x-4">
                            {navLinks.map((nav, index) => (
                              <li
                                key={nav.id}
                                className={`transition duration-300 ${
                                  active === nav.title ? "text-lime1" : "text-lime2"
                                } ${index === navLinks.length - 1 ? "mr-1" : "mr-0"}`}
                                onClick={() => setActive(nav.title)}
                              >
                                <a href={`#${nav.id}`}>{nav.title}</a>
                              </li>
                            ))}

                          </ul>
                        </div>
                        <div className="sm:flex hidden ml-56">
                          <button className="rounded-full px-4 py-2 bg-lime1 text-white hover:bg-lime2 duration-300 ">登入</button>
                        </div>

                        

                    <div className="sm:hidden flex flex-1 justify-end items-center">

                            {toggle ? (
                                <IoCloseOutline
                                  alt="close"
                                  className="text-lime1 w-[28px] h-[28px] object-contain"
                                  onClick={() => setToggle(!toggle)}
                                />
                              ) : (
                                <IoIosMenu
                                  alt="menu"
                                  className="text-lime1 w-[28px] h-[28px] object-contain"
                                  onClick={() => setToggle(!toggle)}
                                />
                              )}
                        <div
                          className={`${
                            !toggle ? "hidden" : "flex"
                          } z-10 flex-col bg-lime1 absolute p-10 top-16 left-0 w-full h-full justify-between`}
                        >
                          <ul className="list-none flex flex-col ml-8 tracking-widest">
                            {navLinks.map((nav, index) => (
                              <li
                                key={nav.id}
                                className={`cursor-pointer text-[20px] ${
                                  active === nav.title ? "text-lime2" : "text-white"
                                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={() => setActive(nav.title)}
                              >
                                <a href={`#${nav.id}`}>{nav.title}</a>
                              </li>
                            ))}

                          </ul>
                          <div className="ml-8">
                            <button className="rounded-full w-20 px-4 py-2 bg-white text-lime1 hover:bg-lime2 duration-300 ">登入</button>
                          </div>
                        </div>

                    </div>
              </div>
            </nav>
    </>
  );
}

export default Navbar;
