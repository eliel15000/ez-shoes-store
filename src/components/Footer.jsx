import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => (
  <div className="footer-container flex flex-col items-center text-slate-100 text-center justify-center mt-5 py-[30px] px-2.5 font-bold gap-2.5">
    <p>2023 EliezerCoding. All Rights Reserved.</p>
    <p className="icons flex text-[30px] gap-2.5">
      <AiFillInstagram />
      <AiOutlineTwitter />
    </p>
  </div>
  );

export default Footer;