import Link from "next/link";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";

import { Dropdown, Cart } from ".";
import { useStateContext } from "@/context/StateContext";

const iconsStyle = {
  fontSize: "25px",
  color: "#4b5563",
  cursor: "pointer",
  position: "relative",
  transition: "transform .4s ease",
  backgroundColor: "transparent",
  paddingLeft: "10px",
  paddingRight: "10px"
}

const categories = [
  { name: "Men", href: "/#men"},
  { name: "Women", href: "/#women"},
  { name: "Kids", href: "/#kids"}
]

const Navbar = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <div className="flex bg-white p-2 md:mt-[-10px] md:mx-[-10px] items-center w-full h-12 fixed z-10 bg-gradient-to-r from-rose-100 to-sky-200">

        {/* Left */}
        <div className="flex w-1/4 sm:w-1/3 items-center pl-2 md:pl-8">
          <Dropdown categories={categories} />
          <div className="hidden md:flex">
            {categories.map((item) => (
              <Link href={item.href} key={item.name}>
                <p className="pr-4 hover:underline text-xl text-gray-600 font-semibold ">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Center */}
        <div className="flex w-1/2 sm:w-1/3 justify-center">
          <Link href="/">
            <p className="logo text-2xl md:text-3xl italic font-bold text-sky-600 font-ubuntu">EZ Shoe Store</p>
          </Link>
        </div>

        {/* Right */}
        <div className="flex w-1/4 sm:w-1/3 justify-end">

          <button type="button" style={iconsStyle} className="login-icon hover:scale-110"><AiOutlineUser /></button>

          <button type="button" style={iconsStyle} className="cart-icon hover:scale-110" onClick={() => setShowCart(true)}>
            <AiOutlineShopping />
            <span className="cart-item-qty absolute top-0 right-1 text-[12px] text-[#eee] bg-[#f02d34] w-[18px] h-[18px] rounded-[50%] text-center font-semibold">{totalQuantities}</span>
          </button>

        </div>
      </div>

      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;