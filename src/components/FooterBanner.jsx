import Link from "next/link";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "@/lib/client";

const FooterBanner = ({ footerBanner: { buttonText, desc, image, largeText1, product } }) => {

  const imageProps = useNextSanityImage(client, image);

  return (
    <div className="footer-banner-container mt-10">
      <div>
        <Image {...imageProps} alt="HeroImage" className="rounded-[15px] max-w-[1500px] min-h-[300px] w-full h-full object-cover mx-auto" />
      </div>
    </div>
  );
}

export default FooterBanner;