import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/ContactUs/Contact";
import Cart from "./Pages/Cart/Cart";
import ProductDisplay from "./Components/Product/ProductDisplay";
import NewArrivals from "./Pages/NewArrivals/NewArrivals";
import Sale from "./Pages/Sale/Sale";
import Accessories from "./Pages/Accessories/Accessories";
import TopWear from "./Pages/TopWear/TopWear";
import BottomWear from "./Pages/BottomWear/BottomWear";
import Grooming from "./Pages/Grooming/Grooming";
import Footwear from "./Pages/Footwear/Footwear";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Brands from "./Pages/Brands/Brands";
import TraditionalWear from "./Pages/TraditionalWear/TraditionalWear";
import VerifyOrder from "./Pages/VerifyOrders/VerifyOrders";
import MyOrders from "./Pages/MyOrders/MyOrders";
import TrackOrders from "./Pages/TrackOrders/TrackOrders";
import MoveTopBtn from "./Components/MoveTop/MoveTopBtn";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDisplay />} />
        <Route path="/NewArrivals" element={<NewArrivals />} /> 
        <Route path="/Sale" element={<Sale/>} /> 
        <Route path="/shop/Accessories" element={<Accessories/>} /> 
        <Route path="/shop/Topwear" element={<TopWear/>} /> 
        <Route path="/shop/Bottomwear" element={<BottomWear/>} /> 
        <Route path="/shop/grooming" element={<Grooming/>} /> 
        <Route path="/shop/footwear" element={<Footwear/>} /> 
        <Route path="/placeOrder" element={<PlaceOrder/>} /> 
        <Route path="/Brands" element={<Brands/>} />  
        <Route path="/shop/ethnic wear" element={<TraditionalWear/>} /> 
        <Route path="/verifyOrders" element={<VerifyOrder/>}/>
        <Route path="/MyOrders" element={<MyOrders/>}/>
        <Route path="/track/:orderId" element={<TrackOrders/>}/>
      </Routes>
      <MoveTopBtn/>
      <Footer />
    </Router>
  );
}

export default App;
