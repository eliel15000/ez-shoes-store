import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { GrMenu, GrClose } from "react-icons/gr";
import { Fragment, useState } from "react";

const Dropdown = ({ categories }) => {

  return (
    <div className="md:hidden">
      <Menu>
        {({ open }) =>(
          <>
            <div>
              <Menu.Button className="hover:bg-gray-200 hover:rounded text-xl">
                {open ? <GrClose /> : <GrMenu />}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-500"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute bg-white w-48 rounded-md shadow-lg divide-y divide-gray-300">
                {categories?.map((item) => (
                  <div key={item.name} className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={item.href}>
                          <button className={`${active && 'bg-slate-300'} text-gray-600 w-full items-center rounded-md text-2xl`}>
                            {item.name}
                          </button>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default Dropdown;