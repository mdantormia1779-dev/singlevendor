import Marquee from "react-fast-marquee";

const MarqueeSection = () => {
  return (
    <div className="bg-[#16b77a] text-white py-4 overflow-hidden">
      <Marquee speed={50} gradient={false} pauseOnHover={true}>
        <div className="flex gap-12 text-lg font-medium px-6">
          <span>Cash on Delivery available</span>
          <span>• bKash · Nagad · Rocket</span>
          <span>• 100% authentic guarantee</span>
          <span>• 7-day easy returns</span>
          <span>• Cash on Delivery available</span>
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;