import React from "react";
import GoldBlogs from "./GoldBlogs";

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(2);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none mx-auto flex-wrap pt-3 pb-4 flex-row max-w-2xl"
            role="tablist"
          >
            {
              [
                ['crypto', 1],
                ['gold', 2],
                ['financial', 3]
              ].map(([name, tabId]) => (
                <li className={`-mb-px mr-2 last:mr-0 rounded-full overflow-hidden p-[2px] flex-auto text-center ${openTab === tabId && 'bg-gradient-to-r from-[#a8773f] to-gold-100/50'}`}>
                  <p className={`rounded-full bg-[#f6f0e5] dark:bg-neutral-900`}>
                    <a
                      className={
                        "uppercase px-5 py-3 rounded-full block leading-normal " +
                        (openTab === tabId
                          ? "text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-[#a8773f] to-[#f4eddfd1]/50"
                          : "font-medium")
                      }
                      onClick={e => {
                        e.preventDefault();
                        setOpenTab(tabId);
                      }}
                      data-toggle="tab"
                      href="#link1"
                      role="tablist"
                    >
                      {name}
                    </a>
                  </p>
                </li>
              ))
            }
          </ul>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <GoldBlogs />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <GoldBlogs />
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <GoldBlogs />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs