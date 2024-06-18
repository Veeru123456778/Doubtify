import React from 'react';
import DraftCard from '../components/DraftCard';
const Drafts = () => {
  return <div className='gap-y-8 flex flex-col w-full items-center'>
    {/* <div className="sticky top-0 bg-white   p-4">
        <div className="flex  mb-6">
          <h1 className="text-2xl font-bold ">Drafts</h1>
        </div>
        <hr className="border-gray-300 mb-8" />
      </div> */}
      <div className='w-full md:w-1/2 mt-4'>
        <h1 className='text-2xl font-bold'>My Drafts</h1>
        <hr className='mt-3 border-gray-300'/>
      </div>
    <div className='gap-y-8 flex flex-col justify-center items-center '>
    <DraftCard/>
    <DraftCard/>
    <DraftCard/>
    </div>
  </div>;
};

export default Drafts;
