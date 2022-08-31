import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsBell } from 'react-icons/bs';
import { useTheme } from "next-themes";
import GoldMarketChart from "../../public/images/gold-market-rate-table.png"
import GoldPriceTodayChart from "../../public/images/gold-price-today-chart.png"

const valuation = () => {
  const { theme, setTheme } = useTheme("light");

  useEffect(() => {
    setTheme('light')
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
              <p>Valuation</p>
            </div>
            <p className="mt-6 font-normal text-sm text-slate-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem toto celobeso.</p>
          </div>
          <div class="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="relative lg:col-span-3 p-6 rounded-2xl bgImg3-with-gradient bg-cover object-fill">
              <p className="text-align:start  text-white">August 18, 2022</p>
              <div className="mt-20 w-2/3">
                <p className="text-gold-200 font-medium text-2xl">Investment update</p>
                <p className="text-white font-logo-font font-semibold text-3xl mt-5">Gold amid higher inflation, rising
                  bond yields in india</p>
                <p className="text-slate-400 mt-5 text-justify">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
            </div>
            <div className="relative lg:col-span-2 p-6 rounded-3xl bg-[url('/images/gold-leaf-bg-black.png')] bg-cover object-fill">
              <div className="mt-72">
                <p className="text-2xl mb-3 text-white font-bold">
                  Gold Market Commentary.
                </p>
                <p className="text-slate-400">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab inventore veritatis et quasi architecto.</p>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
          <Image src={GoldMarketChart} layout={'responsive'} />
          <div class="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-7 mt-10">
            <div className="relative lg:col-span-5 rounded-2xl">
              <Image src={GoldPriceTodayChart} layout={'responsive'} />
            </div>
            <div className="lg:col-span-2 border uppercase border-slate-300 text-center flex items-center justify-center">
              ** Google Ads **
            </div>
          </div>
          <div className="text-justify mt-10">
            <p className="my-4">Gold, a precious metal, mostly appears in alloys and only rarely in its pure form. Because of its physical properties, it is resistant to air, moisture, heat and many solvents. Gold also has a high density. Gold is regarded as a secure investment and is very popular as a means of coverage in times of crisis. Its high value and its rarity and uniqueness make gold a secure financial investment which also withstands inflation.</p>

            <p className="my-4"> Gold was extracted in Egypt as early as 2000 B.C. and the first gold coins were minted in 50 B.C. in Rome. This shows that people have always been fascinated by gold and by its rarity, durability and beauty.</p>

            <p className="my-4"> Because of its properties, gold is also one of the most important industrial raw materials. The yellow precious metal is easily workable and conducts electricity and heat. Because of its excellent conductivity, gold is used particularly in the electrical industry. Gold has also been used in dental technology for around 3000 years. However, gold is used most frequently in the jewelry industry. This line of business accounts for around 75 per cent of the gold worked. Apart from the Antarctic, where mining is not allowed due to international regulations, the precious metal is mined on all continents. With a market share of 16 per cent, South Africa is the most important producer of gold.</p>
          </div>
        </div>
        <Footer/>
      </div>
    </Fragment >
  )
}
export default valuation