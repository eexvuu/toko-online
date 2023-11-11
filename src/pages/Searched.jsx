import CardProduct from "../components/CardProduct";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import Slider from "react-slick";
import { settings } from "../libs/helpers/sliderSettings";

const Searched = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const keywords = search.split("=")[1];
  const allProducts = useSelector((state) => state.products.products);
  const [searchedProducts, setSearchedProducts] = useState([]);

  const handleClick = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    const testSearch = async () => {
      const filteredProducts = await allProducts.filter((product) =>
        product.title.toLowerCase().includes(keywords.toLowerCase())
      );
      setSearchedProducts(filteredProducts);
    };
    testSearch();
  }, [keywords, allProducts]);
  return (
    <div className="w-full p-2 md:p-12 space-y-8 md:space-y-16">
      <h1 className="text-xl font-semibold text-gray-600">Searched Products</h1>
      <Slider {...settings}>
        {searchedProducts.map((product, idx) => {
          return (
            <div key={idx}>
              <CardProduct
                key={product.id}
                category={product.category}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
                id={product.id}
                stock={product.stock}
                handleClick={handleClick}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Searched;
