import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]),
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper min-h-[69vh] md:min-h-[60vh] pt-12 md:pt-0 md:mt-12">
      <div className="success flex flex-col w-[370px] md:w-[80%] max-w-[1000px] m-auto mt-[100px] md:mt-[160px] p-5 md:p-[50px] h-[350px] bg-[#dcdcdc] rounded-[15px] justify-center items-center">
        <p className="icon text-green-700 text-[40px]">
          <BsBagCheckFill />
        </p>
        <h2 className="text-[17px] md:text-[40px] capitalize my-[15px] font-black text-[#324d67]">Thank you for your order!</h2>
        <p className="email-msg text-base font-semibold text-center">Check your email inbox for your receipt.</p>
        <p className="description text-base font-semibold text-center m-2.5 mt-[30px]">
          If you have any questions, please email
          <a className="email ml-[5px] text-[#f02d34]" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn w-full max-w-[400px] py-2.5 px-3 rounded-[15px] text-[20px] leading-none mt-10 uppercase bg-[#f02d34] text-white cursor-pointer scale-100 duration-[0.5s] hover:scale-110">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;