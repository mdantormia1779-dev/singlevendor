import Flashsale from "./Components/Flashsale/Flashsale";
import Hero from "./Components/Hero/Hero";
import PopularCategories from "./Components/PopularCategories/PopularCategories";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <PopularCategories></PopularCategories>
      <Flashsale></Flashsale>
    </>
  );
}