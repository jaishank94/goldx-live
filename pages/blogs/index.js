import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BsBell } from 'react-icons/bs';
import { useTheme } from "next-themes";
import Tabs from "../components/Tabs";

const Blogs = () => {
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
              <p className="mx-2"> News Articles</p>
            </div>
            <p className="mt-6 font-normal text-sm text-slate-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem toto celobeso.</p>
          </div>
          <Tabs color="pink" />
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}
export default Blogs 