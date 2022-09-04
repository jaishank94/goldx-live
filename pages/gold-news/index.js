import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsBell } from 'react-icons/bs';
import { useTheme } from "next-themes";

const GoldNews = () => {
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
            <div className="flex items-center justify-center text-4xl md:text-6xl font-bold font-logo-font">
              <p className="text-gold-200 mx-2">Gold</p>
              <img src="/images/gold-bars.png" className="w-12" />
              <p>News</p>
            </div>
            <p className="mt-6 font-normal text-sm text-slate-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem toto celobeso.</p>
          </div>
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-x-6 gap-y-14 lg:max-w-none lg:grid-cols-6 ">
            {
              [1, 2, 3, 4, 5, 6].map((list, key) => {
                return (
                  <div className="relative lg:col-span-2 rounded-2xl overflow-hidden" key={key+1}>
                    <div className="bg-[url('/images/gold-bar-product.png')] bg-cover object-fill h-64">
                    </div>
                    <div className="p-6 dark:from-black bg-gradient-to-b from-[#c8bda8] to-[#f2e9dddb] ">
                      <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
                      <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
                      <p className="text-xs mt-6">August 18, 2022</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="text-center my-10">
            <button className="rounded-full cursor-pointer border p-2 text-white bg-gradient-to-r from-gold-300 to-gold-100 bg-gradient-90 shadow-sm shadow-slate-600">
              <span className="p-2 font-bold  uppercase">Load More</span>
            </button>
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
        </div>
        <Footer/>
      </div>
    </Fragment>

  )
}

export default GoldNews