import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Moralis from "moralis";
import Image from "next/image";
import { Listbox, Transition, Popover } from "@headlessui/react";
// import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Header from "./components/Header";
import Tbody from "./components/tbody";
import { useMoralis } from "react-moralis";
import Footer from "./components/Footer";
import moment from "moment";
import Sidebar from "./components/Sidebar";
import { useTheme } from "next-themes";
import { BsBell } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { GoArrowUp } from 'react-icons/go';

const Filter = [
  { name: "Filter" },
  { name: "Live" },
  { name: "Beta" },
  { name: "Alpha" },
  { name: "Work in Progress" },
];
const Category = [
  { name: "Category" },
  { name: "NFT" },
  { name: "Exchanges" },
  { name: "DeFi" },
  { name: "MarketPlaces" },
  { name: "Games" },
  { name: "Yield-farming" },
  { name: "Governance" },
  { name: "Entertainment" },
  { name: "Property" },
  { name: "Tools" },
  { name: "Identity" },
  { name: "Energy" },
  { name: "Insurance" },
  { name: "Storage" },
  { name: "Development" },
  { name: "Gambling" },
  { name: "Wallet" },
  { name: "Finance" },
  { name: "Promotion" },
  { name: "Social" },
  { name: "Media" },
  { name: "Security" },
  { name: "Utility" },
  { name: "Interface" },
  { name: "Education" },
  { name: "Health" },
  { name: "Content Discovery" },
];

export default function index() {
  const { isInitialized } = useMoralis();
  const [data, setData] = useState([]);
  const [justAdded, setJustAdded] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [duration, setDuration] = useState("Daily");
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(Filter[0]);
  const [category, setCategory] = useState(Category[0]);
  const [isLoading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme("light");
  const [isMounted, setMounted] = useState(false);
  const { query } = useRouter();
  const { filter_category } = query;

  useEffect(() => {
    if (isInitialized) {
      getAppList();
      increasePageView();
      getJustAdded();
    }
  }, [isInitialized, category, filter, duration, filter_category, searchText]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const increasePageView = async () => {
    try {
      const isViewed = localStorage.getItem("viewed");
      const DappsAnalytics = Moralis.Object.extend("DappsAnalytics");
      const MasterAnalytics = Moralis.Object.extend("MasterAnalytics");
      const PageAnalytics = Moralis.Object.extend("PageAnalytics");

      const mQuery = new Moralis.Query(MasterAnalytics);
      mQuery.equalTo("page", "dapps_listing_page");
      const mResponse = await mQuery.find();

      if (!isViewed) {
        const newAnalyObject = new DappsAnalytics();
        const nAObj = await newAnalyObject.save();

        const newObject = new PageAnalytics();
        newObject.set("page", "dapps_listing_page");
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
        query.equalTo("page", "dapps_listing_page");
        query.equalTo("analyticId", isViewed);
        const response = await query.find();
        if (response.length === 0) {
          const newObject = new PageAnalytics();
          newObject.set("page", "dapps_listing_page");
          newObject.set("page_views", 1);
          newObject.set("analyticId", isViewed);
          await newObject.save();

          if (mResponse.length) {
            mResponse[0].increment("page_views", 1);
            await mResponse[0].save();
          }
        }
      }
    } catch (e) { }
  };

  const getAppList = async () => {
    const Dapps = Moralis.Object.extend("Dapps");
    setLoading(true);
    try {
      const query = new Moralis.Query(Dapps);

      if (category.name !== "Category") {
        query.containedIn("type", [category.name]);
      }

      if (searchText !== "") {
        query.startsWith("name", searchText.toUpperCase());
      }

      if (filter_category && filter_category !== "Category") {
        console.log("asdasdad", filter_category);
        query.containedIn("type", [filter_category]);
      }
      if (filter.name !== "Filter") {
        query.equalTo("app_status", filter.name);
      }
      query.equalTo("status", "ACTIVE");

      if (duration !== "Daily") {
        let startDay =
          duration === "Yearly" ? 365 : duration === "Monthly" ? 30 : 7;
        let d = moment().subtract(startDay, "days");

        d.startOf("day");

        let finish = new moment();

        query.greaterThanOrEqualTo("createdAt", d.toDate());
        query.lessThan("createdAt", finish.toDate());
      }
      query.ascending("priority");
      query.limit(1000);
      const response = await query.find();
      let result = JSON.parse(JSON.stringify(response));
      // console.log("result", result);
      setData(result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  const getJustAdded = async () => {
    setLoading(true);
    try {
      const Dapps = Moralis.Object.extend("Dapps");
      const query = new Moralis.Query(Dapps);
      query.descending("createdAt");
      query.limit(3);
      query.equalTo("status", "ACTIVE");
      const response = await query.find();
      let result = JSON.parse(JSON.stringify(response));
      setJustAdded(result);
      const query2 = new Moralis.Query(Dapps);
      query2.equalTo("status", "ACTIVE");
      query2.limit(1000);
      const response2 = await query2.find();
      let result2 = JSON.parse(JSON.stringify(response2));
      let liveProject = 0, upcomingProject = 0, noOfDapps = result2.length;
      result2.length && result2.map(list => {
        liveProject = list.app_status == 'Live' ? liveProject++ : liveProject,
          upcomingProject = list.app_status !== 'Live' ? upcomingProject++ : upcomingProject
      })
      setProjectData({
        liveProject,
        upcomingProject,
        noOfDapps
      })
      pageStatsData();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  const pageStatsData = async () => {
    const MasterAnalytics = Moralis.Object.extend("MasterAnalytics");
    const mQuery = new Moralis.Query(MasterAnalytics);
    mQuery.equalTo("page", "landing_page");
    const mResponse = await mQuery.find();
    if (mResponse.length) {
      setProjectData(prevPData => { return { ...prevPData, pageViews: mResponse[0].get("page_views") } });
    }
  }

  const handleCategory = (e) => {
    setCategory(e);
  };

  const handleFilter = (e) => {
    setFilter(e);
  };

  const handleSidebar = () => {
    // console.log("jklhksd")
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
      <div className="wrapper custom-wrapper overflow-hidden bg-[#EDF1F4] dark:bg-neutral-900">
        <div className="md:container mx-2 md:mx-auto">
          <div class="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
            <div className="relative lg:col-span-3 p-4 rounded-2xl bg-[url('../public/images/homePgGoldBarWCoins.png')] bg-cover object-fill pt-72">
              <div className="rounded-xl bg-black bg-opacity-75 backdrop-blur-md border border-slate-800 p-4">
                <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-3 mb-3">
                  <label className="flex items-center text-white"><span>Real time capital.com</span> <BiChevronDown /></label>
                  <div className="flex text-slate-400">
                    <label>+ Add to Watchlist</label> <span className="px-2">|</span> <label className="flex items-center"><BsBell className="mr-2" /> Create Alert</label>
                  </div>
                </div>
                <div className="flex content-start border-b border-slate-800 pb-3 mb-3">
                  <GoArrowUp className="text-green-600 text-3xl" />
                  <div className="mx-2">
                    <p className="text-slate-500 text-sm"><span className="text-green-600 font-bold text-2xl">1,770.05</span><span>/USD</span> <span className="text-green-600 ml-3">+8.55 <span className="text-white text-sm">(+0.49%)</span></span>
                    </p>
                    <p className="text-xs text-slate-300">00:50:30 - Real-time derived data. Currency in USD (Disclaimer)</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  <label>Prev. Close: <span className="text-white">1,761.50</span></label>
                  <span className="mx-3">|</span>
                  <label>Open: <span className="text-white">1,764.45</span></label>
                  <span className="mx-3">|</span>
                  <label>Day's Range: <span className="text-white">1,763.00 - 1,770.55</span></label>
                </div>
              </div>
            </div>
            <div className=" lg:col-span-2 w-full h-full bg-transparent space-y-5">
              <div className="bgImg-with-gradient bg-cover object-fill rounded-2xl p-6 text-white relative">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-medium">Fuse Gold (FUSEG)</p>
                    <p className="flex text-base font-medium text-inherit">Spot price: $1,770.05 <span className="flex text-green-600 text-base"><GoArrowUp /> +8.55 <span>(+0.49%)</span></span></p>
                  </div>
                  <button className="cursor-pointer border p-1 text-sm bg-gray-400 rounded-full m-1 border-slate-200 dark:border-neutral-300 hover:border-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
                <div className="mt-20">
                  <button className="rounded-full cursor-pointer border mx-auto p-2 text-xl bg-black shadow-lg shadow-gold-400">
                    <span className="p-2 text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                      BUY NOW
                    </span>
                  </button>
                </div>
              </div>
              <div className="bgImg2-with-gradient bg-cover object-fill rounded-2xl p-6 text-white relative">
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className="text-2xl font-medium">Pax Gold (PAXG)</p>
                    <p className="flex text-base font-medium text-inherit">Spot price: $1,770.05 <span className="flex text-green-600 text-base"><GoArrowUp /> +8.55 <span>(+0.49%)</span></span></p>
                  </div>
                  <button className="cursor-pointer border p-1 text-sm bg-gray-400 rounded-full m-1 border-slate-200 dark:border-neutral-300 hover:border-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
                <div className="mt-20">
                  <button className="rounded-full cursor-pointer border mx-auto p-2 text-xl bg-black shadow-lg shadow-inner shadow-gold-400">
                    <span className="p-2 text-sm text-transparent font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                      BUY NOW
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="relative lg:col-span-2 p-4 bg-cyan-300"></div>
            <div className="p-4 bg-slate-400"></div> */}
          </div>
        </div>
      </div>
      {/* <div className="wrapper custom-wrapper overflow-hidden bg-[#EDF1F4] dark:bg-neutral-900">
        <div
          className={`w-full ${theme === "light" ? "border-b" : "border-b-0 bg-neutral-800"
            } border-slate-300`}
        >
        </div>
        <div className="">
          <div className="w-full ">
            <div className={`bg-cover bg-center  h-auto text-white py-32 px-10 object-fill bg-[url('../public/images/Homepage-mobile.jpg')] md:bg-[url('../public/images/Homepage.jpg')]`}>
              <div className="md:w-1/2 mx-auto text-center">
                <p className="font-bold text-lg md:text-3xl drop-shadow-xl shadow-gray-800">Explore Dapps</p>
                <p className="text-base">Discover the possibilities of the projects launching on PulseChain with the definitive registry of DApps projects.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:container mx-2 md:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 justify-between py-8 gap-6">
            <div className={`rounded-xl ${theme === "light" ? "bg-white" : "bg-neutral-800"} py-4 px-4 `}>
              <p className="text-xl mb-4">Just Added</p>
              {
                justAdded.map((list, key) => {
                  const createdFromNow = moment((list.createdAt)).fromNow(true)
                  return (
                    <div className="flex justify-between">
                      <p className="text-xs truncate">{key + 1}. {list.name}</p>
                      <span className="text-xs truncate">{createdFromNow}</span>
                    </div>
                  )
                })
              }
            </div>
            <div className={`rounded-xl ${theme === "light" ? "bg-white" : "bg-neutral-800"} py-4 px-4 `}>
              <p className="text-xl mb-4">Live Projects</p>
              <p className="text-3xl font-extralight">{projectData && projectData.liveProject}</p>
            </div>
            <div className={`rounded-xl ${theme === "light" ? "bg-white" : "bg-neutral-800"} py-4 px-4 `}>
              <p className="text-xl mb-4">Upcoming Projects</p>
              <p className="text-3xl font-extralight">{projectData && projectData.upcomingProject}</p>
            </div>
            <div className={`rounded-xl ${theme === "light" ? "bg-white" : "bg-neutral-800"} py-4 px-4 `}>
              <p className="text-xl mb-4">No. of Dapps</p>
              <p className="text-3xl font-extralight">{projectData && projectData.noOfDapps}</p>
            </div>
            <div className={`rounded-xl ${theme === "light" ? "bg-white" : "bg-neutral-800"} py-4 px-4 `}>
              <p className="text-xl mb-4">Total Page Visitors</p>
              <p className="text-3xl font-extralight">{projectData && projectData.pageViews}</p>
            </div>
            <div className={`rounded-xl ${theme === "light" ? "bg-white" : "bg-neutral-800"} py-4 px-4 `}>
              <p className="text-xl mb-4">Trending</p>
              <p className="text-3xl font-extralight">{projectData && projectData.noOfDapps}</p>

            </div>
          </div>
        </div>
        <div className="md:container mx-auto block md:flex mt-2 w-full text-center justify-between mb-4">
          <div className="flex items-center justify-center mb-4 md:mb-0">
            <div
              className={`inline-flex border shadow-inner shadow-slate-200 dark:shadow-black rounded-full ${theme === "light" ? "border-slate" : "border-neutral-800"
                }`}
              role="group"
            >
              <button
                type="button"
                onClick={() => setDuration("Daily")}
                className={`rounded-full px-4 xl:px-6 py-2 font-medium text-xs leading-tight uppercase transition duration-150 ease-in-out text-gray-400 ${duration === "Daily"
                  ? ` border m-1 font-semibold grad-text-color shadow-md text-violet-700 ${theme === "light"
                    ? ""
                    : "bg-neutral-900 shadow-black border-neutral-800"
                  }`
                  : ""
                  }`}
              >
                <p
                  className={`sm:text-xs${duration === "Daily" ? " link" : ""
                    }`}
                >
                  Daily
                </p>
              </button>
              <button
                type="button"
                onClick={() => setDuration("Weekly")}
                className={`rounded-full
                      px-4
                      xl:px-6
                      py-2
                      text-dark
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      hover:bg-black hover:bg-opacity-5
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                      text-gray-400
                        ${duration === "Weekly"
                    ? ` border m-1 font-semibold grad-text-color shadow-md text-violet-700 ${theme === "light"
                      ? ""
                      : "bg-neutral-900 shadow-black border-neutral-800"
                    }`
                    : ""
                  }`}
              >
                <p
                  className={`sm:text-xs ${duration === "Weekly" ? " link" : ""
                    }`}
                >
                  Weekly
                </p>
              </button>
              <button
                type="button"
                onClick={() => setDuration("Monthly")}
                className={`rounded-full
                      px-6
                      py-2
                      text-dark
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      hover:bg-black hover:bg-opacity-5
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                      text-gray-400
                        ${duration === "Monthly"
                    ? ` border m-1 font-semibold grad-text-color shadow-md text-violet-700 ${theme === "light"
                      ? ""
                      : "bg-neutral-900 shadow-black border-neutral-800"
                    }`
                    : ""
                  }`}
              >
                <p
                  className={`sm:text-xs ${duration === "Monthly" ? " link" : ""
                    }`}
                >
                  Monthly
                </p>
              </button>
              <button
                type="button"
                onClick={() => setDuration("Yearly")}
                className={`rounded-full
                      px-6
                      py-2
                      text-dark
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      hover:bg-black hover:bg-opacity-5
                      focus:outline-none focus:ring-0
                      transition
                      duration-150
                      ease-in-out
                
                      text-gray-400
                       ${duration === "Yearly"
                    ? ` border m-1 font-semibold grad-text-color shadow-md text-violet-700 ${theme === "light"
                      ? ""
                      : "bg-neutral-900 shadow-black border-neutral-800"
                    }`
                    : ""
                  }`}
              >
                <p
                  className={`sm:text-xs ${duration === "Yearly" ? " link" : ""
                    }`}
                >
                  Yearly
                </p>
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="mx-2 mt-1">
              <input
                type="text"
                className="flex p-2 w-28 md:w-40 shadow boreder border-slate-800 rounded-full"
                placeholder="Search DApp"
                onChange={(e) => {
                  // console.log(e.target.valuea, "adsasd");
                  setSearchText(e.target.value);
                }}
              />
            </div>
            <Listbox value={filter} onChange={(e) => handleFilter(e)}>
              <div className="mt-1 mx-2">
                <Listbox.Button
                  className={`border ${theme === "light"
                    ? "border-white shadow shadow-white concave"
                    // : "bg-dark shadow-lg shadow-neutral-800 border-black "
                    : "bg-dark concave-dark"
                    }  rounded-full relative cursor-pointer py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
                >
                  <span className="block truncate text-gray-400">
                    {filter.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className={`absolute mt-1 z-40 max-h-60 ${theme === "light" ? "bg-white" : "bg-black"
                      } overflow-auto rounded-md py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                  >
                    {Filter.map((data, dataIdx) => (
                      <Listbox.Option
                        key={dataIdx}
                        className={({ active }) =>
                          `cursor-pointer select-none py-2 pl-4 pr-4 
                                ${theme === "light"
                            ? "text-gray-900"
                            : "text-white"
                          }
                                ${active ? "bg-amber-100 text-amber-900" : ""}`
                        }
                        value={data}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected
                                ? "text-gray-400 font-medium"
                                : "font-normal"
                                }`}
                            >
                              {data.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <Listbox value={category} onChange={(e) => handleCategory(e)}>
              <div className="mt-1">
                <Listbox.Button
                  className={`border ${theme === "light"
                    ? "border-white shadow shadow-white concave"
                    : "bg-dark filter-shadow concave-dark"
                    }  rounded-full relative cursor-pointer  py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
                >
                  <span className="block truncate text-gray-400">
                    {category.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    className={`absolute z-40 mt-1 max-h-60 overflow-auto ${theme === "light" ? "bg-white" : "bg-black"
                      }  rounded-md  py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
                  >
                    {Category.map((data, dataIdx) => (
                      <Listbox.Option
                        key={dataIdx}
                        className={({ active }) =>
                          `cursor-pointer select-none py-2 pl-4 pr-4 
                              
                                ${theme === "light"
                            ? "text-gray-900"
                            : "text-white"
                          }

                                ${active ? "bg-amber-100 text-amber-900" : ""}`
                        }
                        value={data}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected
                                ? "text-gray-400 font-medium"
                                : "font-normal"
                                }`}
                            >
                              {data.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex flex-col justify-between p-2 max-w-7xl mx-auto">
          <div
            className={` hidden lg:inline-flex r py-4 rounded-md ${theme === "light" ? "bg-white" : "bg-neutral-800"
              }`}
          >
            <div className="flex grid grid-cols-8 gap-2 jusitfy-between space-x-10 ">
              <div className="px-2">
                <div className="flex cursor-default">
                  Rank

                  <Popover className="relative help ">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>
                        The rank is calculated from different metrics (incl.
                        Price, Page views, status & more).
                        <br />
                        Keep in mind: the rank is not an exact metric to
                        determine the value of an app.
                      </span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div
                  className="flex cursor-default">
                  Project
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Name of DApps coming to PLS</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div
                  className="component-ranking-table-dau-head cursor-default"
                >
                  Page Views
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Amount of overall page visits</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-tx-head cursor-default">
                  Status
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Current status of development</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-volume-head cursor-default">
                  Ticker
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Project Ticker Symbol</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-volume-head cursor-default">

                  Sacrifice
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Project is raising capital</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-rewards-head head-link cursor-default">

                  Total Supply
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Total Amount of Tokens</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
              <div className="">
                <div className="component-ranking-table-rewards-head cursor-default">

                  Vote
                  <Popover className="relative help">
                    <Popover.Button className="help-inner">i</Popover.Button>

                    <Popover.Panel className="absolute w-max bg-black text-white p-2 rounded-xl z-10">
                      <span>Give your feedback</span>

                      <img src="/solutions.jpg" alt="" />
                    </Popover.Panel>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          {data &&
            !isLoading &&
            data.length > 0 &&
            data.map((res, i) => {
              return (
                <div key={i} className='rb-shadow1'>
                  <Tbody
                    index={i + 1}
                    name={res.name}
                    logo={res.logo}
                    short_description={res.short_description}
                    types={res.type}
                    app_status={res.app_status}
                    id={res.objectId}
                    handle={res.handle}
                    likes={res.likes ? res.likes : 0}
                    dislikes={res.dislikes ? res.dislikes : 0}
                    page_views={res.page_views ? res.page_views : 0}
                    sacrifice={res.sacrifice ? res.sacrifice : "-"}
                    ticker={res.ticker ? res.ticker : "-"}
                    total_supply={res.total_supply ? res.total_supply : "-"}
                  />
                </div>
              );
            })}

          {isLoading && (
            <>
              <p className="p-6 text-center">Loading...</p>
            </>
          )}

          {data && !isLoading && data.length == 0 && (
            <>
              <p className="p-6 text-center">No Data Found</p>
            </>
          )}
        </div>
      </div> */}
      <Footer />
    </Fragment>
  );
}
