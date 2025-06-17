import React from 'react';
import HomePage from '../../components/Homepage/HeroPage';
import Collection from "../../components/Collection/Collection";
import FeaturedCategories from "../../components/FeaturedCategories/FeaturedCategories";
import Trending from "../../components/Trending/Trending";
import TestimonialSection from "../../components/TestimonialsSection/TestimonialSection";
import LatestBlog from "../../components/Blog/LatestBlog";
import QuestionAnswer from "../../components/QuestionAnswer/QuestionAnswer";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import Footer from '../../components/Footer/Footer';

const HomePages = () => {
  return (
    <div>
      <HomePage />
      <Collection />
      <FeaturedCategories />
      <Trending />
      <TestimonialSection />
      <LatestBlog />
      <QuestionAnswer />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default HomePages;