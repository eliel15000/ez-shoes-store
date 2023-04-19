import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {

  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  }
  
  return (
    <div className="cart-wrapper fixed z-20 w-screen right-0 top-0 duration-[1s] ease-in-out">
      <div className="cart-container h-screen w-[330px] sm:w-[415px] md:w-[600px] bg-white float-right p-1 md:py-10 md:px-2.5 relative">
        <button 
          type="button"
          className="cart-heading flex items-center text-[18px] font-medium cursor-pointer gap-0.5 ml-2.5 mt-[35px] md:mt-0 bg-transparent"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading ml-2.5">Your Cart</span>
          <span className="cart-num-items ml-2.5 text-[#f02d34]">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart m-10 text-center flex flex-col items-center">
            <AiOutlineShopping size={150} />
            <h3 className="text-[20px] font-semibold">Your shopping bag is empty</h3>
            <Link href="/" className="w-full">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn w-full max-w-[400px] py-2.5 px-3 rounded-[15px] text-[20px] leading-none mt-10 uppercase bg-[#f02d34] text-white cursor-pointer scale-100 duration-[0.5s] hover:scale-110"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container mt-2.5 md:mt-[15px] overflow-auto max-h-[66vh] py-5 px-2.5">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product flex gap-[30px] py-5 px-[5px] md:p-5" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image w-[25%] md:w-[150px] h-[25%] md:h-[150px] rounded-[15px]" />
              <div className="item-desc">
                <div className="flex top w-[200px] md:w-[350px] justify-between text-[#324d67] flex-wrap md:flex-nowrap gap-2.5 md:gap-0">
                  <h5 className="text-base md:text-2xl font-bold">{item.name}</h5>
                  <h4 className="text-base md:text-xl font-bold text-black md:text-[#324d67]">${item.price}</h4>
                </div>
                <div className="flex bottom w-[200px] md:w-[350px] justify-between text-[#324d67] mt-[30px] md:mt-[60px]">
                  <div>
                  <p className="quantity-desc flex border-2 border-solid border-gray-500">
                    <span className="minus text-base pb-[6px] pt-3 px-3 cursor-pointer border-r border-solid border-gray-500 text-[#f02d34]" onClick={() => toggleCartItemQuantity(item._id, "dec")}>
                      <AiOutlineMinus />
                    </span>
                    <span className="num text-xl py-[6px] px-3">{item.quantity}</span>
                    <span className="plus text-base pb-[6px] pt-3 px-3 cursor-pointer border-l border-solid border-gray-500 text-green-500" onClick={() => toggleCartItemQuantity(item._id, "inc")}>
                      <AiOutlinePlus />
                    </span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item text-2xl text-[#f02d34] bg-transparent"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom absolute bottom-3 right-[5px] w-full p-[30px] md:px-[65px]">
            <div className="total flex justify-between font-bold text-[20px] md:text-[22px]">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container m-auto w-[300px] md:w-[400px]">
              <button 
                type="button"
                className="btn w-full max-w-[400px] py-2.5 px-3 rounded-[15px] text-[20px] leading-none mt-8 uppercase bg-[#f02d34] text-white cursor-pointer scale-100 duration-[0.5s] hover:scale-110"
                onClick={handleCheckout}
              >
                Pay With Stripe
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;