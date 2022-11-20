import React, { useContext, Fragment, useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import logo from "../images/oc-white.png";
import soccerBall from "../images/soccer-ball.ico";
import PropTypes from "prop-types";

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
    <div className="w-full">
      <Disclosure
        as="nav"
        className="bg-gradient-to-r from-gray-900 to-green-900"
      >
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
                        to="/"
                      >
                        Home
                      </Link>
                      <Link
                        className="bg-gray-900 text-white
  												 hover:bg-green-700 hover:text-white
  												px-3 py-2 rounded-md text-xl font-medium"
                        to="/about"
                      >
                        About
                      </Link>
                      <Link
                        className="bg-gray-900 text-white
  												 hover:bg-green-700 hover:text-white
  												px-3 py-2 rounded-md text-xl font-medium"
                        to="/contact"
                      >
                        Contact
                      </Link>
                      <Link
                        className="bg-gray-900 text-white
  												 hover:bg-green-700 hover:text-white
  												px-3 py-2 rounded-md text-xl font-medium"
                        to="/faq"
                      >
                        Faq
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2  md:static md:inset-auto md:ml-6 md:pr-0   sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {currentUser ? (
                    <>
                      <button
                        type="button"
                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        className="bg-gray-900 text-white
  												 hover:bg-green-700 hover:text-white
  												px-3 py-2 m-1 rounded-md text-xl font-medium"
                        to="/login"
                      >
                        S'inscrire | Se connecter
                      </Link>
                    </>
                  )}
                  {/* Add stadium button */}
                  {currentUser && (
                    <Link
                      to="/addcity"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-4"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
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
                            src={soccerBall}
                            alt="avatar user"
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
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-red-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {currentUser && "Logout"}
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/setting"
                                className={classNames(
                                  active ? "bg-green-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {currentUser && "Setting"}
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
                        currentUser.displayName?.charAt(0).toUpperCase() +
                        currentUser.displayName?.slice(1)}
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
                    to="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="bg-gray-900 text-white
  										 hover:bg-gray-700 hover:text-white
  									block px-3 py-2 my-1 rounded-md text-base font-medium"
                    to="/about"
                  >
                    About
                  </Link>
                  <Link
                    className="bg-gray-900 text-white
  										 hover:bg-gray-700 hover:text-white
  									block px-3 py-2 my-1 rounded-md text-base font-medium"
                    to="/contact"
                  >
                    Contact
                  </Link>
                  <Link
                    className="bg-gray-900 text-white
  										 hover:bg-gray-700 hover:text-white
  									block px-3 py-2 my-1 rounded-md text-base font-medium"
                    to="/faq"
                  >
                    Faq
                  </Link>
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="z-10 bottomNav fixed bottom-0 w-full">
        <nav
          style={{ border: "1px blue" }}
          className="md:hidden bottom-0 w-full bg-gradient-to-r from-gray-900 to-green-900"
        >
          <ul className="flex justify-around items-center text-white text-center opacity-75">
            <li className="p-4 hover:bg-gray-500">
              <Link to="/">
                <span>Accueil</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-500">
              <a href="/#search">
                <span>Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                  />
                </svg>
              </a>
            </li>
            {currentUser ? (
              <>
                <li className="p-4 hover:bg-gray-500">
                  <Link to="/addcity">
                    <span>Add</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Link>
                </li>
                <li className="p-4 hover:bg-gray-500">
                  <Link to="/setting">
                    <span>Compte</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="p-4 hover:bg-gray-500">
                  <Link to="/login">
                    <span>Login</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  arrow: PropTypes.bool,
  greeting: PropTypes.bool,
  handleLogout: PropTypes.func,
  randomGreeting: PropTypes.array,
  i: PropTypes.number,
};

export default memo(Navbar);
