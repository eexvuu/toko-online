import React, { useEffect, useState } from "react";
import "../assets/css/modules/reactSlick.css";
import PopularByCategory from "../components/PopularByCategory";
import { http } from "../libs/services/http";
import { useDispatch } from "react-redux";
import { ADD_ALL_PRODUCTS } from "../store/slicers/products";
import useProducts from "../hooks/products";
import { isAdmin } from "../libs/helpers/auth";

const URL = "products";
const GET = "get";

const Home = () => {
  const { products } = useProducts(GET, URL);
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const response = await http("get", "products/categories");
    setCategories(response.data);
  };

  useEffect(() => {
    const setData = async () => {
      try {
        const localProducts = await JSON.parse(
          localStorage.getItem("allProducts")
        );
        if (localProducts && localProducts.length > 0) {
          return dispatch(ADD_ALL_PRODUCTS(localProducts));
        }
        dispatch(ADD_ALL_PRODUCTS(products));
      } catch (e) {
        // silent e
      }
    };
    setData();
  }, [dispatch, products]);

  useEffect(() => {
    fetchData();
    if (isAdmin()) {
      window.location.href = "/report";
    }
  }, []);
  return (
    
    <div className="w-full h-full bg-gray-200 p-4 md:p-4 md:h-full space-y-8 md:space-y-64">
      <div className="space-y-5">
        {categories.map((category) => (
          <PopularByCategory key={category} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;
