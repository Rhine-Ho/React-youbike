import { useState } from "react";
import { close, Logo, menu } from "../assets";
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
              <div className="container mx-auto px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center m-2">
                    <img
                      className="w-24"
                      src={Logo}
                      alt="Logo"
                    /> 
                  </div>

                        <ul className=" sm:flex hidden space-x-4 mr-10">
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
                        
                      <button className="rounded-full px-4 py-2 bg-lime1 text-white hover:bg-lime2 duration-300 ">登入</button>

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
                          } flex-col p-6 bg-lime1 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                        >
                          <ul className="list-none flex justify-end items-start flex-1 flex-col">
                            {navLinks.map((nav, index) => (
                              <li
                                key={nav.id}
                                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                  active === nav.title ? "text-lime2" : "text-white"
                                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={() => setActive(nav.title)}
                              >
                                <a href={`#${nav.id}`}>{nav.title}</a>
                              </li>
                            ))}

                          </ul>
                          <button className="rounded-full px-4 py-2 bg-white text-lime1 hover:bg-lime2 duration-300 ">登入</button>


                        </div>

                    </div>
              </div>
            </nav>

    </>
  );
}

export default Navbar;
