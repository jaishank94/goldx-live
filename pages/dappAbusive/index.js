import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import { useRouter } from "next/router";
import Moralis from "moralis";
import toast, { Toaster } from "react-hot-toast";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Footer from "../components/Footer";
import { useTheme } from "next-themes";

export default function index() {
  const router = useRouter();
  const [project_url, setProjectUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);
  const { query } = useRouter();
  const { url } = query;

  useEffect(() => {
    setProjectUrl(url);
  }, [url]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reportDapp = async () => {
    if (!project_url || project_url === "") {
      toast.error("Project URL cannot be empty");

      return;
    }

    setLoading(true);
    try {
      const DappReport = Moralis.Object.extend("DappReport");
      const newObject = new DappReport();
      newObject.set("project_url", project_url);
      newObject.set("status", "ACTIVE");
      let response = await newObject.save();
      toast.success("Succefully submited");
      setProjectUrl("");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="min-h-screen max-h-full bg-[#EDF1F4] dark:bg-neutral-900">
        <Toaster position="top-right" />

        <div
          className={`w-full ${
            theme === "light" ? "border-b" : "border-b-0 bg-neutral-800"
          } border-slate-300 mb-5`}
        >
          <Header displayCreate={false} />
        </div>
        <div className="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 md:px-28 lg:px-72">
          <div className={`w-full`}>
            <div
              className={`flex flex-col p-6 items-center rounded-2xl text-2xl justify-center border ${
                theme === "light"
                  ? " border-slate-50 bg-slate-100"
                  : " border-neutral-800 bg-neutral-800"
              }`}
            >
              <p className="font-bold my-2">Report Abusive Projects</p>
              <p className="font-normal text-neutral-500 text-sm py-4">
                Do you see a SCAM project? Let us know..
              </p>
            </div>
            <div className="flex justify-center items-center py-4 w-full">
              <input
                type="text"
                className={`form-control w-full rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                id="youtube"
                name="youtube"
                placeholder="Enter project link"
                value={project_url}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center py-6">
              <button
                disabled={isLoading}
                onClick={() => reportDapp()}
                className="cursor-pointer w-full rounded-full p-2 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-sm text-white"
              >
                {isLoading
                  ? "Submitting..."
                  : "I think this DApp is a SCAM or Malicious"}
              </button>
            </div>
            <div className="flex justify-center items-center my-16">
              {/* <div className="w-18"> */}
              <button
                onClick={() => router.push("/")}
                className="flex items-center rounded-full shadow-2xl"
              >
                <BsFillArrowLeftCircleFill className="h-5 w-5 mx-2" />
                <p>Back to home</p>
              </button>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
