import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple } from "react-icons/bs";

import { useStateContext } from "@/context/StateContext";

const styleTW = {
  icon: "flex sm:w-20 sm:h-11 sm:border-[1px] sm:rounded-md sm:border-solid sm:border-gray-400 justify-center items-center hover:scale-110 duration-[0.5s] cursor-pointer",
  label: "block mb-2 text-base font-medium text-gray-900 pl-2",
  input: "bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
}

const Login = () => {

  const { isLogin, setIsLogin } = useStateContext();

  const openModal = () => {
    setIsLogin(true);
  }

  const closeModal = () => {
    setIsLogin(false);
  }

  return (
    <>
      <Transition appear show={isLogin} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">

            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                  
                  <Dialog.Title as="h1" className="text-3xl text-center font-bold text-gray-900">
                    Login
                  </Dialog.Title>

                  <div className="mt-3">

                    {/* login username & password */}
                    <div>
                      <label for="username" class={styleTW.label}>Username</label>
                      <input type="text" id="username" class={styleTW.input} placeholder="Username" required />

                      <label for="password" class={`${styleTW.label} my-2`}>Password</label>
                      <input type="text" id="password" class={styleTW.input} placeholder="Password" required />

                      <p className="text-sm text-right text-gray-600 mt-1 mb-4"><button type="button" className="cursor-pointer">Forgot password?</button></p>

                      <button type="button" className="flex w-full mb-3 justify-center font-bold tracking-wide bg-gradient-to-r from-rose-200 to-sky-300 py-2 rounded-3xl">
                        LOGIN
                      </button>

                    </div>

                    <Divider>or</Divider>

                    {/* Social Connections */}
                    <div className="flex mt-4 gap-10 justify-center text-3xl">
                      <button type="button" className={styleTW.icon}>
                        <FcGoogle />
                      </button>
                      <button type="button" className={styleTW.icon}>
                        <BsFacebook className="text-blue-500" />
                      </button>
                      <button type="button" className={styleTW.icon}>
                        <BsApple />
                      </button>
                    </div>

                    {/* Register */}
                    <div className="mt-10 text-gray-600">
                      <p className="text-center">Not a member? <button type="button" className="underline cursor-pointer">Sign up now</button></p>
                    </div>

                  </div>

                </Dialog.Panel>
              </Transition.Child>

            </div>
          </div>

        </Dialog>
      </Transition>
    </>
  )
}

const Divider = ({ children }) => (
  <div className="flex items-center">
    <div className="w-full border-[1px] border-solid border-gray-300" />
    <span className="text-gray-400 mx-2.5 pb-1">{children}</span>
    <div className="w-full border-[1px] border-solid border-gray-300" />
  </div>
)

export default Login;