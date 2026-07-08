import Flashsale from "./Components/Flashsale/Flashsale";
import Hero from "./Components/Hero/Hero";
import PopularCategories from "./Components/PopularCategories/PopularCategories";
import Testimonials from "./Components/Testimonials/Testimonials";
import WhyBuy from "./Components/WhyBuy/WhyBuy";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <PopularCategories></PopularCategories>
      <Flashsale></Flashsale>
      <Testimonials></Testimonials>
      <WhyBuy></WhyBuy>
    </>
  );
}