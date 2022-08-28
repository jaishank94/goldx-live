import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import logoWhite from "/public/images/pp_final_icon_white.png";
import backgroundWeb from "/public/images/Homepage.jpg";
import backgroundMobile from "/public/images/Homepage-mobile.jpg";
import Moralis from "moralis";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function index() {
  const { isInitialized } = useMoralis();
  const [dCount, setDappCount] = useState(0);
  const [vCount, setVisitorCount] = useState(0);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  useEffect(() => {
    if (isInitialized) {
      getAppInfo();
      increasePageView();
    }
  }, [isInitialized]);

  const increasePageView = async (dappsCount) => {
    try {
      const isViewed = localStorage.getItem("viewed");
      const DappsAnalytics = Moralis.Object.extend("DappsAnalytics");
      const MasterAnalytics = Moralis.Object.extend("MasterAnalytics");
      const PageAnalytics = Moralis.Object.extend("PageAnalytics");

      const mQuery = new Moralis.Query(MasterAnalytics);
      mQuery.equalTo("page", "landing_page");
      const mResponse = await mQuery.find();

      if (!isViewed) {
        const newAnalyObject = new DappsAnalytics();
        const nAObj = await newAnalyObject.save();

        const newObject = new PageAnalytics();
        newObject.set("page", "landing_page");
        newObject.set("page_views", 1);
        newObject.set("analyticId", nAObj.id);
        await newObject.save();

        if (mResponse.length) {
          mResponse[0].increment("page_views", 1);
          await mResponse[0].save();
        }

        localStorage.setItem("viewed", nAObj.id);
      } else {
        const query = new Moralis.Query(PageAnalytics);
        query.equalTo("page", "landing_page");
        query.equalTo("analyticId", isViewed);
        const response = await query.find();
        if (response.length === 0) {
          const newObject = new PageAnalytics();
          newObject.set("page", "landing_page");
          newObject.set("analyticId", isViewed);
          newObject.set("page_views", 1);
          await newObject.save();

          if (mResponse.length) {
            mResponse[0].increment("page_views", 1);
            await mResponse[0].save();
          }
        }
      }
      if (mResponse.length) {
        setVisitorCount(mResponse[0].get("page_views"));
      }
    } catch (e) {}
  };

  const getAppInfo = async () => {
    try {
      const Dapps = Moralis.Object.extend("Dapps");
      const query = new Moralis.Query(Dapps);
      query.equalTo("status", "ACTIVE");
      query.limit(10000);
      const response = await query.find();

      setDappCount(response.length);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="bg-black relative text-white">
      <Head>
        <title>Pulsechain Projects</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.cdnfonts.com/css/gordita" rel="stylesheet" />
      </Head>
      <div className="flex flex-col absolute z-50 p-4 md:p-8">
        <div className="w-full p-4 ">
          <Link className="flex items-center cursor-pointer" href="/">
            <div className="flex items-center">
              <Image
                alt="logo"
                width={40}
                height={40}
                className="rounded-t-lg"
                src={logoWhite}
              />
              <p className="font-bold text-white px-2">Pulsechain Projects</p>
            </div>
          </Link>
        </div>

        <div className="w-full">
          <h1 className="text-3xl break-words pt-4 md:text-5xl font-bold text-white drop-shadow-lg shadow-black md:pt-14 px-4">
            Discover the next big <br />
            project on puslechain projects
          </h1>
          <div className="flex px-4">
            <ul className="list-disc px-2 pt-8">
              <li className="py-2 text-sm md:text-base md:py-4">
                DISCLAIMER: DYOR, this site is user generated content.
              </li>
              <li className="py-2 text-sm md:text-base md:py-4">
                Create a project in less than 2 minutes, be detailed to insure
                best user experience.
              </li>
              <li className="py-2 text-sm md:text-base md:py-4">
                Make sure you verify before you invest in ANY project. Due your
                due diligence.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex p-4 w-full space-between">
          <div className="text-white relative">
            <div className="p-2 md:p-4 absolute z-50">
              <p className="text-xl font-bold">{dCount}</p>
              <p className="text-xs pt-1 font-default text-gray-100">DApps</p>
            </div>
            <div className="p-2 md:p-4 h-16 w-20 md:h-20 md:w-28 shadow rounded-xl bg-gradient-to-r from-slate-200 opacity-25">
              <div className="rotate-[165deg] absolute -top-[0.5px] h-16 w-20 md:h-20 md:w-28 shadow rounded-xl bg-gradient-to-r from-slate-200 opacity-25"></div>
            </div>
          </div>
          <div className="text-white relative mx-10">
            <div className="p-2 md:p-4 absolute z-50">
              <p className="text-xl font-bold">{vCount}</p>
              {/* <p className="text-xl font-bold">{"-"}</p> */}
              <p className="text-xs pt-1 font-default text-gray-100">
                Visitors
              </p>
            </div>
            <div className="p-2 md:p-4 h-16 w-20 md:h-20 md:w-28 shadow rounded-xl bg-gradient-to-r from-slate-200 opacity-25">
              <div className="rotate-[165deg] absolute -top-[0.5px] h-16 w-20 md:h-20 md:w-28 shadow rounded-xl bg-gradient-to-r from-slate-200 opacity-25"></div>
            </div>
          </div>
        </div>
        <div className="pt-2 p-4">
          {/* <div className="cursor-pointer w-3/4 md:w-2/4 flex justify-center items-center rounded-full bg-white shadow-lg p-2 "> */}
          <div className="">
            <Link href="/">
              <button className="cursor-pointer bg-white p-2 rounded-full shadow-lg shadow-stone-500">
                <span className="text-sm uppercase text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Explore Projects
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
        <div className="hidden md:block">
          <Image layout="fill" objectFit="cover" src={backgroundWeb} />
        </div>
        <div className="md:hidden">
          <Image layout="fill" objectFit="cover" src={backgroundMobile} />
        </div>
      </div>
    </div>
  );
}
