import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Icon, Button } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { isAuthenticated, isAdmin } from "../libs/helpers/auth";
import Logo from "../assets/images/Logo.svg";
import { Link } from "react-router-dom";


const Header = ({
  handleToggleSidebar,
  isOpen,
  keywords,
  handleChange,
  handleKeydown,
  handleClickCart,
  handleClickBtnLogin,
  handleLogout,
}) => {
  const [isShowLogout, setIsShowLogout] = useState(false);
  const products = useSelector((state) =>
    state.cartItems.cartItems.length > 0
      ? state.cartItems.cartItems
      : JSON.parse(localStorage.getItem("cartItems"))
  );
  return (
    <div className=" py-6 flex h-[100px] bg-white items-center justify-between px-3 md:px-12 space-x-3 shadow-md">
    <Link to="/"><h1 className="text-xl font-semibold">MyStore</h1></Link>
    {!isAdmin() ? (
      <div className="flex items-center w-52 md:w-[400px] lg:w-[500px]">
        <InputGroup justifyContent="center">
          <Input
            borderRadius="10"
            onKeyDown={(e) => handleKeydown(e.key)}
            value={keywords}
            onChange={(e) => handleChange(e.target.value)}
            type="text"
            placeholder="Search Product"
            borderColor="black.400"
            width="100%"
            mx="auto"
          />
          <InputRightElement
            pointerEvents="none"
            children={<Search2Icon color="black.400" />}
          />
        </InputGroup>
      </div>
    ) : null}
      <div className="space-x-8">
        {isAuthenticated() ? (
          <Stack direction="row" className="space-x-2 md:space-x-5 relative">
            {!isAdmin() && (
              <div
                className="relative flex flex-row items-center"
                onClick={handleClickCart}
              >
                {products && products.length > 0 && (
                  <div className="absolute -top-2 -right-2 font-semibold text-sm cursor-pointer bg-red-500 px-1.5 rounded-full text-white">
                    {products.length}
                  </div>
                )}
                <Icon
                  as={AiOutlineShoppingCart}
                  w="27px"
                  h="27px"
                  color="black.400"
                  className="cursor-pointer"
                />
              </div>
            )}
            <Icon
              as={CgProfile}
              w="27px"
              h="27px"
              color="black.400"
              className="cursor-pointer z-50 "
              onClick={() => setIsShowLogout(!isShowLogout)}
            />
            {isShowLogout && (
              <div className="p-2 bg-blue-100 rounded-lg absolute right-11 top-3 md:right-3">
                <p
                  className="px-2 py-1 rounded-md bg-black-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            )}
            <div className="block md:hidden lg:hidden xl:hidden">
              <Icon
                as={isOpen ? CgClose : GiHamburgerMenu}
                w="27px"
                h="27px"
                color="black.400"
                onClick={handleToggleSidebar}
              />
            </div>
          </Stack>
        ) : (
          <Stack
            direction="row"
            className="space-x-3 md:space-x-5 items-center ml-auto"
          >
            <Button
              bg={"blue.300"}
              children="Login"
              onClick={handleClickBtnLogin}
              className="shadow-lg "
            />
            <div className="block md:hidden">
              <Icon
                as={isOpen ? CgClose : GiHamburgerMenu}
                w="27px"
                h="27px"
                color="black.400"
                onClick={handleToggleSidebar}
              />
            </div>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Header;
