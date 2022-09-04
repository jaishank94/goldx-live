import React, { Fragment, useEffect, useState } from "react";
// import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsBell } from 'react-icons/bs';
import { useTheme } from "next-themes";
import GoldMarketChart from "../../public/images/gold-market-rate-table.png"
import GoldPriceTodayChart from "../../public/images/gold-price-today-chart.png"

const Advertise = () => {
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
            <div className="flex items-center justify-center text-4xl md:text-6xl font-bold font-logo-font mx-4 ">
              <p>Advertise with us</p>

            </div>
            <p className="mt-6 font-normal text-sm text-slate-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem toto celobeso.</p>
          </div>
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <img src="/images/macbook-cut.png" className="block" />
            </div>
            <div className="lg:col-span-3 pl-10 mt-28">
              <img src="/images/wallet-icon.png" />
              <p className="text-3xl md:text-4xl font-bold font-logo-font my-8">Connect Wallet</p>
              <p className="text-sm text-slate-600 dark:text-white/70 mb-8">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              <button className="rounded-full cursor-pointer border p-2 text-white bg-gradient-to-r from-gold-300 to-gold-100 bg-gradient-90 shadow-sm shadow-slate-600">
                <span className="p-2 font-medium  uppercase">Fuse Gold</span>
              </button>
            </div>
          </div>
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="lg:col-span-3 pr-10 mt-28 pl-10 order-last lg:order-first">
              <img src="/images/crypto-coin.png" />
              <p className="text-3xl md:text-4xl font-bold font-logo-font my-8">Accept Gold X Token</p>
              <p className="text-sm text-slate-600 dark:text-white/70 mb-8">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
            <div className="relative lg:col-span-2 order-first lg:order-last">
              <img src="/images/gold-bar-cut.png" className="block" />
            </div>
          </div>
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <img src="/images/gold-sterling-bars.png" className="block" />
            </div>
            <div className="lg:col-span-3 pl-10 mt-28">
              <img src="/images/dollar-tag.png" />
              <p className="text-3xl md:text-4xl font-bold font-logo-font my-8">Accept Gold X Token</p>
              <p className="text-sm text-slate-600 dark:text-white/70 mb-8">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
        <Footer />
      </div>
    </Fragment>
  )
}
export default Advertise