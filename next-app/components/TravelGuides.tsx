import AnimatedButton from "./AnimatedButton";

const TravelGuides = () => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="section_title pb-3">
          <h2 className="font-heading">
            Maui <span className="text-tertiary">Travel Guides</span>
          </h2>
        </div>
        <div className="flex flex-wrap mx-[-16px] lg:mx-[-32px] border-b border-t border-background-gray">
          <div className="w-full lg:w-[21.5%]">
            <div className="p-4 md:p-6">Left Side</div>
          </div>
          <div className="w-full lg:w-[57%] border-b border-t lg:border-t-0 lg:border-b-0 md:border-l md:border-r border-background-gray">
            <div className="p-4 md:p-6">Middle</div>
          </div>
          <div className="w-full lg:w-[21.5%]">
            <div className="p-4 md:p-6">Right Side</div>
          </div>
        </div>
        <div className="mt-6 md:mt-14 flex justify-center">
          <AnimatedButton text="More Maui Travel" href="/subscribe" />
        </div>
      </div>
    </section>
  );
};

export default TravelGuides;
