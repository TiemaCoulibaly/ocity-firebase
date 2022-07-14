import React from "react";

const Footer = () => {
  return (
    <footer className="footer-1 bg-white py-5 sm:py-6">
      <div className="container mx-auto px-4">
        <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
          <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 className="text-xl font-bold mb-6">About</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a
                  href="#lorem"
                  className="border-b border-solid border-transparent hover:border-green-400">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#lorem"
                  className="border-b border-solid border-transparent hover:border-green-400">
                  Team
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#lorem"
                  className="border-b border-solid border-transparent hover:border-green-400">
                  Our Story
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
            <h5 className="text-xl font-bold mb-6">Help</h5>
            <ul className="list-none footer-links">
              <li className="mb-2">
                <a
                  href="#lorem"
                  className="border-b border-solid border-transparent hover:border-green-400">
                  FAQ
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="#lorem"
                  className="border-b border-solid border-transparent hover:border-green-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
            <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">
              Stay connected
            </h5>
            <div className="flex sm:justify-center xl:justify-start">
              <a
                href="#lorem"
                className="w-8 h-8 rounded-full text-center py-1 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                </svg>
              </a>
              <a
                href="#lorem"
                className="w-8 h-8 rounded-full text-center py-1 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                </svg>
              </a>
              <a
                href="#lorem"
                className="w-8 h-8 rounded-full text-center py-1 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:flex-wrap sm:-mx-4 mt-4 pt-2 sm:mt-2 sm:pt-2 border-t">
          <div class="w-full px-10 rounded-b-lg">
            <div class="max-w-7xl flex flex-col-reverse sm:flex-row py-1 mx-auto justify-between items-center">
              <div class="text-center mt-4 sm:mt-0">
                &copy; 2022 <span class="font-bold">O'City stade</span>
              </div>
              <div class="text-center text-xl">
                <ul class="w-full justify-center text-sm flex text-center flex-row mx-auto space-x-2 overflow-hidden">
                  <li>
                    <button class="border-b border-solid border-transparent hover:border-green-400">
                      Privacy Policy
                    </button>
                  </li>
                  <span>|</span>
                  <li>
                    <button class="border-b border-solid border-transparent hover:border-green-400">
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
