import React, { useState } from "react";
import {
  FacebookShareButton, WhatsappShareButton, RedditShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton, WhatsappIcon, FacebookIcon, RedditIcon, LinkedinIcon, TelegramIcon, TwitterIcon, EmailShareButton, EmailIcon
} from "next-share";
import useCopyToClipboard from "../hooks/useCopytoClipboard";

const shareLinkConfig = {
  'facebook': {
    shareBtn: FacebookShareButton,
    icon: FacebookIcon,
    title: 'Share on Facebook'
  },
  'whatsapp': {
    shareBtn: WhatsappShareButton,
    icon: WhatsappIcon,
    title: 'Share via Whatsapp'
  },
  'linkedin': {
    shareBtn: LinkedinShareButton,
    icon: LinkedinIcon,
    title: 'Share on LinkedIn'
  },
  'reddit': {
    shareBtn: RedditShareButton,
    icon: RedditIcon,
    title: 'Share on Reddit'
  },
  'telegram': {
    shareBtn: TelegramShareButton,
    icon: TelegramIcon,
    title: 'Share via Telegram'
  },
  'twitter': {
    shareBtn: TwitterShareButton,
    icon: TwitterIcon,
    title: 'Share on Twitter'
  },
  'email': {
    shareBtn: EmailShareButton,
    icon: EmailIcon,
    title: 'Share via Email'
  }
};

export default function ShareModal({ title, closeModal, shareUrl, socialShares, logo }) {
  const { isCopied, onCopy } = useCopyToClipboard({ text: shareUrl, successDuration: 5000 });

  const socialIconList = () => {
    return socialShares.map((socialName) => {
      if (typeof shareLinkConfig[socialName] !== undefined) {
        const socialLiIcon =
          (
            <div className="flex justify-between items-center dark:bg-neutral-800">
              {React.createElement(shareLinkConfig[socialName].icon, { borderRadius: 15, size: 45 })}
              <p className="w-full text-left pl-3 text-base md:text-xl">{shareLinkConfig[socialName].title}</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>)
        return (
          <li className="share-link p-3 border-none hover:bg-slate-50 hover:text-slate-400 dark:hover:bg-neutral-800">
            {
              React.createElement(shareLinkConfig[socialName].shareBtn, { url: shareUrl }, socialLiIcon)
            }
          </li>
        );
      }
    })
  }
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white dark:bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  {title}
                </h3>
                <button class="border border-transparent focus:border-blue trans-all-linear" type="button" onClick={closeModal}>
                  <svg
                    class="w-8 h-8 text-grey hover:text-grey-dark"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </button>
              </div>
              <div class="w-full bg-white dark:bg-neutral-800 rounded-lg">
                <ul class="divide-y-2 divide-gray-400">
                  {socialIconList(shareLinkConfig)}
                  <li className="flex justify-between items-center p-3 border-none bg-slate-100 rounded-md hover:bg-slate-50 hover:text-slate-400 bg-white dark:bg-neutral-800" onClick={onCopy}>
                    <img alt="Logo" src={logo} className="rounded-3xl h-11 w-11" />
                    <p className="w-full text-left pl-2 text-lg sm:text-base truncate">{shareUrl}</p>
                    <label className={`border-2 dark:border-neutral-900 shadow-2 p-2 rounded-lg cursor-pointer ${isCopied?"text-green-600":""}`} >{isCopied ? 'Copied' : 'Copy'}</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
