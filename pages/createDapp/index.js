import React, { Component, Fragment, useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import Moralis from "moralis";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  BsFillArrowLeftCircleFill,
  BsPlus,
  BsDash,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsYoutube,
  BsTelegram,
  BsReddit,
  BsMedium,
  BsDiscord,
  BsGithub,
} from "react-icons/bs";
import { AiFillGitlab } from "react-icons/ai";
import { IoLogoBitbucket } from "react-icons/io";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Modal from "../components/Modal";
import Link from "next/link";

const validation = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  short_description: Yup.string().required("This field is required"),
  full_description: Yup.string().required("This field is required"),
  website_url: Yup.string().required("This field is required"),
  // logo_url: Yup.string().required("This field is required"),
  ticker: Yup.string().required("This field is required"),
  total_supply: Yup.string().required("This field is required"),
  facebook: Yup.string().matches(
    /^http(s*):\/\/(www.)*facebook\.com\/[a-zA-Z0-9.]+$/i,
    "Please enter valid facebook URL"
  ),
  youtube: Yup.string().matches(
    /^http(s*):\/\/(www.)*youtube\.com\/channel\/[a-zA-Z0-9_.]+$/i,
    "Please enter valid youtube URL."
  ),
  youtube_embed: Yup.string().matches(
    /^http(s*):\/\/(www.)*youtube\.com\/embed\/[a-zA-Z0-9_.]+$/i,
    "Please enter valid youtube embed URL."
  ),
  twitter: Yup.string().matches(
    /^http(s*):\/\/(www.)*twitter\.com\/[a-zA-Z0-9.]+$/i,
    "Please enter valid twitter URL"
  ),
  instagram: Yup.string().matches(
    /^http(s*):\/\/(www.)*instagram\.com\/[a-zA-Z0-9.]+$/i,
    "Please enter valid instagram URL"
  ),
  telegram: Yup.string().matches(
    /^http(s*):\/\/t\.me\/[a-zA-Z0-9.]+$/i,
    "Please enter valid telegram URL"
  ),
  reddit: Yup.string().matches(
    /^http(s*):\/\/(www.)*reddit\.com\/[a-zA-Z0-9]*\/[a-zA-Z0-9.]+$/i,
    "Please enter valid reddit URL"
  ),
  medium: Yup.string().matches(
    /^http(s*):\/\/[a-zA-Z0-9.]*medium\.com+$/i,
    "Please enter valid medium URL"
  ),
  github: Yup.string().matches(
    /^http(s*):\/\/(www.)*github\.com\/[a-zA-Z0-9.]+$/i,
    "Please enter valid github URL"
  ),
  discord: Yup.string().matches(
    /^http(s*):\/\/(www.)*discord\.gg\/[a-zA-Z0-9.]+$/i,
    "Please enter valid discord URL"
  ),
  gitlab: Yup.string().matches(
    /^http(s*):\/\/(www.)*gitlab\.com\/[a-zA-Z0-9.]+$/i,
    "Please enter valid gitlab URL"
  ),
  bitbuket: Yup.string().matches(
    /^http(s*):\/\/(www.)*bitbuket\.com\/[a-zA-Z0-9.]+$/i,
    "Please enter valid bitbuket URL"
  ),
  smart_contract_address: Yup.string().matches(
    /^0x[a-zA-Z0-9.]+$/i,
    "Please enter valid smart contract address ex: 0xAb....."
  ),
});

// facebook,
// twitter,
// instagram,
// youtube,
// telegram,
// reddit,
// medium,
// github,
// discord,
// gitlab,
// bitbuket,

const AppStatus = [
  { name: "Live" },
  { name: "Beta" },
  { name: "Alpha" },
  { name: "Work in Progress" },
];

const SacrificeValues = [
  { name: "Yes" },
  { name: "No" },
  { name: "Coming Soon" },
];
const hiringValues = [{ name: "Yes" }, { name: "No" }];

const Category = [
  { name: "Games" },
  { name: "Entertainment" },
  { name: "Exchanges" },
  { name: "DeFi" },
  { name: "MarketPlaces" },
  { name: "Governance" },
  { name: "Yield-farming" },
  { name: "Property" },
  { name: "Tools" },
  { name: "Identity" },
  { name: "Energy" },
  { name: "Insurance" },
  { name: "Storage" },
  { name: "NFT" },
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

const ProjInformation = [{ name: "Airdrop" }, { name: "Sacrifice Phrase" }];

const exampleTags = ["NFT", "Marketplace", "Crypto"];

const initialValues = {
  name: "",
  short_description: "",
  full_description: "",
  website_url: "",
  // app_status: "Live",
  // category: [],
  // project_information: "Airdrop",
  tag: "",
  // tag_arr: [],
  facebook: "",
  youtube_embed: "",
  // logo_url: "",
  twitter: "",
  instagram: "",
  youtube: "",
  github: "",
  discord: "",
  gitlab: "",
  ticker: "",
  total_supply: "",
  isSubmitting: false,
};

export default function index() {
  const router = useRouter();
  const [formValues, setformValues] = useState(initialValues);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme("dark");
  const [isMounted, setMounted] = useState(false);
  const [tags, setTags] = useState("");
  const [hiring, setHiring] = useState(false);
  const [projectInformation, setProjectInformation] = useState("None");
  const [category, setCategory] = useState(["Games"]);
  const [tagArr, setTagArr] = useState([]);
  const [appStatus, setAppStatus] = useState("Live");
  const [sacrifice, setSacrifice] = useState("Yes");
  const [file, setFile] = useState(null);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFormData = (values) => {
    // console.log("getFormData::", values);
  };

  const removeTag = (removeData) => {
    // this.setState({ tag_arr: this.state.tag_arr });
  };

  const setSocilaMedia = (e) => {
    console.log("ljhck", e.target.value);
  };

  // const resetForm = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     name: "",
  //     short_description: "",
  //     full_description: "",
  //     website_url: "",
  //     logo_url: "",
  //     app_status: "",
  //     category: ["Games"],
  //     project_information: "None",
  //     tag: "",
  //     tag_arr: [],
  //     facebook: "",
  //     twitter: "",
  //     instagram: "",
  //     youtube: "",
  //     telegram: "",
  //     reddit: "",
  //     medium: "",
  //     github: "",
  //     discord: "",
  //     gitlab: "",
  //     bitbuket: "",
  //     sacrifice: "Yes",
  //     total_supply: "",
  //     ticker: "",
  //     isSubmitting: false,
  //   });
  // };

  const submitApp = async (event) => {
    event.preventDefault();
    const {
      name,
      handle,
      short_description,
      full_description,
      website_url,
      facebook,
      twitter,
      instagram,
      youtube,
      telegram,
      reddit,
      medium,
      github,
      discord,
      gitlab,
      bitbuket,
      // logo_url,
      ticker,
      total_supply,
      email,
      youtube_embed,
      smart_contract_address,
    } = formValues;

    try {
      if (
        facebook !== "" ||
        instagram !== "" ||
        twitter !== "" ||
        reddit !== "" ||
        discord !== "" ||
        medium !== "" ||
        telegram !== "" ||
        youtube !== "" ||
        youtube_embed !== "" ||
        github !== "" ||
        gitlab !== "" ||
        bitbuket !== "" ||
        smart_contract_address !== ""
      ) {
        let fVal = {
          name,
          short_description,
          full_description,
          ticker,
          // logo_url,
          file,
          website_url,
          total_supply,
        };

        if (facebook !== "") {
          await validation.validate({
            ...fVal,
            facebook,
          });
        }
        if (instagram !== "") {
          await validation.validate({
            ...fVal,
            instagram,
          });
        }
        if (twitter !== "") {
          await validation.validate({
            ...fVal,
            twitter,
          });
        }
        if (telegram !== "") {
          await validation.validate({
            ...fVal,
            telegram,
          });
        }
        if (discord !== "") {
          await validation.validate({
            ...fVal,
            discord,
          });
        }
        if (reddit !== "") {
          await validation.validate({
            ...fVal,
            reddit,
          });
        }
        if (youtube !== "") {
          await validation.validate({
            ...fVal,
            youtube,
          });
        }
        if (youtube_embed !== "") {
          await validation.validate({
            ...fVal,
            youtube_embed,
          });
        }
        if (github !== "") {
          await validation.validate({
            ...fVal,
            github,
          });
        }
        if (gitlab !== "") {
          await validation.validate({
            ...fVal,
            gitlab,
          });
        }
        if (bitbuket !== "") {
          await validation.validate({
            ...fVal,
            bitbuket,
          });
        }
        if (smart_contract_address !== "") {
          await validation.validate({
            ...fVal,
            smart_contract_address,
          });
        }
        if (medium !== "") {
          await validation.validate({
            ...fVal,
            medium,
          });
        }
      }
    } catch (e) {
      toast.error("Please fill all the (*) fields and enter valid details.");
      return;
    }

    // save image to IPFS

    const file1url = "";
    if (file) {
      const file1 = new Moralis.File(file.name, file);
      await file1.saveIPFS();
      file1url = file1.ipfs();
    }

    if (
      name !== "" &&
      // handle !== "" &&
      short_description !== "" &&
      full_description !== "" &&
      website_url !== "" &&
      // logo_url !== "" &&
      file1url &&
      ticker !== "" &&
      appStatus !== "" &&
      category.length &&
      projectInformation !== "" &&
      total_supply !== "" &&
      tagArr.length
    ) {
      let snc = {
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
        youtube: youtube,
        telegram: telegram,
        reddit: reddit,
        medium: medium,
        discord: discord,
      };

      let code = {
        github: github,
        bitbuket: bitbuket,
        gitlab,
      };

      try {
        setIsSubmitting(true);
        const Dapps = Moralis.Object.extend("Dapps");
        const newObject = new Dapps();
        newObject.set("name", name.trim().toUpperCase());
        newObject.set("short_description", short_description.trim());
        newObject.set("full_description", full_description.trim());
        newObject.set("website_url", website_url.trim());
        newObject.set("ticker", ticker.trim());
        newObject.set("logo", file1url);
        newObject.set("sacrifice", sacrifice.trim());
        newObject.set("total_supply", total_supply.trim());
        newObject.set("app_status", appStatus);
        newObject.set("type", category);
        newObject.set("tag", tagArr);
        newObject.set("sns", snc);
        newObject.set("code", code);
        newObject.set("page_views", 0);
        newObject.set("project_information", projectInformation);
        newObject.set("email", email ? email.trim() : "");
        newObject.set("smart_contract_address", smart_contract_address);
        newObject.set("youtube_embed", youtube_embed);
        newObject.set("hiring", hiring ? "Yes" : "No");
        newObject.set("status", "IN-ACTIVE");
        let response = await newObject.save();
        let result = JSON.parse(JSON.stringify(response));
        if (result) {
          // toast.success("Succefully submited");
          setSuccess(true);
          setformValues({
            name: "",
            short_description: "",
            full_description: "",
            website_url: "",
            // logo_url: "",
            ticker: "",
            tag: "",
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
            telegram: "",
            reddit: "",
            medium: "",
            github: "",
            discord: "",
            gitlab: "",
            bitbuket: "",
            total_supply: "",
            youtube_embed: "",
            isSubmitting: false,
          });
          setTagArr([]);
          setCategory(["Games"]);
          setProjectInformation("None");
          setAppStatus("Live");
          setSacrifice("Yes");
          setTags("");
          setHiring(false);
          setFile(null);
        } else {
          toast.error("Some Error Occured..! Please try again.");
        }
        setIsSubmitting(false);
      } catch (error) {
        toast.error("Some Error Occured..!! Please try again.");
        setIsSubmitting(false);
      }
    } else {
      toast.error("Please fill all the (*) fields.");
    }
  };

  if (!isMounted) return null;

  return (
    <Fragment>
      <div className="min-h-screen max-h-full  bg-[#EDF1F4] dark:bg-neutral-900">
        <Toaster position="top-right" />
        <div className="bg-[#EDF1F4] dark:bg-neutral-800">
          <div
            className={`w-full ${
              theme === "light" ? "border-b" : "border-b-0 bg-neutral-800"
            } border-slate-300 mb-5`}
          >
            <Header displayCreate={false} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between p-4 max-w-7xl mx-auto">
            {/* <div className="flex justify-between items-center py-6 sm:px-0 xl:px-16 md:justify-center md:space-x-10"> */}
            <div className="w-18 flex ">
              <Link href="/">
                <div className="flex item-center cursor-pointer rounded-full shadow-2xl">
                  <BsFillArrowLeftCircleFill className="h-12 w-12" />
                </div>
              </Link>
              <div className="p-3 mx-6 xl:w-4/5 text-center">
                <p className="font-bold text-2xl">Submit a DApp</p>
              </div>
            </div>
          </div>
          <div className="bg-[#EDF1F4] dark:bg-neutral-900 max-w-7xl mx-auto px-4 md:px-28 lg:px-72">
            <p
              className={`text-sm ${
                theme === "light"
                  ? "shadow-white border-white bg-slate-200"
                  : "shadow-neutral-800 border-black bg-neutral-900"
              } rounded-xl border-4 shadow-md font-bold text-left p-4`}
            >
              Whether you are looking for new users, testers, concept feedback,
              partners, or investors, submitting a DApp (Decentralized
              Application) to this definitive registry will help your project
              gain traction.
              <br />
              <br />
              We welcome DApps at any stage in the product life-cycle (concepts
              are encouraged), or even DApps that you didn't make but noticed
              are missing. Email support@pulsechainprojects.io if you have any
              questions!
              <br />
              <br />
              Email{" "}
              <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                support@pulsechainprojects.io
              </span>{" "}
              if you have any questions!
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validation}
            // onSubmit={submitApp}
          >
            {({
              values,
              errors,
              touched,
              handleChange,

              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              resetForm,
            }) => {
              setformValues(values);
              // getFormData(values);
              return (
                <Form>
                  <div className="max-w-7xl mx-auto px-4 md:px-28 lg:px-72">
                    <div className="flex flex-col items-center justify-center">
                      <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="App Name *"
                          value={formValues.name}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.name && errors.name ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={50}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: PulseChainProjects)
                        </span>
                        {errors.name &&
                        touched.name &&
                        formValues.name == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.name}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <div className="my-2 px-2 pt-8 w-full">
                        <input
                          type="text"
                          id="handle"
                          name="handle"
                          placeholder="Handle *"
                          value={formValues.name}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.handle && errors.handle ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={50}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: /your-project-handle)
                        </span>
                        {errors.handle &&
                        touched.handle &&
                        formValues.handle == "" ? (
                          <div classhandle="text-rose-500 my-2">
                            {errors.handle}
                          </div>
                        ) : (
                          ""
                        )}
                      </div> */}
                      <div className="my-2 px-2 pt-4 w-full">
                        <input
                          type="text"
                          id="short_description"
                          name="short_description"
                          placeholder="Short Description *"
                          value={formValues.short_description}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.short_description &&
                            errors.short_description
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={50}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: PulseChainProjects ranking and directory site)
                        </span>
                        {errors.short_description &&
                        touched.short_description &&
                        formValues.short_description == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.short_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
                        <input
                          type="text"
                          id="full_description"
                          name="full_description"
                          placeholder="Full Description *"
                          value={formValues.full_description}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.full_description && errors.full_description
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={300}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: PulseChainProjects is an open source tool built
                          by the HowToPulse Team)
                        </span>
                        {errors.full_description &&
                        touched.full_description &&
                        formValues.full_description == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.full_description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
                        <input
                          type="text"
                          id="website_url"
                          name="website_url"
                          placeholder="Website URL *"
                          value={formValues.website_url}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.website_url && errors.website_url
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={200}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: https://pulsechainprojects.io)
                        </span>
                        {errors.website_url &&
                        touched.website_url &&
                        formValues.website_url == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.website_url}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
                        {/* <input
                          type="text"
                          id="logo_url"
                          name="logo_url"
                          placeholder="DApp Logo URL *"
                          value={formValues.logo_url}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.logo_url && errors.logo_url
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={200}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: https://pulsechainprojects.io/ourlogo)
                        </span> */}
                        {/* {errors.logo_url &&
                        touched.logo_url &&
                        formValues.logo_url == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.logo_url}
                          </div>
                        ) : (
                          ""
                        )} */}
                        <label className="text-gray-400">Logo *</label>
                        <input
                          type="file"
                          className={`form-control w-full rounded-xl border shadow-lg p-4 
                          block w-full text-sm text-slate-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border
                          file:border-slate-200
                          file:text-sm file:font-semibold
                          file:text-violet-700
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200 file:bg-violet-50 hover:file:bg-violet-100"
                                : "bg-neutral-900 shadow-neutral-800 border-black file:bg-neutral-900 hover:file:bg-neutral-700"
                            }`}
                          onChange={(e) => setFile(e.target.files[0])}
                          accept="image/png, image/gif, image/jpeg"
                          required
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Select logo of your project
                        </span>
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
                        <input
                          type="text"
                          id="ticker"
                          name="ticker"
                          placeholder="Ticker *"
                          value={formValues.ticker}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.ticker && errors.ticker ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={100}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: $PP)
                        </span>
                        {errors.ticker &&
                        touched.ticker &&
                        formValues.ticker == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.ticker}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 pt-4 w-full">
                        <input
                          type="text"
                          id="total_supply"
                          name="total_supply"
                          placeholder="Total Supply *"
                          value={formValues.total_supply}
                          onChange={handleChange}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.total_supply && errors.total_supply
                              ? "input-error"
                              : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={50}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: 10B )
                        </span>
                        {errors.total_supply &&
                        touched.total_supply &&
                        formValues.total_supply == "" ? (
                          <div className="text-rose-500 my-2">
                            {errors.total_supply}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Sacrifice</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Is your project raising capital?
                        </span>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {SacrificeValues.map((data, i) => {
                            return (
                              <div key={i}>
                                <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full">
                                  <div
                                    onClick={(e) => {
                                      setSacrifice(data.name);
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border dark:border-black rounded-full p-2 text-sm 
                                    
                                    ${
                                      sacrifice !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`text-left ${
                                        sacrifice !== data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">App Status *</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          (e.g: LIVE)
                        </span>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {AppStatus.map((data, i) => {
                            return (
                              <div key={i}>
                                <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full">
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setAppStatus(data.name);
                                      // console.log("Asd", data.name);
                                      // setformValues({
                                      //   ...formValues,
                                      //   app_status: data.name,
                                      // });
                                      // console.log("Asd2");
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border dark:border-black rounded-full p-2 text-sm ${
                                      appStatus !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`text-left truncate ${
                                        appStatus !== data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Categories *</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Select your project category
                        </span>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {Category.map((data, i) => {
                            return (
                              <div key={i}>
                                <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full">
                                  <div
                                    onClick={(e) => {
                                      let arr = category.filter(
                                        (obj) => obj == data.name
                                      );
                                      if (arr.length === 0) {
                                        setCategory([
                                          ...category,
                                          data.name.trim(),
                                        ]);
                                      } else {
                                        let newArr = category.filter(
                                          (obj) => obj !== data.name
                                        );

                                        if (newArr.length > 0) {
                                          setCategory(newArr);
                                        }
                                      }
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border dark:border-black rounded-full p-2 text-sm ${
                                      !category.includes(data.name)
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`w-9/12 text-left truncate ${
                                        !category.includes(data.name)
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                    <span className="w-3/12 text-right contents">
                                      {category.includes(data.name) ? (
                                        <BsDash className="rounded-full border border-white dark:border-neutral-800 dark:bg-neutral-800 shadow-md w-5 h-5 bg-slate-100 text-black dark:text-white" />
                                      ) : (
                                        <BsPlus className="rounded-full border border-white dark:border-neutral-800 dark:bg-neutral-900 shadow-md w-5 h-5 bg-slate-100  text-black dark:text-white" />
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Tokenomics</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Make your cryptocurrency valuable and interesting to
                          investors
                        </span>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {ProjInformation.map((data, i) => {
                            return (
                              <div key={i}>
                                <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full">
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      if (projectInformation === data.name) {
                                        setProjectInformation("None");
                                      } else {
                                        setProjectInformation(data.name);
                                      }
                                    }}
                                    className={`flex items-center justify-center cursor-pointer border dark:border-black rounded-full p-2 text-sm ${
                                      projectInformation !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`truncate ${
                                        projectInformation !== data.name
                                          ? ""
                                          : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="my-2 px-2 w-full">
                        <p className="font-bold text-lg my-4">Tags *</p>
                        <input
                          type="text"
                          id="tag"
                          name="tag"
                          placeholder={"Add tags"}
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          className={`form-control w-full rounded-xl border shadow-lg p-4 ${
                            touched.tag && errors.tag ? "input-error" : ""
                          }
                            ${
                              theme === "light"
                                ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                : "bg-neutral-900 shadow-neutral-800 border-black"
                            }`}
                          maxLength={25}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              let newTag = tags;
                              if (tags !== "" && tagArr.length < 10) {
                                const index = tagArr.indexOf(newTag);
                                if (index <= -1) {
                                  setTagArr([...tagArr, newTag]);
                                  setTags("");
                                } else {
                                  setTags("");
                                }
                              }
                            }
                          }}
                        />
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Atleast one tag required and max. 10
                        </span>
                        <div>
                          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                            {tagArr.length > 0
                              ? tagArr.map((data, i) => {
                                  return (
                                    <div key={i}>
                                      <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full">
                                        <div
                                          className={`flex cursor-pointer justify-center items-center border dark:border-black rounded-full p-2 text-sm 
                                    }`}
                                        >
                                          <span className="w-9/12 text-left truncate">
                                            {data}
                                          </span>
                                          <span className="w-3/12 text-right contents">
                                            <BsDash
                                              className="rounded-full border border-white dark:border-neutral-800 dark:bg-neutral-800 shadow-md w-5 h-5 bg-slate-100 text-black dark:text-white"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                const index =
                                                  tagArr.indexOf(data);
                                                let newArry = tagArr;
                                                if (index > -1) {
                                                  newArry.splice(index, 1);
                                                }
                                                setTagArr(newArry);
                                                setTags(data);
                                              }}
                                            />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                            {tagArr.length === 0
                              ? exampleTags.map((data, i) => {
                                  return (
                                    <div key={i}>
                                      <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full opacity-25">
                                        <div
                                          className={`flex cursor-pointer justify-center items-center border dark:border-black rounded-full p-2 text-sm 
                                    }`}
                                        >
                                          <span className="w-9/12 text-left truncate">
                                            {data}
                                          </span>
                                          <span className="w-3/12 text-right contents">
                                            <BsDash className="rounded-full border border-white dark:border-neutral-800 dark:bg-neutral-800 shadow-md w-5 h-5 bg-slate-100 text-black dark:text-white" />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                        {errors.tagArr && tagArr.length === 0 ? (
                          <div className="text-rose-500 my-2">
                            {errors.tagArr}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Social Media</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Provide your social media presence
                        </span>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsFacebook className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="facebook"
                            name="facebook"
                            placeholder="Facebook"
                            maxLength={100}
                            value={formValues.facebook}
                            onChange={handleChange}
                            error={errors.facebook && Boolean(errors.facebook)}
                            helpertext={errors.facebook ? errors.facebook : ""}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.facebook.com/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.facebook}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsTelegram className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="telegram"
                            name="telegram"
                            placeholder="Telegram"
                            maxLength={100}
                            value={formValues.telegram}
                            onChange={handleChange}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://t.me/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.telegram}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsInstagram className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="instagram"
                            name="instagram"
                            placeholder="Instagram"
                            value={formValues.instagram}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.instagram.com/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.instagram}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsYoutube className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="youtube"
                            name="youtube"
                            placeholder="Youtube"
                            value={formValues.youtube}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.youtube.com/channel/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.youtube}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsYoutube className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="youtube_embed"
                            name="youtube_embed"
                            placeholder="Youtube Embed URL"
                            value={formValues.youtube_embed}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.youtube.com/embed/projectvideourl
                            )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.youtube_embed}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsTwitter className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="twitter"
                            name="twitter"
                            placeholder="Twitter"
                            value={formValues.twitter}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.twitter.com/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.twitter}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsReddit className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="reddit"
                            name="reddit"
                            placeholder="Reddit"
                            value={formValues.reddit}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.reddit.com/user/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.reddit}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsMedium className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="medium"
                            name="medium"
                            placeholder="Medium"
                            value={formValues.medium}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://yourproject.medium.com )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.medium}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsDiscord className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="discord"
                            name="discord"
                            placeholder="Discord"
                            value={formValues.discord}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.discord.gg/yourproject )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.discord}
                          </div>
                        </div>
                      </div>

                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">Source Code</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Show off your code repo
                        </span>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md divide-x">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <BsGithub className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="github"
                            name="github"
                            placeholder="Github"
                            value={formValues.github}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.github.com/yourprojectrepo )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.github}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <AiFillGitlab className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="gitlab"
                            name="gitlab"
                            placeholder="GitLab"
                            value={formValues.gitlab}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.gitlab..com/yourprojectrepo )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.gitlab}
                          </div>
                        </div>
                        <div>
                          <div className="relative w-16 top-10 left-3 flex rounded-md">
                            <div className="grid grid-cols-2 divide-x w-16 md:w-14">
                              <IoLogoBitbucket className="h-5 w-5" />
                            </div>
                          </div>
                          <input
                            type="text"
                            className={`form-control w-full pl-16 rounded-xl border shadow-lg p-4 
                                ${
                                  theme === "light"
                                    ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                    : "bg-neutral-900 shadow-neutral-800 border-black"
                                }`}
                            id="bitbuket"
                            name="bitbuket"
                            placeholder="Bitbuket"
                            value={formValues.bitbuket}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: https://www.bitbucket.com/yourprojectrepo )
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.bitbuket}
                          </div>
                        </div>
                      </div>
                      <div className="my-2 px-2 py-2 w-full">
                        <p className="font-bold text-lg">We're hiring</p>
                        <span className="text-gray-400 font-semibold text-xs my-2">
                          Do you need a developer, marketer, social media
                          content creator?
                        </span>
                        <div className="grid grid-cols-2 mt-5 gap-4 md:grid-cols-4 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
                          {/* {hiringValues.map((data, i) => {
                            return (
                              <div key={i}>
                                <div className="shadow-inner shadow-gray-400 dark:shadow-black rounded-full">
                                  <div
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setHiring(data.name);
                                    }}
                                    className={`flex cursor-pointer justify-center items-center border dark:border-black rounded-full p-2 text-sm ${
                                      hiring !== data.name
                                        ? ""
                                        : "font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
                                    }`}
                                  >
                                    <span
                                      className={`${
                                        hiring !== data.name ? "" : "text-white"
                                      }`}
                                    >
                                      {data.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })} */}
                          <label
                            for="toggleB"
                            className="flex items-center cursor-pointer"
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                id="toggleB"
                                className="sr-only"
                                onClick={(e) => {
                                  // e.preventDefault();
                                  setHiring(!hiring);
                                }}
                              />
                              <div
                                className={`block bg-gray-300  w-14 h-8 rounded-full ${
                                  hiring
                                    ? "bg-green-200 dark:bg-green-800"
                                    : "dark:bg-gray-600"
                                }`}
                              ></div>
                              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                            </div>
                            <div className="ml-3 text-gray-400 font-semibold text-xs font-medium">
                              {hiring ? "Yes" : "No"}
                            </div>
                          </label>
                        </div>
                        <div className="my-5">
                          <input
                            type="email"
                            className={`form-control w-full rounded-xl border shadow-lg p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                  : "bg-neutral-900 shadow-neutral-800 border-black"
                              }`}
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                            maxLength={100}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            If your hiring or would like users to contact you,
                            please enter your email
                          </span>
                        </div>
                        <div className="my-5">
                          <input
                            type="text"
                            className={`form-control w-full rounded-xl border shadow-lg p-4
                              ${
                                theme === "light"
                                  ? " shadow-slate-200 bg-slate-100 border-slate-200"
                                  : "bg-neutral-900 shadow-neutral-800 border-black"
                              }`}
                            id="smart_contract_address"
                            name="smart_contract_address"
                            placeholder="Smart Contract Address"
                            value={formValues.smart_contract_address}
                            onChange={handleChange}
                            maxLength={200}
                          />
                          <span className="text-gray-400 font-semibold text-xs my-2">
                            (e.g: Enter your 0x project address)
                          </span>
                          <div className="text-rose-500 my-2">
                            {errors.smart_contract_address}
                          </div>
                        </div>
                      </div>

                      <div className="flex my-4 w-full justify-center">
                        <button
                          // className={`sub-header-button text-white ${
                          //   this.state.isSubmitting ? "" : ""
                          // }`}
                          type="submit"
                          disabled={isSubmitting}
                          onClick={(e) => submitApp(e)}
                          className={`cursor-pointer rounded-full p-4 px-6 font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg text-xl text-white`}
                        >
                          {isSubmitting ? "Submitting..." : "Submit DApp"}
                        </button>
                        <button
                          className={`mx-4 rounded-full border-0 p-4 px-8 font-semibold ${
                            theme === "light"
                              ? "bg-slate-200"
                              : "bg-neutral-800 shadow-neutral-800"
                          }`}
                          type="reset"
                          // onClick={(e) => this.resetForm(e)}
                          onClick={resetForm}
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {isSuccess && (
        <Modal
          title={"Congratulations! Your DApp Has Been Submitted Successfully!"}
          description={
            <p>
              Thank you for submitting your listing to PulseChainProjects.io.
              You'll see your listing within 12-24 hours!
              <br />
              <br />
              DON'T GO YET! We invite you to a 1-hour live stream hosted on our
              YouTube Channel with over 3700 subscribers. (
              <span>
                <Link href="https://www.youtube.com/howtopulse">
                  https://www.youtube.com/howtopulse
                </Link>
              </span>
              ). You're listing will be approved within 12-24 hours. Thank you
              for interest. Also, book a slot and learn more about the products
            </p>
          }
        />
      )}
      <div className="relative w-full bottom-0">
        <Footer />
      </div>
    </Fragment>
  );
}
