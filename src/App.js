import './App.css';
import Collection from './components/Collection/Collection';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Categories from './components/Categories/Categories';
import Trending from './components/Trending/Trending';
import TestimonialSection from './components/TestimonialsSection/TestimonialSection';
import Footer from './components/Footer/Footer';
import QuestionAnswer from './components/QuestionAnswer/QuestionAnswer';
import NewsLetter from './components/NewsLetter/NewsLetter';

function App() {
  return (
    <div className="App">
      <Header/>
      <Navbar/>
      <Homepage/>
      <Collection/>
      <Categories/>
      <Trending/>
      <TestimonialSection/>
      <QuestionAnswer/>
      <NewsLetter/>
      <Footer/>
    </div>
  );
}

export default App;
