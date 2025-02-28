import './App.css';
import Collection from './components/Collection/Collection';
import Header from './components/Header/Header';
import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Categories from './components/Categories/Categories';
import Trending from './components/Trending/Trending';
import TestimonialSection from './components/TestimonialsSection/TestimonialSection';

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
    </div>
  );
}

export default App;
