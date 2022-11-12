import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { memo } from "react";

const Faq = () => {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-center text-xl text-green-900 font-bold my-4">
        VOS QUESTIONS LES PLUS FRÉQUENTES
      </h2>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-100 px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <span>Lorem ipsum dolor sit amet.</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-green-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
                hic eos explicabo tempore quae possimus ut recusandae laborum
                doloremque distinctio natus modi sapiente alias, neque
                consequatur facere illo repellat tenetur repudiandae. Nulla
                quaerat pariatur velit nihil quas natus nisi quae.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-100 px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <span>Lorem ipsum dolor sit.</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-green-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officia repellat doloremque neque hic tempora assumenda,
                exercitationem quos illum repellendus rem, harum porro quae
                ullam nostrum aliquid. Ipsum tenetur deleniti eveniet.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-100 px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75">
                <span>Lorem ipsum dolor sit.</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-green-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Molestias, facilis! Odio unde hic aperiam labore possimus ipsum
                illo nobis nostrum?
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
export default memo(Faq);
