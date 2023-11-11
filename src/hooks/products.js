import { useEffect, useState } from "react";
import { http } from "../libs/services/http";

const useProducts = (method, url) => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const response = await http(method, url);
    const modifiedProducts = response.data.map((item) => {
      return { ...item, stock: 20 };
    })
    setProducts(modifiedProducts);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    products,
  };
};

export default useProducts