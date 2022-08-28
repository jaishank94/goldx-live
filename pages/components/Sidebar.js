import { useRouter } from "next/router";
import React from "react";
import { BsTwitter, BsGithub, BsFillInfoCircleFill } from "react-icons/bs";

export default function Sidebar({ isOpen }) {
  const router = useRouter();
  return (
    <div
      className={`z-[111] w-80 absolute inset-y-0 left-0 transform   ${isOpen ? "-translate-x-0" : "-translate-x-full"
        }  transition duration-200 ease-in-out`}
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto h-full py-4 px-3 bg-gray-50 rounded dark:bg-neutral-800">
        <ul className="space-y-2">
          {[
            ['Valuation', '/valuation'],
            ['Strategic Asset', '/strategic-asset'],
            ['Gold News', '/gold-news'],
            ['Blogs', '/blogs'],
            ['Advertise', '/advertise'],
          ].map(([title, url]) => (
            <li><a href={url} className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 uppercase">{title}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
