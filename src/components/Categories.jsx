import { Product } from ".";

const Categories = ({ products, name }) => {

  const productList = getProducts(products, name);

  return (
    <div className="category-container">
      <h1 id={name} className="pt-[68px] text-center mb-10"><span className="py-5 px-16 bg-slate-100 rounded-lg font-ubuntu text-sky-700 text-xl">{name.toUpperCase()}</span></h1>
      <div className="products-container flex flex-wrap justify-center gap-[15px] mt-5 w-full">
        {productList?.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>
  );
}

const getProducts = (arr, categ) => {
  const newArr = [];

  arr.forEach((item) => {
    if (item.category === categ) {
      newArr.push(item);
    }
  })

  return newArr;
}

export default Categories;