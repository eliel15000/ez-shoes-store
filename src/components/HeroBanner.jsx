import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import heroImg from "@/images/hero.jpg";
import { client } from "@/lib/client";

const HeroBanner = ({ heroBanner: { buttonText, desc, image, largeText1, product } }) => {

  // const imgSrc = urlFor(image);
  const imageProps = useNextSanityImage(client, image);

  return (
    // <div>HeroBanner</div>
    <div className="hero-banner-container">
      <div>
        {/* <h1 className="text-base">{largeText1}</h1> */}
        <Image {...imageProps} alt="HeroImage" className="rounded-[15px] max-w-[1500px] min-h-[300px] w-full h-full object-cover mx-auto" />
        {/* <h1>{buttonText}</h1> */}
        {/* <h1>{desc}</h1> */}
      </div>
    </div>
  );
}

export default HeroBanner;