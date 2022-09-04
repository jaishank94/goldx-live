import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsBell } from 'react-icons/bs';
import { useTheme } from "next-themes";

const StrategicAsset = () => {
  const { theme, setTheme } = useTheme("light");

  useEffect(() => {
    // setTheme('light')
  }, [])

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      <Header displayCreate={true} handleSidebar={handleSidebar} />
      <div className="wrapper custom-wrapper overflow-hidden bg-[#f4eddfd1] dark:bg-neutral-900">
        <div className="max-w-screen-xl mx-2 md:mx-auto">
          <div className="my-24 text-center">
            <div className="text-6xl font-bold font-logo-font">
              <p className="mx-2">Gold as a strategic asset?</p>
            </div>
            <p className="mt-6 font-normal text-sm text-slate-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem toto celobeso.</p>
          </div>
          <div class="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="w-[384px] h-[384px] md:w-[500px] md:h-[500px] p-6 rounded-full border border-gold-100 flex align-center justify-center">
                <div className="bg-[url('/images/round-bar-and-coins-blur.png')] bg-cover object-fill m-auto w-[335px] h-[335px] md:w-[429px] md:h-[429px] flex align-center justify-center">
                  <div className="bg-[url('/images/round-bar-and-coins-no-blur.png')] bg-cover object-fill m-auto w-[275px] h-[275px] md:w-[356px] md:h-[356px]"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 flex ml-10">
              <div className="my-auto">
                <p className="text-gold-200 font-medium text-2xl">Investment update</p>
                <p className="font-logo-font font-semibold text-4xl mt-5">Gold amid higher inflation
                  &amp; rising bond yields</p>
                <p className="text-slate-400 mt-5 text-justify">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
          <div class="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="lg:col-span-3 flex mr-10">
              <div className="my-auto">
                <p className="text-gold-200 font-medium text-2xl">Investment update</p>
                <p className="font-logo-font font-semibold text-4xl mt-5">Gold amid higher inflation
                  &amp; rising bond yields</p>
                <p className="text-slate-400 mt-5 text-justify">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="w-[384px] h-[384px] md:w-[500px] md:h-[500px] p-6 rounded-full border border-gold-100 flex align-center justify-center">
                <div className="bg-[url('/images/round-bar-and-coins-blur.png')] bg-cover object-fill m-auto w-[335px] h-[335px] md:w-[429px] md:h-[429px] flex align-center justify-center">
                  <div className="bg-[url('/images/round-bar-and-coins-no-blur.png')] bg-cover object-fill m-auto w-[275px] h-[275px] md:w-[356px] md:h-[356px]"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5 my-10">
            <div className="relative lg:col-span-2 p-6 rounded-3xl bg-[url('/images/gold-leaf-bg-black.png')] bg-cover object-fill">
              <div className="mt-72">
                <p className="text-2xl text-white font-bold">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p className="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem totam.</p>
                <button className="rounded-full cursor-pointer border mx-auto mt-6 p-2 text-xl bg-black shadow-lg shadow-inner shadow-gold-400">
                  <span className="p-2 text-sm text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                    Learn More
                  </span>
                </button>
              </div>
            </div>
            <div className="md:relative lg:col-span-3 p-6 rounded-3xl bg-[url('/images/home-page-gold-in-hand.png')] bg-cover object-fill">
              <div className="mt-68 md:absolute bottom-8">
                <p className="text-2xl text-white font-bold">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p className="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem totam.</p>
                <button className="rounded-full cursor-pointer border mx-auto mt-6 p-2 text-xl bg-black shadow-lg shadow-inner shadow-gold-400">
                  <span className="p-2 text-sm text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                    Learn More
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}
export default StrategicAsset