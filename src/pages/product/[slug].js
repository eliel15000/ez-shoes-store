import { useEffect, useState } from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";

const smallimageTW = "small-image rounded-lg w-[70px] h-[70px] cursor-pointer"
const selectedimageTW = "selected-image border-sky-700 border-b-2"

const ProductDetails = ({ products, product }) => {

  const { image, name, details, price, slug } = product;
  const [index, setIndex] = useState(0)
  const imageProps = useNextSanityImage(client, (image && image[index]));
  const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  useEffect(() => {
    setIndex(0);
    setQty(1);
  }, [slug]);

  return (
    <div className="product-slug rounded-xl max-w-[1500px] mx-auto">
      <div className="product-detail-container lg:flex flex-wrap md:flex-nowrap gap-10 m-10 mt-0 pt-16 md:pt-10 md:mt-12 text-[#324d67]">
        <div>
          <div className="image-container">
            <Image {...imageProps} alt="product-image" className="product-detail-image rounded-[15px] w-[350px] lg:w-[400px] h-[350px] lg:h-[400px]" />
          </div>
          <div className="small-images-container flex flex-wrap gap-2.5 mt-5">
            {image?.map((item, i) => (
              <img 
                src={urlFor(item)}
                className={i === index ? `${smallimageTW} ${selectedimageTW}` : smallimageTW}
                onMouseEnter={() => setIndex(i)}
                key={i}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews flex text-[#f02d34] mt-2.5 gap-[5px] items-center">
            <div className="flex">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p className="text-[#324d67]">(20)</p>
          </div>
          <h4 className="mt-2.5 font-bold">Details: </h4>
          <p className="max-w-[300px] mt-2.5">{details}</p>
          <p className="price font-bold text-[26px] mt-[30px] text-[#f02d34]">${price}</p>
          
          <div className="quantity flex gap-5 mt-2.5 items-center">
            <h3 className="text-[1.17rem] font-bold">Quantity</h3>
            <p className="quantity-desc flex mt-2.5 border-2 border-solid border-gray-500">
              <span className="minus text-base pb-[6px] pt-3 px-3 cursor-pointer border-r border-solid border-gray-500 text-[#f02d34]" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num text-xl py-[6px] px-3">{qty}</span>
              <span className="plus text-base pb-[6px] pt-3 px-3 cursor-pointer border-l border-solid border-gray-500 text-green-500" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons flex gap-[20px]">
            <button type="button" className="add-to-cart w-[150px] md:w-[200px] py-2.5 px-5 border border-solid border-[#f02d34] mt-10 text-[18px] font-medium bg-white scale-100 hover:scale-110 duration-[0.5s]" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now w-[150px] md:w-[200px] py-2.5 px-5 border-white mt-10 text-white text-[18px] font-medium bg-[#f02d34] scale-100 hover:scale-110 duration-[0.5s]" onClick={handleBuyNow}>Buy Now</button>
          </div>

        </div>

      </div>

      <div className="maylike-products-wrapper mt-[120px]">
        <h2 className="text-[#324d67] text-[28px] font-bold text-center m-[50px]">You may also like</h2>
        <div className="marquee relative h-[400px] w-full overflow-x-hidden">
          <div className="maylike-products-container track flex justify-center gap-[15px] mt-5">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: "blocking"
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails;