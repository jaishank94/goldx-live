import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";

export default function Footer() {
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
        className={`text-center relative bottom-0 w-full shadow`}
      >
        <div className={theme === "dark" ? "bg-neutral-800" : "bg-white"}>
          <ul className="flex justify-center p-2 flex-wrap cursor-pointer items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li className="p-2">
              <a
                className="  mr-4 hover:underline md:mr-6"
                onClick={() => router.push("/stats")}
              >
                Stats
              </a>
            </li>
            <li className="p-2">
              <a
                className="  mr-4 hover:underline md:mr-6"
                onClick={() => router.push("/createDapp")}
              >
                Submit your Dapp
              </a>
            </li>
            <li className="p-2">
              <a
                className="  mr-4 hover:underline md:mr-6 "
                onClick={() => router.push("/dappRemoval")}
              >
                Request Removal
              </a>
            </li>
            <li className="p-2">
              <a
                className="mr-4 hover:underline md:mr-6 "
                onClick={() => router.push("/dappAbusive")}
              >
                Report Abuse
              </a>
            </li>
            <li className="p-2">
              <a
                className="mr-4 hover:underline md:mr-6 "
                onClick={() => router.push("/aboutUs")}
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <div className="w-full py-2 grid grid-rows-2 grid-flow-col gap-2 md:grid-rows-1 bg-black items-center bg-[#EDF1F4] dark:bg-neutral-900">
        <div className="cursor-pointer text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} PulseChainProjects.io | All Rights
          Reserved
        </div>
        <div className="">
          <p className="cursor-pointer text-sm text-center text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {" "}
            Built by the Community | Version: 0.0.3
          </p>
        </div>
      </div>
    </Fragment>
  );
}
