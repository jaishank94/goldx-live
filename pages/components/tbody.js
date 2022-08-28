import React, { useEffect, useState } from "react";
import Moralis from "moralis";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import {
  BsHandThumbsUpFill,
  BsHandThumbsUp,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
} from "react-icons/bs";
import logo from "/public/images/pp_final_icon_black.png";
import Image from "next/image";
import Link from "next/link";

function Tbody(props) {
  const { authenticate, isAuthenticated, user } = useMoralis();
  const [like, setLike] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [dislike, setDislike] = useState("");
  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDisLikeCount] = useState(props.dislikes);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      getUserReaction(true);
      getUserReaction(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function getDisplayType(val) {
    try {
      let TypeLength = val ? val.length : 0;
      let TypeBadge = "";
      let bgColors = ["bg-blue-500", "bg-rose-500"];

      if (TypeLength > 0) {
        if (TypeLength > 2) {
          let restCount = TypeLength - 2;
          TypeBadge = val.slice(0, 2).map((type, index) => {
            return (
              <div
                key={index}
                className={`text-center truncate px-1 text-xs rounded truncate font-semibold
                ${bgColors[index]}
                 ${theme === "light" ? " text-white" : ""}
                `}
              >
                <span className="w-3/4">{type}</span>
              </div>
            );
          });
          return <>{TypeBadge}</>;
        } else {
          TypeBadge = val.map((type, index) => {
            return (
              <div
                key={index}
                className={`text-center text-xs px-1 rounded font-semibold truncate 
                ${bgColors[index]}
                ${theme === "light" ? "text-white" : ""}`}
              >
                <span className="w-3/4">{type}</span>
              </div>
            );
          });
          return TypeBadge;
        }
      }
    } catch (e) {}
  }

  const handleReaction = async (isLiked) => {
    setDisabled(true);

    try {
      let isExists = await getUserReaction(isLiked);
      if (isAuthenticated && !isExists) {
        const DappVotes = Moralis.Object.extend("DappVotes");
        const Dapps = Moralis.Object.extend("Dapps");

        const newDapObject = new Dapps();
        newDapObject.id = props.id;

        const query = new Moralis.Query(Dapps);
        query.equalTo("objectId", props.id);
        const response = await query.first();

        const query2 = new Moralis.Query(DappVotes);
        query2.equalTo("user", user.get("ethAddress"));
        query2.equalTo("dapp", newDapObject);
        const response2 = await query2.first();

        if (response) {
          const newLikesObject = new DappVotes();
          newLikesObject.set("dapp", newDapObject);
          newLikesObject.set("user", user.get("ethAddress"));
          newLikesObject.set("isLiked", isLiked);
          newLikesObject.set("status", "ACTIVE");
          await newLikesObject.save();

          if (isLiked) {
            setLike(isLiked);
            setLikeCount(likeCount + 1);
            response.increment("likes", 1);

            if (response2) {
              response.increment("dislikes", -1);
              setDislike(false);
              setDisLikeCount(dislikeCount - 1);
            }
          } else {
            setDislike(true);
            setDisLikeCount(dislikeCount + 1);
            response.increment("dislikes", 1);

            if (response2) {
              response.increment("likes", -1);
              setLike(false);
              setLikeCount(likeCount - 1);
            }
          }

          if (response2) {
            await response2.destroy();
          }
          await response.save();
        }
      }
      setDisabled(false);
    } catch (e) {
      setDisabled(false);
    }
  };

  const getUserReaction = async (isLiked) => {
    console.log("");
    try {
      if (isAuthenticated) {
        const DappVotes = Moralis.Object.extend("DappVotes");
        const Dapps = Moralis.Object.extend("Dapps");

        const newDapObject = new Dapps();
        newDapObject.id = props.id;

        const query = new Moralis.Query(DappVotes);
        query.equalTo("user", user.get("ethAddress"));
        query.equalTo("dapp", newDapObject);
        query.equalTo("isLiked", isLiked);
        const response = await query.first();

        if (response) {
          if (response.get("isLiked")) {
            setLike(true);
          } else {
            setDislike(true);
          }
        }
        return response;
      }
    } catch (e) {
      console.log(e);
    }
  };
  if (!isMounted) return null;

  return (
    <div className="table-body mt-5" key={props.index}>
      <div className="table-rows lg:flex">
        <div className="rounded-lg lg:border-0 table-data hidden  lg:flex col-rank lg:bg-none">
          <div className="">
            <span className="current-rank cursor-default">{props.index}</span>
            {/* <span className="list-disc text-2xl">.</span> */}
            <span className="past-rank"></span>
          </div>
        </div>
        <div className="hover:bg-gradient-to-r hover:from-purple-400 hover:mx-auto hover:to-pink-600 rounded-2xl">
          <div className="shadow-inner hover:shadow-none shadow-gray-400 dark:shadow-black rounded-2xl bg-white dark:bg-neutral-900 m-1">
            <div
              className={`flex flex-col lg:grid lg:grid-cols-8 lg:gap-2 py-4 border rounded-2xl shadow-lg w-full lg:py-0 lg:justify-left lg:flex-row  ${
                theme === "light"
                  ? "border-white"
                  : "border-neutral-800 shadow-neutral-800"
              }`}
            >
              <a
                href={"/dapps/" + props.handle}
                target="_blank"
                className="flex justify-start lg:col-span-2"
              >
                {/* <div > */}
                <div className="flex justify-center items-center relative h-32 w-32">
                  <div className="rounded-2xl object-fill shadow-lg ">
                    {/* <div className="w-1/4 flex items-center justify-center mx-2"> */}
                    {props.logo && props.logo !== "" ? (
                      <img
                        alt="Logo"
                        src={props.logo}
                        width={80}
                        height={80}
                        className={` shadow-xl rounded-2xl ${
                          theme === "light"
                            ? "border border-gray-200 shadow-white"
                            : "border border-neutral-800 shadow-neutral-800"
                        }`}
                      />
                    ) : (
                      <Image
                        src={logo}
                        width={80}
                        height={80}
                        className={` shadow-xl rounded-2xl ${
                          theme === "light"
                            ? "border border-gray-200 shadow-white"
                            : "border border-neutral-800 shadow-neutral-800"
                        }`}
                      />
                    )}
                  </div>
                </div>
                <div className="my-2 flex flex-col justify-start">
                  <h5 className="text-xl font-bold mb-2 text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {props.name}
                  </h5>
                  <p className="text-sm font-normal mb-4 w-28 truncate">
                    {props.short_description}
                  </p>
                  <p className="grid grid-cols-2 gap-2 truncate">
                    {" "}
                    {getDisplayType(props.types)}
                  </p>
                </div>
                {/* </div> */}
              </a>
              <div className="hidden lg:flex items-center justify-center text-center">
                <div className="">
                  <div className="">
                    <span className="text-sm font-semibold cursor-default">
                      {props.page_views}
                    </span>
                    {/* <div className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </div> */}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center text-center">
                <div className="">
                  <div className="">
                    <span className="uppercase text-sm font-semibold cursor-default">
                      {props.app_status}
                    </span>
                    {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex lg:flex items-center justify-center">
                <div className="">
                  <div className="">
                    <span className="text-sm font-semibold uppercase cursor-default">
                      {props.ticker}
                    </span>
                    {/* <span className="pct is-negative">-9.00%</span> */}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex lg:flex items-center justify-center">
                <div className="">
                  <div className="">
                    <span className="text-sm font-semibold uppercase cursor-default">
                      {props.sacrifice}
                    </span>
                    {/* <span className="pct is-positive">
                <span>^</span>
                154.80%
              </span> */}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex lg:flex items-center justify-center">
                <div className="">
                  <div className="">
                    <span className="text-sm font-semibold uppercase cursor-default">
                      {props.total_supply}
                    </span>
                    {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex lg:flex items-center justify-center">
                <div className="table-data flex col-rewards col-rewards-hive">
                  <div className="">
                    <span className="value flex">
                      <button
                        className="text-center"
                        disabled={isDisabled}
                        onClick={(e) => {
                          e.preventDefault();
                          isAuthenticated
                            ? handleReaction(true)
                            : authenticate();
                        }}
                      >
                        {like ? (
                          <BsHandThumbsUpFill
                            className="h-5 w-5"
                            color="blueviolet"
                          />
                        ) : (
                          <BsHandThumbsUp
                            className="h-5 w-5"
                            color="blueviolet"
                          />
                        )}

                        <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                          {likeCount}
                        </span>
                      </button>
                      <button
                        className="text-center ml-2"
                        disabled={isDisabled}
                        onClick={(e) => {
                          e.preventDefault();
                          isAuthenticated
                            ? handleReaction(false)
                            : authenticate();
                        }}
                      >
                        {dislike ? (
                          <BsHandThumbsDownFill className="h-5 w-5" />
                        ) : (
                          <BsHandThumbsDown className="h-5 w-5" />
                        )}

                        <span className="font-bold">{dislikeCount}</span>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="block lg:hidden text-center">
                <div className="grid grid-cols-2 divide-x divide-gray-700">
                  <div className="flex flex-col">
                    <p className=" my-2 text-gray-500 text-xs ">Page Views</p>
                    <p className="text-sm font-semibold cursor-default">
                      {props.page_views}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className=" my-2 text-gray-500 text-xs ">Status</p>
                    <p className="text-sm font-semibold cursor-default uppercase">
                      {props.app_status}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x mt-14 divide-gray-700">
                  <div className="flex flex-col">
                    <p className=" my-2 text-gray-500 text-xs ">Ticker</p>
                    <p className="text-sm font-semibold cursor-default uppercase">
                      {props.ticker}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className=" my-2 text-gray-500 text-xs ">Sacrifice</p>
                    <p className="text-sm font-semibold cursor-default uppercase">
                      {props.sacrifice}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className=" my-2 text-gray-500 text-xs ">Total Supply</p>
                    <p className="text-sm font-semibold cursor-default uppercase">
                      {props.total_supply}
                    </p>
                  </div>
                </div>
                <div className="border-t-2 mt-14 border-gray-700">
                  <div className="grid grid-cols-2 divide-x divide-gray-700">
                    <div className="flex justify-center p-5">
                      <button
                        className="text-center"
                        disabled={isDisabled}
                        onClick={(e) => {
                          e.preventDefault();
                          isAuthenticated
                            ? handleReaction(true)
                            : authenticate();
                        }}
                      >
                        {like ? (
                          <BsHandThumbsUpFill
                            className="h-5 w-5"
                            color="blueviolet"
                          />
                        ) : (
                          <BsHandThumbsUp
                            className="h-5 w-5"
                            color="blueviolet"
                          />
                        )}
                      </button>
                      <div className="ml-2">
                        <span className="link">{likeCount}</span>
                      </div>
                    </div>

                    <div className="flex justify-center p-5">
                      <button
                        className="text-center"
                        disabled={isDisabled}
                        onClick={(e) => {
                          e.preventDefault();
                          isAuthenticated
                            ? handleReaction(false)
                            : authenticate();
                        }}
                      >
                        {dislike ? (
                          <BsHandThumbsDownFill className="h-5 w-5" />
                        ) : (
                          <BsHandThumbsDown className="h-5 w-5" />
                        )}
                      </button>
                      <div className="ml-2">
                        <span className="font-bold">{dislikeCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <a href={"/dapps/" + props.id} target="_blank">
                    <div className="p-2 px-4 mx-2 rounded-full font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-lg text-white ">
                      {" Learn More "}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tbody;
