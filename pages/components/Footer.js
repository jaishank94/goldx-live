import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { BsTwitter, BsGithub } from "react-icons/bs";
import GoldBarsImg from "../../public/images/gold-bars.png"

const Footer = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <Fragment>
      <footer
        className='text-center relative bottom-0 w-full pt-48 mt-48 bg-white dark:bg-neutral-800'>
        <div className=" max-w-7xl absolute -top-36 left-0 right-0 rounded-3xl md:mx-auto bg-[url('/images/footer-image.jpg')] bg-cover object-fill p-10">
          <div className="flex justify-between">
            <div className="md:w-1/2 text-left">
              <p className="text-3xl md:text-6xl text-white font-bold">
                Fuse Gold
              </p>
              <p className="text-white">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.</p>
              <button className="rounded-full cursor-pointer border mx-auto mt-6 p-2 text-xl bg-black shadow-lg shadow-inner shadow-gold-400">
                <span className="p-2 text-sm text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">
                  Learn More
                </span>
              </button>
            </div>
            <div className="hidden md:block absolute right-0 -top-6">
              <img src="/images/gold-bars.png" className="w-1/4 md:w-10/12" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-neutral-800">
          <div className="my-6">
            <p className="font-bold md:text-3xl text-xl ml-1 font-logo-font outline-4 hidden lg:block">
              <span className="text-gold-200">gold.</span>
              <span className="text-gold-100/60">live</span>
            </p>
          </div>
          <ul className="flex justify-center p-2 w-full flex-wrap cursor-pointer items-center mt-3 text-xs font-medium text-gray-500 dark:text-gray-400 sm:mt-0 uppercase border-none">
            {[
              ['Valuation', '/valuation'],
              ['Strategic Asset', '/strategic-asset'],
              ['Gold News', '/gold-news'],
              ['Blogs', '/blogs'],
              ['Advertise', '/advertise'],
              ['Privacy Policy', '/privacy'],
              ['Terms & Conditions', '/tnc'],
            ].map(([title, url]) => (
              <li><a href={url} className="mr-4 hover:underline md:mr-6">{title}</a></li>
            ))}
          </ul>
        </div>
      </footer>
      <div className="w-full py-2 bg-black items-center bg-[#EDF1F4] dark:bg-neutral-900 ">
        <div className="cursor-pointer text-sm text-gray-500 text-center uppercase">
          © {new Date().getFullYear()} Gold.Live. All Rights
          Reserved
        </div>
      </div>
      <div className="bg-repeat-space bg-gradient-to-r from-gold-300 to-gold-100 h-2"></div>
    </Fragment>
  );
}

export default Footer