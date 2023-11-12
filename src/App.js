import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import './assets/css/tailwind.css';
import Login from "./pages/Login";
import MensCloth from "./pages/MensCloth";
import Jewelry from "./pages/Jewelry";
import Electronics from "./pages/Electronics";
import WomensCloth from "./pages/WomensCloth";
import Searched from "./pages/Searched";
import EditStock from "./pages/EditStock";
import Report from "./pages/Report";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [keywords, setKeywords] = useState("");

  const handleToggleSidebar = () => setIsOpen(!isOpen);

  const handleChange = (value) => {
    setKeywords(value);
  };

  const handleKeydown = (key) => {
    if (key === "Enter") {
      if (!keywords) return;
      navigate({
        pathname: "/searched",
        search: `?keywords=${keywords}`,
      });
      setKeywords("");
    }
  };

  const handleClickCart = () => {
    navigate({ pathname: "/cart" });
  };

  const handleClickBtnLogin = () => {
    navigate({ pathname: "/login" });
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartItems");
    window.location.href = "/";
  };

  const resize = (e) =>
    e.srcElement.innerWidth > 1000 ? setIsOpen(true) : null;

  useEffect(() => {
    if (window.innerWidth > 1000) setIsOpen(true);
    window.addEventListener("resize", resize);
  }, []);

  return (
    <ChakraProvider>
      <Header
            handleToggleSidebar={handleToggleSidebar}
            isOpen={isOpen}
            keywords={keywords}
            handleChange={handleChange}
            handleKeydown={handleKeydown}
            handleClickCart={handleClickCart}
            handleClickBtnLogin={handleClickBtnLogin}
            handleLogout={handleLogout}
          />
      <div className="w-full min-h-screen flex bg-gray-200 flex-col md:w-12/12 lg:w-12/12 xl:w-12/12">
        <div className="flex flex-row">
          <Sidebar isOpen={isOpen}  />
          <div className="w-full h-full md:w-10/12 lg:w-10/12 xl:w-10/12">
            <Routes>
              <Route
                path="/login"
                name="login"
                protectedRoute={false}
                element={<Login />}
              />
              <Route
                path="/mens-cloth"
                name="mens-cloth"
                useLayout={true}
                element={<MensCloth />}
              />
              <Route
                path="/jewelry"
                name="jewelry"
                useLayout={true}
                element={<Jewelry />}
              />
              <Route
                path="/electronics"
                name="electronics"
                useLayout={true}
                element={<Electronics />}
              />
              <Route
                path="/womens-cloth"
                name="womens-cloth"
                useLayout={true}
                element={<WomensCloth />}
              />
              <Route
                path="/searched"
                name="searched"
                useLayout={true}
                element={<Searched />}
              />
              <Route
                path="/stock"
                name="stock"
                useLayout={true}
                element={<EditStock />}
              />
              <Route
                path="/report"
                name="cart"
                useLayout={true}
                element={<Report />}
              />
              <Route
                path="/cart"
                name="report"
                useLayout={true}
                element={<Cart />}
              />
              <Route
                path="/:id"
                name="detail-product"
                useLayout={true}
                element={<DetailProduct />}
              />
              <Route
                path="/"
                name="home"
                useLayout={true}
                exact={true}
                element={<Home />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}
export default App;