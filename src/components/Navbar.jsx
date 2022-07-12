import React, { useContext, Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import logo from "../images/ocitywhite-03.png";

const Navbar = () => {
  const [arrow, setArrow] = useState(false);
  const [greeting, setGreeeting] = useState(true);
  const { currentUser, dispatch } = useContext(AuthContext);

  let navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGOUT" });
      // await logOut();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const classNames = (...classes) => classes.filter(Boolean).join(" ");
  useEffect(() => {
    setTimeout(() => {
      setGreeeting(false);
    }, 40000);
  }, []);

  const randomGreeting = ["Hello", "Bienvenue", "Salut", "Welcome"];
  const i = Math.floor(randomGreeting.length * Math.random());

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-gray-900 to-green-900">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden sm:hidden ">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center md:items-stretch sm:items-stretch md:justify-start sm:justify-start">
                <Link className="flex-shrink-0 flex items-center" to="/">
                  <img
                    className="hidden lg:block h-12 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                </Link>
                <div className="hidden md:block md:ml-6 sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      className="bg-gray-900 text-white
													 hover:bg-green-600 hover:text-white
													px-3 py-2 rounded-md text-xl font-medium"
                      to="/">
                      Home
                    </Link>
                    <Link
                      className="bg-gray-900 text-white
													 hover:bg-green-700 hover:text-white
													px-3 py-2 rounded-md text-xl font-medium"
                      to="/about">
                      About
                    </Link>
                    <Link
                      className="bg-gray-900 text-white
													 hover:bg-green-700 hover:text-white
													px-3 py-2 rounded-md text-xl font-medium"
                      to="/contact">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2  md:static md:inset-auto md:ml-6 md:pr-0   sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {currentUser ? (
                  <>
                    <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      className="bg-gray-900 text-white
													 hover:bg-green-700 hover:text-white
													px-3 py-2 m-1 rounded-md text-xl font-medium"
                      to="/login">
                      S'inscrire | Se connecter
                    </Link>
                  </>
                )}
                {/* Add stadium button */}
                {currentUser && (
                  <Link
                    to="/addcity"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Add a stadium</span>
                  </Link>
                )}

                {/* Profile dropdown */}
                {currentUser && (
                  <Menu as="div" className="ml-3">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-700 hover:bg-green-900">
                        <span className="sr-only">Open currentUser menu</span>

                        <img
                          className="object-cover h-10 w-10 rounded-full"
                          src={
                            "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                          }
                          alt=""
                        />
                        {arrow ? (
                          <ChevronDownIcon
                            onClick={() => setArrow(!arrow)}
                            className="w-8 h-10 hover:h-10 text-gray-300"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronUpIcon
                            onClick={() => setArrow(!arrow)}
                            className="w-8 h-10 hover:h-10 text-gray-300"
                            aria-hidden="true"
                          />
                        )}
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95">
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/"
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-red-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}>
                              {currentUser && "Logout"}
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
              {currentUser && (
                <span className="mt-20 lg:mx-2 md:mx-2 lg:mt-0 md:mt-0text-black lg:text-white md:text-white font-bold ">
                  {greeting &&
                    randomGreeting[i] +
                      " 😀, " +
                      currentUser?.displayName.charAt(0).toUpperCase() +
                      currentUser?.displayName.slice(1)}
                </span>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button>
                <Link
                  className="bg-gray-900 text-white
											 hover:bg-gray-700 hover:text-white
										block px-3 py-2 my-1 rounded-md text-base font-medium"
                  to="/">
                  Home
                </Link>
                <Link
                  className="bg-gray-900 text-white
											 hover:bg-gray-700 hover:text-white
										block px-3 py-2 my-1 rounded-md text-base font-medium"
                  to="/about">
                  About
                </Link>
                <Link
                  className="bg-gray-900 text-white
											 hover:bg-gray-700 hover:text-white
										block px-3 py-2 my-1 rounded-md text-base font-medium"
                  to="/contact">
                  Contact
                </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
