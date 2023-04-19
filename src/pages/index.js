import { Product, FooterBanner, HeroBanner } from "@/components";
import Categories from "@/components/Categories";
import { client } from "@/lib/client";

const Home = ({ products, bannerData }) => {

  const menProducts = getCategory(products, "men");
  const womenProducts = getCategory(products, "women");
  const kidsProducts = getCategory(products, "kids");

  const categ = ["men" , "women", "kids"];

  console.log(products);

  return (
    <div className="pt-12" id="home">
        
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      {/* {console.log(bannerData)} */}
      {/* {console.log(products)} */}

      <div className="products-heading text-center mt-[40px] text-white">
          <h2 className="text-[40px] font-extrabold">Best Selling Products</h2>
          <p className="text-base font-medium">Shoes of many variations</p>
      </div>

      {/* <div className="products-container flex flex-wrap">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div> */}

      {categ?.map((item) => (
        <Categories key={item} products={products} name={item} />
      ))}

      <FooterBanner footerBanner={bannerData && bannerData[0]} />

    </div>
  )
};

const getCategory = (arr, categ) => {
  const newArr = [];

  arr.forEach((item) => {
    if (item.category === categ) {
      newArr.push(item);
    }
  })

  return newArr;
}

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
