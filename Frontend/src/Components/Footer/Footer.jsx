import React, { useContext } from "react";
import logo from "/assets/logo_big.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={`flex flex-col lg:flex-row justify-between font-sans items-start px-6 py-8 lg:p-16 transition-all
          ${theme === "dark" ? "bg-[#0D1321] text-[#F0EBE3]" : "bg-[#F0EBE3] text-[#0D1321]"}
        `}>

        {/* Logo & Description Section */}
        <div className="flex flex-col items-start mb-6 lg:mb-0 max-w-md">
          <Link to="/" onClick={scrollToTop}>
            <div className="flex items-center mb-3">
              <img src={logo} alt="logo" className="w-12 h-12 mr-3" />
              <h1 className="text-3xl font-bold">MenStore.</h1>
            </div>
          </Link>
          <p className={`text-sm opacity-80 ${theme === "dark" ? "text-[#E5E5E5]" : "text-[#0D1321]"}`}>
            Discover premium men's fashion with us. Elevate your style with our unique collection.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full lg:w-auto text-left">
          {[
            { title: "Shop Collection", links: [
              { name: "Top Wear", path: "/shop/topwear" },
              { name: "Footwear", path: "/shop/footwear" },
              { name: "Watches", path: "/shop/accessories" },
              { name: "Bags & Wallets", path: "/shop/accessories" },
              { name: "Grooming & Fragrances", path: "/shop/grooming" },
              { name: "Eyewear", path: "/shop/accessories" },
              { name: "Ethnic Wear", path: "/shop/ethnic wear" },
              { name: "Sportswear", path: "/shop/topwear" }
            ]},
            { title: "Company", links: [
              { name: "Who we are", path: "/" },
              { name: "Careers", path: "/contact" },
              { name: "Terms & Conditions", path: "/contact" },
              { name: "Privacy", path: "/contact" }
            ]},
            { title: "Customer Service", links: [
              { name: "Contact", path: "/contact" },
              { name: "Shipping", path: "/contact" },
              { name: "Returns", path: "/contact" },
              { name: "Warranty", path: "/contact" },
              { name: "FAQ", path: "/contact" },
              { name: "Find a store", path: "/contact" }
            ]},
            { title: "Follow Us", links: [
              { name: "Facebook", path: "https://www.facebook.com", icon: <FaFacebook size={20} /> },
              { name: "X", path: "https://www.twitter.com", icon: <FaTwitter size={20} /> },
              { name: "Instagram", path: "https://www.instagram.com", icon: <FaInstagram size={20} /> },
              { name: "Pinterest", path: "https://www.pinterest.com", icon: <FaPinterest size={20} /> }
            ]}
          ].map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <h1 className={`font-semibold ${theme === "dark" ? "text-[#F0EBE3]" : "text-[#0D1321]"}`}>{section.title}</h1>
              <ul className={`opacity-80 space-y-1 ${theme === "dark" ? "text-[#E5E5E5]" : "text-[#4A4E69]"}`}>
                {section.links.map((link, idx) => (
                  <li key={idx} className="hover:underline cursor-pointer flex items-center gap-2">
                    {link.path.startsWith("http") ? (
                      <a href={link.path} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        {link.icon ? link.icon : null} {link.name}
                      </a>
                    ) : (
                      <Link to={link.path} onClick={scrollToTop} className="flex items-center gap-2">
                        {link.icon ? link.icon : null} {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Section */}
      <div
        className={`p-3 text-center text-sm transition-all
          ${theme === "dark" ? "bg-[#4A4E69] text-[#F0EBE3]" : "bg-[#0D1321] text-[#F0EBE3]"}`}
      >
        <h1>&copy; 2025 Created by Sai Ganesh Ratnala. All Rights Reserved.</h1>
      </div>
    </>
  );
};

export default Footer;
