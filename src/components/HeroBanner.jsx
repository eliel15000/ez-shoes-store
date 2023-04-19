import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@/lib/client";

const HeroBanner = ({ heroBanner: { image } }) => {

  const imageProps = useNextSanityImage(client, image);

  return (
    <div className="hero-banner-container">
      <div>
        <Image {...imageProps} alt="HeroImage" className="rounded-[15px] max-w-[1500px] min-h-[300px] w-full h-full object-cover mx-auto" />
      </div>
    </div>
  );
}

export default HeroBanner;