import React, { Fragment } from 'react'
const GoldBlogs = () => {
  return (
    <Fragment>
      <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
        <div className="relative lg:col-span-3 ">
          <img src="/images/gold-bars-and-coins.png" />
          <div className='bg-[#f5f1ea] p-6 shadow-lg rounded-b-2xl'>
            <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
            <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
            <p className="text-xs mt-6">August 18, 2022</p>
          </div>
        </div>
        <div className='lg:col-span-2'>
          <div className='bg-[#f5f1ea] p-6 shadow-lg rounded-2xl border border-slate-200 mb-6'>
            <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
            <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
            <p className="text-xs mt-6">August 18, 2022</p>
          </div>
          <div className='bg-[#f5f1ea] p-6 shadow-lg rounded-2xl border border-slate-200 mb-6'>
            <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
            <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
            <p className="text-xs mt-6">August 18, 2022</p>
          </div>
          <div className='bg-[#f5f1ea] p-6 shadow-lg rounded-2xl border border-slate-200 mb-6'>
            <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
            <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
            <p className="text-xs mt-6">August 18, 2022</p>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[40rem] grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-5">
        <div className="relative lg:col-span-3 ">
          <div className='flex items-center justify-center mb-6'>
            <img src="/images/gold-bar-list-w-image.png" />
            <div className='bg-[#f5f1ea] p-6 shadow-lg border border-slate-200 rounded-r-2xl'>
              <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
              <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
              <p className="text-xs mt-6">August 18, 2022</p>
            </div>
          </div>
          <div className='flex items-center justify-center mb-6'>
            <img src="/images/gold-bar-list-w-image.png" />
            <div className='bg-[#f5f1ea] p-6 shadow-lg border border-slate-200 rounded-r-2xl'>
              <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
              <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
              <p className="text-xs mt-6">August 18, 2022</p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <img src="/images/gold-bar-list-w-image.png" />
            <div className='bg-[#f5f1ea] p-6 shadow-lg border border-slate-200 rounded-r-2xl'>
              <p className="text-xl font-bold font-logo-font font-medium mb-4">Gold amid higher inflation...</p>
              <p className="text-sm">Sed ut perspiciatis unde omnis iste natus error voluptatem accusantium doloremque laudantium, totam rem aperi... <span className="font-medium">MORE</span></p>
              <p className="text-xs mt-6">August 18, 2022</p>
            </div>
          </div>
        </div>
        <div className='lg:col-span-2'>
          <div className="max-w-2xl mx-auto border border-slate-300 uppercase w-full h-full flex items-center justify-center">
            ** Google Ads **
          </div>
        </div>
        <div className=" my-10">
          <button className="rounded-full cursor-pointer border p-2 text-white bg-gradient-to-r from-gold-300 to-gold-100 bg-gradient-90 shadow-sm shadow-slate-600">
            <span className="p-2 font-bold  uppercase">Load More</span>
          </button>
        </div>
      </div>
    </Fragment>
  )
}
export default GoldBlogs