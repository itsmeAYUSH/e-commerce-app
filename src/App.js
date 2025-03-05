import "./App.css";
import Collection from "./components/Collection/Collection";
import Header from "./components/Header/Header";
import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import Categories from "./components/Categories/Categories";
import Trending from "./components/Trending/Trending";
import TestimonialSection from "./components/TestimonialsSection/TestimonialSection";
import Footer from "./components/Footer/Footer";
import QuestionAnswer from "./components/QuestionAnswer/QuestionAnswer";
import NewsLetter from "./components/NewsLetter/NewsLetter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Pages/Products/Products";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import LatestBlog from "./components/Blog/LatestBlog";
import NotFound from "./Pages/NotFound/NotFound";
import Blog from "./Pages/Blog/Blog";
import OfflineNotice from "./components/OfflineNotice/OfflineNotice";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

const HomePages = () => {
  return (
    <div>
      <OfflineNotice />
      <Homepage />
      <Collection />
      <Categories />
      <Trending />
      <TestimonialSection />
      <LatestBlog />
      <QuestionAnswer />
      <NewsLetter />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
