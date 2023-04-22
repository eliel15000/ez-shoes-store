import { FooterBanner, HeroBanner, Login } from "@/components";
import Categories from "@/components/Categories";
import { client } from "@/lib/client";

const Home = ({ products, bannerData }) => {

  const categ = ["men" , "women", "kids"];

  return (
    <div className="pt-12" id="home">

      <Login />
        
      <HeroBanner heroBanner={bannerData.length && bannerData[2]} />

      <div className="products-heading text-center mt-[40px] text-white">
        <h2 className="text-[40px] font-extrabold">Best Selling Products</h2>
        <p className="text-base font-medium">Shoes of many variations</p>
      </div>

      {categ?.map((item) => (
        <Categories key={item} products={products} name={item} />
      ))}

      <FooterBanner footerBanner={bannerData && bannerData[1]} />

    </div>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  };
}


export default Home;
