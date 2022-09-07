import React from "react";
import { GoPrimitiveDot } from "react-icons/go";
const Problem = ({ image, side, title, list, paragraph, backgroundColor }) => {
  return (
    <section className={`bg-[${backgroundColor}]`}>
      <div className="container mx-auto grid md:grid-cols-2 grid-cols-1 md:py-6 md:gap-24">
        <div className="flex w-full h-full justify-center items-center md:hidden ">
          <img src={image} alt="" />
        </div>
        {side && (
          <div className="md:flex w-full h-full justify-center items-center hidden ">
            <img src={image} alt="" />
          </div>
        )}
        <div className="py-12 text-left flex flex-col justify-center h-full">
          <h2 className="text-[#004AAD] text-xl text-cenrer md:text-left md:text-[52px] font-bold leading-6 md:leading-[50px]">{title}</h2>

          <h2 className="text-md md:text-xl leading-6 font-normal text-black mt-6 ">
            <span className="mb-4">{paragraph}</span>
            {list.map((text) => (
              <h3 className="flex  items-center gap-2 ml-4 my-2">
                <GoPrimitiveDot />
                {text}
              </h3>
            ))}
          </h2>
        </div>
        {!side && (
          <div className="hidden  md:flex w-full h-full justify-center items-center">
            <img src={image} alt="" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Problem;
