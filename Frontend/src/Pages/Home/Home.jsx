import React from "react";
import Hero from "../../Components/Hero/Hero";
import Categories from "../../Components/Categories/Categories";
import Favorites from "../../Components/Favorites/Favorites";
import Features from "../../Components/Features/Features";
import News from "../../Components/Newslayout/News";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Testimonials from "../../Components/Testimonials/Testimonials";
import NewCollection from "../../Components/NewCollection/NewCollection";
import BrandPartners from "../../Components/BrandPartners/BrandPartners";
import Carousel from "../../Components/Carousel/Carousel";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Favorites />
      <Carousel/>
      <NewCollection/>
      <Features />
      <Testimonials/>
      <BrandPartners/>
      <NewsLetter />
      <News />
    </>
  );
};

export default Home;
