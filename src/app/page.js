import FeaturedProducts from "./Components/FeaturedProducts/FeaturedProducts";
import Flashsale from "./Components/Flashsale/Flashsale";
import Hero from "./Components/Hero/Hero";
import PopularCategories from "./Components/PopularCategories/PopularCategories";
import Testimonials from "./Components/Testimonials/Testimonials";
import TrendingProduct from "./Components/TrendingProduct/TrendingProduct";
import WhyBuy from "./Components/WhyBuy/WhyBuy";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <PopularCategories></PopularCategories>
      <Flashsale></Flashsale>
      <FeaturedProducts></FeaturedProducts>
      <TrendingProduct></TrendingProduct>
      <Testimonials></Testimonials>
      <WhyBuy></WhyBuy>
    </>
  );
}