import React, { Fragment, useEffect } from 'react'
import { useTheme } from 'next-themes';
import Header from '../components/Header'
import Footer from '../components/Footer';

const Pricing = () => {
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
            <div className="flex items-center justify-center text-4xl md:text-6xl font-bold font-logo-font mx-4 ">
              <p>Pricing</p>
            </div>
            <p className="mt-6 font-normal text-sm text-slate-600">Sed ut perspiciatis unde omnis iste natus error sit voluptatem toto celobeso.</p>
          </div>
          <div class="flex flex-col items-center justify-center p-10">
            <div class="flex flex-wrap items-center justify-center w-full max-w-6xl">
              <div class="flex flex-col flex-grow mt-8 md:w-1/3 overflow-hidden bg-[#f4eddfd1] dark:bg-neutral-900 border border-gold-100/60 shadow-lg">
                <div class="text-center p-6">
                  <span class="text-lg font-semibold">Basic<span className='font-normal text-sm dark:text-gold-200/50'>/for personal use</span></span>
                </div>
                <div class="p-4 text-center dark:from-neutral-800 dark:to-neutral-800 bg-gradient-to-r from-gold-200/30 to-gold-100/20">
                  <p className='text-4xl leading-normal text-transparent font-logo-font font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-[#f4eddfd1]'>Free</p>
                  <span className='text-sm'>No subscription required</span>
                </div>
                <div class="p-10 leading-8">
                  <ul>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">11 market data endpoints</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">10k call credits/mo</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">No historical</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">Personal use</span>
                    </li>
                  </ul>
                </div>
                <div class="px-10 pb-10 text-center">
                  <button className="rounded-full cursor-pointer border p-2 text-white bg-gradient-to-r from-gold-300 to-gold-100 bg-gradient-90 shadow-sm shadow-slate-600">
                    <span className="p-2 font-medium  uppercase">Get free API</span>
                  </button>
                </div>
              </div>

              {/* Tile 2 */}
              <div class="z-10 flex flex-col flex-grow mt-8 md:w-1/3 overflow-hidden transform dark:from-neutral-800 dark:to-neutral-800 bg-gradient-to-b from-[#e7dcc3] to-[#f4eddfd1] dark:bg-neutral-900 border border-gold-100/60 shadow-lg md:scale-110">
                <div class="text-center p-6">
                  <span class="text-lg font-semibold">Startup<span className='font-normal text-sm dark:text-gold-200/50'>/for commercial use</span></span>
                </div>
                <div class="p-4 text-center bg-gradient-to-r from-gold-300 to-gold-100">
                  <p className='text-4xl leading-normal font-logo-font font-bold text-white'>$79<span className='text-gold-100 text-lg'>/mo</span></p>
                  <span className='text-sm'>Billed annually or <span className='font-medium'>$95/mo</span></span>
                </div>
                <div class="p-10 leading-8">
                  <ul>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">21 market data endpoints</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">120k call credits/mo</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">1 month history.</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2 font-medium">Commercial use*</span>
                    </li>
                  </ul>
                </div>
                <div className='mb-10'>
                  <div className='p-[2px] rounded-full overflow-hidden w-1/2 mx-auto bg-gradient-to-r from-[#a8773f] to-gold-100/50'>
                    <div class="bg-[#f6f0e5] dark:bg-neutral-800 rounded-full text-center">
                      <button className="rounded-full cursor-pointer px-5 py-2 text-transparent uppercase font-bold bg-clip-text bg-gradient-to-r from-[#a8773f] to-gold-200/50">
                        <span className="font-medium  uppercase">Get Started</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tile 3 */}

              <div class="flex flex-col flex-grow overflow-hidden md:w-1/3 bg-[#f4eddfd1] dark:bg-neutral-900 border border-gold-100/60 shadow-lg mt-8">
                <div class="text-center p-6">
                  <span class="text-lg font-semibold">Standard<span className='font-normal text-sm dark:text-gold-200/50'>/suitable</span></span>
                </div>
                <div class="p-4 text-center dark:from-neutral-800 dark:to-neutral-800 bg-gradient-to-r from-gold-200/30 to-gold-100/20">
                  <p className='text-4xl leading-normal text-transparent font-logo-font font-bold bg-clip-text bg-gradient-to-r from-gold-300 to-[#f4eddfd1]'>$299<span className='text-gold-100 text-lg'>/mo</span></p>
                  <span className='text-sm'>Billed annually or <span className='font-medium'>$375/mo</span></span>
                </div>
                <div class="p-10 leading-8">
                  <ul>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">29 market data endpoints</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">500k call credits/mo</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2">3 month of historical data</span>
                    </li>
                    <li class="flex items-center">
                      <svg class="w-5 h-5 text-green-600 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <span class="ml-2 font-medium">Commercial use*</span>
                    </li>
                  </ul>
                </div>
                <div class="px-10 pb-10 text-center">
                  <button className="rounded-full cursor-pointer border p-2 text-white bg-gradient-to-r from-gold-300 to-gold-100 bg-gradient-90 shadow-sm shadow-slate-600">
                    <span className="p-2 font-medium  uppercase">Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto border border-slate-300 uppercase w-full my-20 h-24 flex items-center justify-center">
            ** Google Ads **
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  )
}

export default Pricing