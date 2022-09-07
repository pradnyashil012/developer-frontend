import React from "react";
import { FaDiscord } from "react-icons/fa";
const Discord = () => {
  const title = (
    <h2 className="text-white text-2xl md:text-5xl font-semibold text-center">
      Ready to start? <br />
      Join us on discord
    </h2>
  );
  const button = (
    <a
      href="https://discord.gg/9nRFqEDn"
      className="mt-3 md:mt-6 text-md md:text-lg  text-white flex items-center gap-2 bg-[#6C94F7] px-3 py-2 md:px-6 md:py-3 rounded-md"
    >
      <FaDiscord className="text-2xl" /> Join our Server
    </a>
  );
  return (
    <>
      <section className=" bg-discord w-full h-[340px] hidden  md:flex flex-col items-center justify-center bg-opacity-0 md:bg-opacity-100 ">
        {title}
        {button}
      </section>
      <section className="flex md:hidden bg-[#2F68F2] items-center justify-center flex-col container mx-auto py-12 ">
        {title}
        {button}
      </section>
    </>
  );
};

export default Discord;
