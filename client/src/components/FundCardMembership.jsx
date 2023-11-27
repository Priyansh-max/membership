import React, {useState, useEffect} from 'react'

import { tagType , thirdweb } from '../assets';
import { daysLeft } from '../utils';


const FundCardMembership = ({owner,title,description,target,
deadline,amountCollected,image,handleClick}) => {
  const [counter, setCounter] = useState(deadline); 
  // const remainingDays = daysLeft(deadline);
  // console.log(remainingDays);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1); 
    }, 24 * 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []); 

  return (
    <div className='sm:w-[278px] w-full rounded-[15px] bg-[#1c1c24]
    cursor-pointer' onClick={handleClick}>
      <img src={image} alt='fund' className='w-full
      h-[152px] object-cover rounded-[15px]'/>

      <div className='flex flex-col p-4'>
        <div>
          <img src={tagType} alt="tag" className='w-[17px]
          h-[17px] object-contain' />
        </div>

        <div className='block'>
          <h3 className='font-epilogue font-semibold text-[16px]
          text-white text-left leading-26px text-ellipsis overflow-hidden ...'>{title}</h3>
          <p className='mt-[9px] font-epilogue text-[12px]
          text-[#808191] text-left leading-[14px] truncate'>{description}</p>

        </div>

        <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
          <div className='flex flex-col'>
            <h4 className='font-epilogue font-semibold text-[14px]
            text-[#b2b3bd] leading-[22px]'>{target}</h4>

            <p className='mt-[3px] font-epilogue font-normal text-[13px]
            leading-[18px] text-[#808191] text-ellipsis overflow-hidden ...'>Price</p>

          </div>

          <div className='flex flex-col'>
            <h4 className='font-epilogue font-semibold text-[14px]
            text-[#b2b3bd] leading-[22px]'>{counter} Days</h4> 
            {/* yaha pe deadline ke jhage remainingdays ayega after create a perfect remaining days functionn */}

            <p className='mt-[3px] font-epilogue font-normal text-[12px]
            leading-[18px] text-[#808191] text-ellipsis overflow-hidden ...'>Days left</p>

          </div>

        </div>

        <div className='flex items-center mt-[20px] gap-[12px]'>
          <div className='w-[30px] h-[30px] rounded-full flex justify-center
          items-center bg-[#13131a]'>
            <img src={thirdweb} alt="user" className='w-1/2 h-1/2
            object-contain' />
          </div>
          <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191]
          truncate'>by <span className='text-[#b2b3bd]'>{owner}</span></p>

        </div>



      </div>
    </div>
  )
}

export default FundCardMembership