import Link from "next/link";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";

import { client } from "@/lib/client";


const Product = ({ product: {image, name, slug, price } }) => {

  const imageProps = useNextSanityImage(client, (image && image[0]));

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card cursor-pointer scale-100 hover:scale-110 transition duration-[0.5s] text-white">
          <Image 
            {...imageProps}
            style={{ width: "250px", height: "250px", maxWidth: "250px" }}
            alt="product"
            className="product-image h-auto rounded-3xl"
          />
          <p className="product-name font-medium">{name}</p>
          <p className="product-name font-extrabold">${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Product;