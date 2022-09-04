import React, { Fragment, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";
import { Listbox, Transition, Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "next-themes";
import {
  BsFillMoonFill,
  BsFillSunFill,
  BsWallet2,
  BsWallet,
  BsPower,
  BsMenuApp,
} from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { useMoralis } from "react-moralis";
import Sidebar from "./Sidebar";
import Link from "next/link";

const Header = ({ displayCreate }) => {
  const router = useRouter();
  const { authenticate, isAuthenticated, user, isInitialized, logout } =
    useMoralis();

  const { theme, setTheme } = useTheme("light");
  const [isMounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated]
  );

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isMounted) return null;

  return (
    <>
      {/* <header className="sticky top-0 left-0 right-0 z-[110] border-b border-gray-200 dark:bg-black bg-opacity-30 py-4 backdrop-blur-lg backdrop-filter dark:border-gray-700 light:bg-gradient-to-r from-gray-600 to-slate-300"> */}
      <header className="sticky top-0 left-0 right-0 z-[110] border-b border-gray-200 dark:bg-black py-4 bg-[#f4eddfd1] dark:border-gray-700 light:bg-gradient-to-r from-gray-600 to-slate-300">
        <Head>
          <title>gold.live</title>
          <link rel="icon" href="/favicon.png" />
          <link
            href="https://fonts.cdnfonts.com/css/samsung-sharp-sans"
            rel="stylesheet"
          />
          <link
            href="https://fonts.cdnfonts.com/css/gordita"
            rel="stylesheet"
          />
        </Head>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 xl:max-w-7xl xl:px-0 ">
          <Link className="" href="/">
            <div className="flex items-center cursor-pointer">
              <img
                src="/images/gold-live-logo.png"
                width={50}
                height={50}
                className="stroke-slate-500"
              />
              <p className="font-bold md:text-3xl text-xl ml-1 font-logo-font outline-4 text-stroke hidden lg:block">
                <span className="text-gold-200">gold.</span>
                <span className="text-gold-100/60">live</span>
              </p>
            </div>
          </Link>
          <nav className="flex items-start sm:justify-center space-x-4 lg:block hidden">
            {[
              ["Valuation", "/valuation"],
              ["Strategic Asset", "/strategic-asset"],
              ["Gold News", "/gold-news"],
              ["Blogs", "/blogs"],
              ["Advertise", "/advertise"],
              ["Pricing", "/pricing"],
            ].map(([title, url]) => (
              <Link href={url}>
                <span className="px-3 py-2 sm:text-xs md:text-sm uppercase cursor-pointer">
                  {title}
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-5">
            <button
              className={`rounded-full border border-slate-200 dark:border-neutral-600 p-2 "
              } cursor-pointer md:rounded-full`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
              {/* search icon */}
            </button>
            <button className="rounded-full cursor-pointer border p-2 text-white bg-gradient-to-r from-gold-300 to-gold-100 bg-gradient-90 shadow-sm shadow-slate-600">
              <span className="p-2 font-bold  uppercase">Crypto 100</span>
            </button>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="cursor-pointer border p-2 rounded-full m-1 border-slate-200 dark:border-neutral-900"
            >
              {theme === "light" ? (
                <BsFillMoonFill className="h-5 w-5" />
              ) : (
                <BsFillSunFill className="h-5 w-5" />
              )}
            </button>
            {displayCreate && (
              <button
                onClick={() => handleSidebar()}
                className="focus:outline-none  block lg:hidden border p-2 rounded-full m-1 border-slate-200 dark:border-neutral-900"
              >
                <BiMenuAltRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </header>
      <Sidebar isOpen={isOpen} />
    </>
  );
};

export default Header;
