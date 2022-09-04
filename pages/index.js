import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Moralis from "moralis";
import Image from "next/image";
import Header from "./components/Header";
import { useMoralis } from "react-moralis";
import Footer from "./components/Footer";
import moment from "moment";
import { useTheme } from "next-themes";
import { BsBell } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { GoArrowUp } from "react-icons/go";
import SelectField from "./components/SelectField";
import GoldChartDark from "../public/images/gold-graph-dark.png";

const index = () => {
  const { theme, setTheme } = useTheme("light");
  const [isMounted, setMounted] = useState(false);
  const weightOptions = [
      {
        name: "Kilogram",
        value: "kg",
      },
      {
        name: "Grams",
        value: "grams",
      },
    ],
    currencyOptions = [
      {
        name: "USD",
        value: "USD",
      },
      {
        name: "INR",
        value: "INR",
      },
      {
        name: "GBP",
        value: "GBP",
      },
    ],
    intervalOptions = [
      {
        name: "1 Day",
        value: "1D",
      },
      {
        name: "2 Days",
        value: "2D",
      },
      {
        name: "3 Days",
        value: "3D",
      },
    ];

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();
  const isColors =
    router.pathname.includes("/colors") ||
    router.pathname.includes("/docs/colors");

  if (!isMounted) return null;

  return (
    <Fragment>
      <Header displayCreate={true} handleSidebar={handleSidebar} />
      <div className="wrapper custom-wrapper overflow-hidden bg-[#f4eddfd1] dark:bg-neutral-900">
        <div className="max-w-screen-xl mx-2 md:mx-auto">
          <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="relative lg:col-span-3 p-4 rounded-2xl bg-[url('/images/homePgGoldBarWCoins.png')] bg-cover object-fill pt-72">
              <div className="rounded-xl bg-black bg-opacity-75 backdrop-blur-md border border-slate-800 p-4">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3 mb-3">
                  <label className="flex items-center text-white">
                    <span>Real time capital.com</span> <BiChevronDown />
                  </label>
                  <div className="flex text-slate-400">
                    <label>+ Add to Watchlist</label>{" "}
                    <span className="px-2">|</span>{" "}
                    <label className="flex items-center">
                      <BsBell className="mr-2" /> Create Alert
                    </label>
                  </div>
                </div>
                <div className="flex content-start border-b border-slate-800 pb-3 mb-3">
                  <GoArrowUp className="text-green-600 text-3xl" />
                  <div className="mx-2">
                    <p className="text-slate-500 text-sm">
                      <span className="text-green-600 font-bold text-2xl">
                        1,770.05
                      </span>
                      <span>/USD</span>{" "}
                      <span className="text-green-600 ml-3">
                        +8.55{" "}
                        <span className="text-white text-sm">(+0.49%)</span>
                      </span>
                    </p>
                    <p className="text-xs text-slate-300">
                      00:50:30 - Real-time derived data. Currency in USD
                      (Disclaimer)
                    </p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  <label>
                    Prev. Close: <span className="text-white">1,761.50</span>
                  </label>
                  <span className="mx-3">|</span>
                  <label>
                    Open: <span className="text-white">1,764.45</span>
                  </label>
                  <span className="mx-3">|</span>
                  <label>
                    Day's Range:{" "}
                    <span className="text-white">1,763.00 - 1,770.55</span>
                  </label>
                </div>
              </div>
            </div>
            <div className=" lg:col-span-2 w-full h-full bg-transparent space-y-5">
              <div className="bgImg-with-gradient bg-cover object-fill rounded-2xl p-6 text-white relative">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-medium">Fuse Gold (FUSEG)</p>
                    <p className="flex text-base font-medium text-inherit">
                      Spot price: $1,770.05{" "}
                      <span className="flex text-green-600 text-base">
                        <GoArrowUp /> +8.55 <span>(+0.49%)</span>
                      </span>
                    </p>
                  </div>
                  <button className="cursor-pointer border p-1 text-sm bg-gray-400 rounded-full m-1 border-slate-200 dark:border-neutral-300 hover:border-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-20">
                  <button className="rounded-full cursor-pointer mx-auto pb-[0.8px] text-xl bg-gradient-to-r from-gold-300 to-gold-100 ">
                    <div className="rounded-full bg-black p-2">
                      <span className="text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                        BUY NOW
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="bgImg2-with-gradient bg-cover object-fill rounded-2xl p-6 text-white relative">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-medium">Pax Gold (PAXG)</p>
                    <p className="flex text-base font-medium text-inherit">
                      Spot price: $1,770.05{" "}
                      <span className="flex text-green-600 text-base">
                        <GoArrowUp /> +8.55 <span>(+0.49%)</span>
                      </span>
                    </p>
                  </div>
                  <button className="cursor-pointer border p-1 text-sm bg-gray-400 rounded-full m-1 border-slate-200 dark:border-neutral-300 hover:border-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-20">
                  <button className="rounded-full cursor-pointer mx-auto pb-[0.8px] text-xl bg-gradient-to-r from-gold-300 to-gold-100 ">
                    <div className="rounded-full bg-black p-2">
                      <span className="text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                        BUY NOW
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-2 p-6 rounded-3xl bg-[url('/images/gold-leaf-bg-black.png')] bg-cover object-fill">
              <div className="mt-72">
                <p className="text-2xl text-white font-bold">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p className="text-slate-400">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  totam.
                </p>
                <button className="rounded-full cursor-pointer mx-auto pb-[0.8px] text-xl bg-gradient-to-r from-gold-300 to-gold-100 ">
                    <div className="rounded-full bg-black p-2">
                      <span className="text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                        LEARN MORE
                      </span>
                    </div>
                  </button>
              </div>
            </div>
            <div className="md:relative lg:col-span-3 p-6 rounded-3xl bg-[url('/images/home-page-gold-in-hand.png')] bg-cover object-fill">
              <div className="mt-72 md:absolute bottom-8">
                <p className="text-2xl text-white font-bold">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p className="text-slate-400">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  totam.
                </p>
                <button className="rounded-full cursor-pointer mx-auto pb-[0.8px] text-xl bg-gradient-to-r from-gold-300 to-gold-100 ">
                    <div className="rounded-full bg-black p-2">
                      <span className="text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                        LEARN MORE
                      </span>
                    </div>
                  </button>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
          <div className="">
            <div className="md:flex align-center justify-between mb-10">
              <p className="text-xl md:text-2xl font-medium my-auto">
                Gold History
              </p>
              <div className="flex items-center">
                <SelectField options={weightOptions} />
                <SelectField options={currencyOptions} />
                <SelectField options={intervalOptions} />
              </div>
            </div>
            <Image src={GoldChartDark} layout={"responsive"} />
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
          <div className="rounded-3xl p-6 bg-[url('/images/bags-of-gold.png')] bg-cover object-fill">
            <div className="md:w-1/2 m-10">
              <p className="text-3xl md:text-6xl text-white font-bold">
                Lorem ipsum dolor sit amet consectetur.
              </p>
              <p className="text-slate-400 pb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi.
              </p>
              {/* <button className="rounded-full cursor-pointer border mx-auto mt-6 p-2 text-xl bg-black shadow-lg shadow-inner shadow-gold-400">
                <span className="p-2 text-sm text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                  LEARN MORE
                </span>
              </button> */}
              <button className="rounded-full cursor-pointer mx-auto pb-[0.8px] text-xl bg-gradient-to-r from-gold-300 to-gold-100 ">
                    <div className="rounded-full p-2">
                      <span className="text-sm text-white font-bold bg-gradient-to-r from-gold-300 to-gold-100">
                        LEARN MORE
                      </span>
                    </div>
                  </button>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default index;
