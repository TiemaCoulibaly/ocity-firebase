import React from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
	return (
		<div className="bg-indigo-50 p-1">
			<Popover>
				<div className="flex justify-center mb-7 relative pt-6 sm:px-6 lg:px-8">
					<nav
						className="relative flex items-center justify-between sm:h-10 lg:justify-start"
						aria-label="Global">
						hello
						<div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
							<div className="flex items-center justify-between w-full md:w-auto">
								<div className="flex flex-shrink-0 text-indigo-500 mt-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="mt-1 h-7 w-7"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<span className="font-semibold text-2xl tracking-tight">
										'City
									</span>
									<span className="font-medium text-black text-2xl hover:text-black">
										-Stade
									</span>
								</div>
								<div className="-mr-2 flex items-center md:hidden">
									<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">
											Open main menu
										</span>

										<MenuIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</Popover.Button>
								</div>
							</div>
						</div>
						<div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
							<a
								href="#home"
								className="font-medium text-gray-500 text-2xl hover:text-gray-900">
								Home1
							</a>
							<a
								href="#home"
								className="font-medium text-gray-500 text-2xl hover:text-gray-900">
								About
							</a>
							<a
								href="#home"
								className="font-medium text-gray-500 text-2xl hover:text-gray-900">
								Contact
							</a>

							<a
								href="#a"
								className="p-6 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 md:py-2 md:text-lg">
								Add
							</a>
						</div>
					</nav>
				</div>

				<Transition
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95">
					<Popover.Panel
						focus
						className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
						<div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
							<div className="px-5 pt-4 flex items-center justify-between">
								<div>
									<img
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
										alt=""
									/>
								</div>

								<div className="-mr-2">
									<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="sr-only">
											Close main menu
										</span>
										<XIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</Popover.Button>
								</div>
							</div>

							<div className="px-2 pt-2 pb-3 space-y-1">
								<a
									href="#hoime"
									className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
									Home2
								</a>
								<a
									href="#hoime"
									className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
									About
								</a>
								<a
									href="#hoime"
									className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
									Contact
								</a>
								<a
									href="#responsive-header"
									className="block lg:inline-block text-2xl lg:mt-0 text-indigo-600 hover:text-white">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-9 w-9"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</a>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	);
};

export default Navbar;
