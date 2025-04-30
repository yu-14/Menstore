import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTimes, FaBars, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import logo from "/public/assets/logo.png";
import { CartContext } from "../../Context/CartContext";
import { ThemeContext } from "../../Context/ThemeContext";

const Navbar = () => {
  const { cartCount } = useContext(CartContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const toggleDropdown = () => setDropdown(!dropdown);

  return (
    <nav className="relative">
      {/* Navbar Container */}
      <div
        className={`flex justify-between items-center z-50 shadow-xl px-5 lg:px-20 py-3 transition duration-300 
        ${
          theme === "dark"
            ? "bg-[#0D1321] text-[#F0EBE3]"
            : "bg-white text-[#0D1321]"
        }
      `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center font-semibold">
          <img src={logo} alt="logo" className="mr-3 w-10" />
          <h1 className="text-3xl font-bold">MenStore.</h1>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center font-semibold">
          <ul className="flex gap-8">
            <li>
              <NavLink to="/" className="hover:text-[#4A4E69]">
                Home
              </NavLink>
            </li>

            {/* Shop Dropdown */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 hover:text-[#4A4E69]"
              >
                Shop <FaChevronDown className="text-sm" />
              </button>
              {dropdown && (
                <div
                  className={`absolute left-0 mt-2 w-48 shadow-lg rounded-md z-10
                  ${
                    theme === "dark"
                      ? "bg-[#2A2E37] text-white"
                      : "bg-[#F0EBE3] text-[#0D1321]"
                  }
                `}
                >
                  <ul className="p-2 space-y-2">
                    {[
                      "Topwear",
                      "Bottomwear",
                      "Footwear",
                      "Grooming",
                      "Accessories",
                      "Ethnic wear",
                    ].map((category, index) => (
                      <li key={index}>
                        <Link
                          to={`/shop/${category.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-[#4A4E69] hover:text-[#F0EBE3] rounded"
                          onClick={() => setDropdown(false)}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <NavLink to="/Brands" className="hover:text-[#4A4E69]">
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink to="/NewArrivals" className="hover:text-[#4A4E69]">
                New Arrivals
              </NavLink>
            </li>
            <li>
              <NavLink to="/Sale" className="hover:text-[#4A4E69]">
                Offers & Discounts
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-[#4A4E69]">
                Customer Support
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side (Cart, Login, Theme Toggle) */}
        <div className="hidden lg:flex items-center font-semibold">
          {/* Cart Icon */}
          <div className="relative mt-2 mr-2">
            <Link to="/cart" className="relative">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className={`w-6 h-6 transition-all duration-300 ${
                  theme === "dark" ? "text-white" : "text-[#0D1321]"
                }`}
              />

              {cartCount > 0 && (
                <div className="absolute bottom-5 left-6 bg-white text-[#0D1321] dark:bg-[red] dark:text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                  {cartCount}
                </div>
              )}
            </Link>
          </div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="text-2xl mx-4">
            {theme === "dark" ? (
              <FaSun className="text-orange-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>

          {/* Clerk Authentication */}
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className={`bg-transparent ${
                  theme === "dark"
                    ? "hover:bg-[#4A4E69] text-[#F0EBE3] border-[#F0EBE3]"
                    : "hover:bg-[#4A4E69] hover:text-white text-[#0D1321] border-[#4A4E69]"
                }  font-semibold py-2 px-4 border  hover:border-transparent rounded transition`}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-4">
              <Link
                to="/MyOrders"
                className={`bg-transparent ${
                  theme === "dark"
                    ? "hover:bg-[#4A4E69] text-[#F0EBE3] border-[#F0EBE3]"
                    : "hover:bg-[#4A4E69] hover:text-white text-[#0D1321] border-[#4A4E69]"
                }  font-semibold py-2 px-4 border  hover:border-transparent rounded transition`}              >
                My Orders
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

        </div>

        {/* Mobile Menu Icon */}
        <div className="flex justify-center items-center gap-3 lg:hidden">

          <button onClick={toggleTheme} className="text-2xl">
              {theme === "dark" ? (
                <FaSun className="text-orange-400" />
              ) : (
                <FaMoon className="text-gray-800" />
              )}
            </button>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button className="block text-2xl" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {click && (
        <div
          className={`lg:hidden flex flex-col items-center space-y-4 py-5 
                        ${
                          theme === "dark"
                            ? "bg-[#0D1321] text-[#F0EBE3]"
                            : "bg-white text-[#0D1321]"
                        }`}
        >
          <NavLink
            to="/"
            onClick={handleClick}
            className="hover:text-[#4A4E69]"
          >
            Home
          </NavLink>
          <button
            onClick={toggleDropdown}
            className="hover:text-[#4A4E69] flex items-center gap-1 "
          >
            Shop <FaChevronDown className="text-sm" />
          </button>
          {dropdown && (
            <div  className="flex flex-col items-center">
              {[
                 "Topwear",
                 "Bottomwear",
                 "Footwear",
                 "Grooming",
                 "Accessories",
                 "ethnicwear",
              ].map((category, index) => (
                <Link
                  key={index}
                  to={`/shop/${category.toLowerCase()}`}
                  onClick={handleClick}
                  
                  className="py-2"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
          <NavLink
            to="/Brands"
            onClick={handleClick}
            className="hover:text-[#4A4E69]"
          >
            Brands
          </NavLink>
          <NavLink
            to="/NewArrivals"
            onClick={handleClick}
            className="hover:text-[#4A4E69]"
          >
            New Arrivals
          </NavLink>
          <NavLink
            to="/Sale"
            onClick={handleClick}
            className="hover:text-[#4A4E69]"
          >
            Offers & Discounts
          </NavLink>
          <NavLink
            to="/contact"
            onClick={handleClick}
            className="hover:text-[#4A4E69]"
          >
            Customer Support
          </NavLink>
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className={`bg-transparent ${
                  theme === "dark"
                    ? "hover:bg-[#4A4E69] text-[#F0EBE3] border-[#F0EBE3]"
                    : "hover:bg-[#4A4E69] hover:text-white text-[#0D1321] border-[#4A4E69]"
                }  font-semibold py-2 px-4 border  hover:border-transparent rounded transition`}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link
                to="/MyOrders"
                className={`bg-transparent ${
                  theme === "dark"
                    ? "hover:bg-[#4A4E69] text-[#F0EBE3] border-[#F0EBE3]"
                    : "hover:bg-[#4A4E69] hover:text-white text-[#0D1321] border-[#4A4E69]"
                }  font-semibold py-2 px-4 border  hover:border-transparent rounded transition`}              >
                My Orders
              </Link>
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
