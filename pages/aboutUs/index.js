import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import blackLogo from "/public/images/pp_final_icon_black.png";
import whiteLogo from "/public/images/pp_final_icon_white.png";
import work1 from "/public/images/1.jpg";
import work2 from "/public/images/2.jpg";
import work3 from "/public/images/3.jpg";
import work4 from "/public/images/4.jpg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsFillArrowLeftCircleFill, BsGraphUp } from "react-icons/bs";
import Footer from "../components/Footer";
import Link from "next/link";
import { GiAlienBug, GiPlatform, GiVote } from "react-icons/gi";

const faqs = [
  {
    question: "What is PulseChainProjects.io?",
    answer:
      "A ranking site for new or existing projects launching on PulseChain. ",
  },
  {
    question: "Is it free?",
    answer:
      "Yes, PulseChainProjects.io is completely free tool to use for the community. All content is user generated. ",
  },
  {
    question: "When will I see my project listing?",
    answer:
      "It takes around 12-24 hours before your listing will appear on the homepage. ",
  },
  {
    question: "How do I get my project listing? ",
    answer:
      "Visit PulseChainProjects.io/Submit-Your-Dapp, Fill-out all required fields, Be unique, don’t just copy and paste your descriptions ",
  },
  {
    question: "Why do I have to connect my wallet?",
    answer: "If you would like to upvote or downvote a project.  ",
  },
  {
    question: "If you would like to upvote or downvote a project. ",
    answer:
      "As of right now we are focusing on brand new projects launching on PulseChain. Possibly in the future we will support other blockchain listings.  ",
  },
];

const howItWorks = [
  {
    title: "Submit your DApp",
    icon: (
      <GiPlatform className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
    ),
    description:
      "Looking for new users, testers, concept feedback, partners, or investors. Suibmit your Dapp now ",
  },
  {
    title: "Upvote / Downvote",
    icon: (
      <GiVote className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
    ),
    description:
      "Upvote your favorite project. Use this feature wisely and be considerate and respectful. ",
  },
  {
    title: "Report Scams",
    icon: (
      <GiAlienBug className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
    ),
    description:
      "Help keep our community safe by reporting known scams to us. ",
  },
  {
    title: "Stats & Insights ",
    icon: (
      <BsGraphUp className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
    ),
    description:
      "Important DApp links, social media, videos, source code and popularity ",
  },
];

export default function index() {
  const router = useRouter();
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className=" bg-[#EDF1F4] dark:bg-neutral-900">
        <div className="">
          <div
            className={`w-full ${
              theme === "light" ? "border-b" : "border-b-0 bg-neutral-800"
            } border-slate-300 mb-5`}
          >
            <Header displayCreate={false} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#EDF1F4] dark:bg-neutral-900 max-w-7xl mx-auto px-4 md:px-28 lg:px-72">
            <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-3xl">
              <div
                className={`rounded-3xl border  shadow-2xl
                ${
                  theme === "light"
                    ? " border-white shadow-white"
                    : " border-black shadow-neutral-800"
                }`}
              >
                <div
                  className={`rounded-3xl border-2 z-50 shadow-xl
                  ${
                    theme === "light"
                      ? " border-slate-200 shadow-slate-200 bg-slate-100"
                      : " border-black shadow-black bg-neutral-800"
                  }`}
                >
                  <div
                    className={`flex rounded-3xl ${
                      theme === "light"
                        ? "border-slate-100 shadow-red-300 bg-slate-100"
                        : "border-black bg-neutral-800"
                    }`}
                  >
                    <div className="flex justify-center items-center relative h-32 w-32">
                      <div className="rounded-3xl object-fill border dark:border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        <Image
                          alt="logo"
                          width={80}
                          height={80}
                          className="rounded-lg h-32 w-32"
                          src={whiteLogo}
                        />
                      </div>
                    </div>
                    <div className="flex-initial px-5 xl:p-5">
                      <div className="py-4">
                        <h5 className="font-bold text-lg md:text-3xl">
                          PulseChainProjects.io
                        </h5>
                        <p className="text-neutral-500 text-sm">
                          Directory of all the projects launching on PulseChain
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center text-center text-gray-500 text-sm py-8 px-4">
                  <p className="text-neutral-500 font-normal p-8 lg:p-16 text-justify ">
                    PulseChainProjects.io is an open source tool built by the
                    HowToPulse.com team. Create a FREE listing in less than 5
                    mins. For the communities safety we will approve all listing
                    before deploying them to the site.
                    <br />
                    <br />
                    We are dedicated to providing the most up to date
                    information on all projects planning on launching.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center py-16">
              <h1 className="text-3xl font-semibold">How it works?</h1>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8  py-16">
                {howItWorks.map((val, i) => {
                  return (
                    <div className="flex items-center justify-center">
                      <div className="w-full md:w-auto py-8 shadow-2xl shadow-gray-900 dark:shadow-indigo-900 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-3xl">
                        {val.icon}
                        <p className="text-lg text-white pt-8 font-bold">
                          {val.title}
                        </p>
                        <p className="text-xs text-gray-100  pt-4 font-default dark:text-gray-200">
                          {val.description}
                        </p>
                      </div>
                      {/* <div className="p-2 md:p-4 h-72 w-64 md:w-52 shadow rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75">
                        <div className="rotate-[5deg] absolute -top-[0.5px] h-72 w-64 md:w-52 shadow border-r-4 border-t-4 border-b-4 rounded-3xl border-cyan-600 opacity-25"></div>
                      </div> */}
                    </div>
                  );
                })}
                {/* <div className="relative flex items-center justify-center">
                  <div className="px-24 md:px-16 lg:px-24 absolute z-50">
                    <GiPlatform className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
                    <p className="text-lg text-white pt-8 font-bold">
                      Submit your DApp
                    </p>
                    <p className="text-xs text-gray-100  pt-4 font-default dark:text-gray-200">
                      Looking for new users, testers, concept feedback,
                      partners, or investors. Suibmit your Dapp now
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-64 md:w-52 shadow rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75">
                    <div className="rotate-[5deg] absolute -top-[0.5px] h-72 w-64 md:w-52 shadow border-r-4 border-t-4 border-b-4 rounded-3xl border-cyan-600 opacity-25"></div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="px-24 absolute z-50">
                    <GiVote className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
                    <p className="text-lg text-white pt-8 font-bold">
                      Upvote / Downvote
                    </p>
                    <p className="text-xs text-gray-100  pt-4 font-default dark:text-gray-200">
                      Upvote your favorite project. Use this feature wisely and
                      be considerate and respectful.
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-64 md:w-52 shadow rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75">
                    <div className="rotate-[175deg] left-[70px] lg:left-[46px] absolute -top-[0.5px] h-72 w-64 md:w-52 shadow border-r-4 border-t-4 border-b-4 rounded-3xl border-cyan-600 opacity-25"></div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="px-24 absolute z-50">
                    <GiAlienBug className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
                    <p className="text-lg text-white pt-8 font-bold">
                      Report Scams
                    </p>
                    <p className="text-xs text-gray-100  pt-4 font-default dark:text-gray-200">
                      Help keep our community safe by reporting known scams to
                      us.
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-64 md:w-52 shadow rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75">
                    <div className="rotate-[5deg] absolute -top-[10px] h-72 w-64 md:w-52 shadow border-r-4 border-t-4 rounded-3xl border-rose-500 opacity-25"></div>
                  </div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="px-24 absolute z-50">
                    <BsGraphUp className="rounded-full h-16 w-16  bg-slate-200 dark:bg-black" />
                    <p className="text-lg text-white pt-8 font-bold">
                      Stats & Insights
                    </p>
                    <p className="text-xs text-gray-100  pt-4 font-default dark:text-gray-200">
                      Important DApp links, social media, videos, source code
                      and popularity
                    </p>
                  </div>
                  <div className="p-2 md:p-4 h-72 w-64 md:w-52 shadow rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75">
                    <div className="rotate-[175deg] left-[70px] lg:left-[46px] absolute -top-[10px] h-72 w-64 md:w-52 shadow border-r-4 border-b-4 rounded-3xl border-rose-500 opacity-25"></div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center py-8">
              <h1 className="text-3xl font-semibold">FAQs</h1>
              <div
                id="accordion-collapse"
                className="py-4"
                data-accordion="collapse"
              >
                {faqs.map((val, i) => {
                  return (
                    <div className="py-4" key={i}>
                      <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-3xl">
                        <div
                          className={`rounded-3xl border  shadow-2xl
                ${
                  theme === "light"
                    ? " border-white shadow-white"
                    : " border-black shadow-neutral-800"
                }`}
                        >
                          <div
                            className={`rounded-3xl border-2 z-50 shadow-xl
                  ${
                    theme === "light"
                      ? " border-slate-200 shadow-slate-200 bg-slate-100"
                      : " border-black shadow-black bg-neutral-800"
                  }`}
                          >
                            <div
                              className={`flex rounded-3xl ${
                                theme === "light"
                                  ? "border-slate-100 shadow-red-300 bg-slate-100"
                                  : "border-black bg-neutral-900"
                              }`}
                            >
                              <div className="flex justify-center items-center relative h-16 w-16 lg:h-32 lg:w-32">
                                <div className="rounded-full p-2 lg:p-4 border dark:border-0 dark:bg-neutral-800 ">
                                  <span className="p-2 text-neutral-400">
                                    {i + 1}
                                  </span>
                                </div>
                              </div>
                              <div className="flex justify-center items-center">
                                <div className="py-2 lg:py-4">
                                  <span className="text-lg font-semibold ">
                                    {val.question}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex text-gray-500 text-sm py-4 px-4">
                            <p className="text-neutral-500 font-normal p-4 text-justify ">
                              {val.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Link
              href="/"
              // className="flex item-center rounded-full shadow-2xl"
            >
              <div className="flex cursor-pointer justify-center items-center text-center text-gray-500 text-sm py-8 px-4">
                <BsFillArrowLeftCircleFill className="flex item-center rounded-full shadow-2xl h-5 w-5 mx-2" />
                <p>Back to home</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="relative w-full bottom-0">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
