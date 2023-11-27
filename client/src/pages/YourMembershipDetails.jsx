import React, {useState , useEffect }from 'react'
import {useLocation} from 'react-router-dom';
import {ethers} from 'ethers';

import {useStateContext} from '../context';
import {CountBox, CustomButton} from '../components';
import {calculateBarPercentage,daysLeft } from '../utils';
import {thirdweb} from '../assets';

const YourMembershipDetails = () => {
  const {state} = useLocation();
  const {donate , getDonations , contract , address} = useStateContext();
  const [isLoading , setIsLoading] = useState(false);
  const [amount,setAmount] = useState("");
  const [donators , setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract , address])

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId ,amount);
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && 'Loading...'}
      
      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='w-full flex-1 flex-col'>
          <img src={state.image} alt="campaign" 
          className='w-full h-[300px] object-cover rounded-[13px]' />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div className='absolute h-full bg-[$4acd8d]'
            styles= {{width: `${calculateBarPercentage(state.target , state.amountCollected)}%`,
            maxWidth:'100%'}}>
            </div>
          </div>
        </div>

        {/* <div className='flex md:w-[150px] w-full flex-wrap justify-between
        gap-[30px] h-[310px]'>
          <CountBox title='Duration' text='Days' value={state.deadline}/>
          <CountBox title= 'AmountCollected' text='ETH'   value = {state.amountCollected}/>
          <CountBox title='Total Members' value={donators.length}/>

        </div> */}
      </div>

      <div className='mt-[30px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[7px]'>
          <div>
            <h4 className='font-epilogue font-semibold text-[18px]
            text-white uppercase'>Creator</h4>

            <div className='flex flex-row items-center flex-wrap
            gap-[5px] '>
              <div className='w-[45px] h-[45px] flex items-center justify-center
              rounded-full bg-[#2c2f32] '>
                <img src={thirdweb} alt="user" className='w-[60% h-[60%] object-contain'/>
              </div>
              <div className='px-3'>
                <h4 className='font-epilogue font-semibold text-[14px]
                text-white break-all'>{state.owner}</h4>
              </div>
            </div>
          </div>

          <div className='mt-[25px]'>
            <h4 className='font-epilogue font-semibold text-[18px]
            text-white uppercase'>Story</h4>
              <div>
                <p className='font-epilogue font-normal text-[14px]
                text-[#808191] leading-[26px] text-justify'>{state.description}</p>
              </div>
          </div>

          <div className='mt-[25px]'>
            <h4 className='font-epilogue font-semibold text-[18px]
            text-white uppercase'>Donators</h4>
              <div className='flex flex-col gap-4'>
                {donators.length > 0 ? donators.map((item,index) => (
                  <div key={`${item.donator}-${index}`}
                  className='flex justify-between items-center gap-4'>
                    <p className='font-epilogue font-normal text-[12px]
                    text-[#b2b3bd] leading-[26px] break-all'>{index + 1}.{item.donator}</p>
                    <p className='flex flex-col font-epilogue font-normal text-[12px]
                    text-[#b2b3bd] leading-[26px] break-all'>{item.donation}</p>
                  </div>
                )) : (
                  <p className='font-epilogue font-normal text-[14px]
                  text-[#808191] leading-[26px] text-justify'>No donators yet.
                  Be the first one</p>

                )}
              </div>
          </div>
        </div>
        <div className='flex-1 bg-[#121215] rounded-[10px] p-4'>
          <h4 className='font-epilogue font-semibold text-[18px]
          text-white  text-center py-3'>Dashboard</h4>
          <div className='flex md:w-[150px] w-full flex-wrap justify-between
          gap-[30px] h-[100px] '>
            <div className='flex flex-row gap-5'>
              <CountBox title='Duration' text='Days' value={state.deadline}/>
              <CountBox title= 'Price' text='ETH' value = {state.target} />
            </div>
            <div className='flex flex-row gap-5'>
              <CountBox title= 'AmountCollected' text='ETH'   value = {state.amountCollected}/>
              <CountBox title='Total Members' value={donators.length}/>
            </div>

          </div>
        </div>

        {/* <div className='flex-1'>
            <h4 className='font-epilogue font-semibold text-[18px]
            text-white uppercase'>Donators</h4>

            <div className='flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
              <p className='font-epilogue font-medium text-[18px] leading-[30px]
              text-center text-[#808191]'> Fund the Campaign</p>

              <div className='mt-[30px]'>
                <input 
                  type="number" 
                  placeholder="ETH 0.1"
                  step='0.001'
                  className='w-full mb-[20px] py-[10px] sm:px-[20px] px-[15px]
                  outline-none border-[1px] border-[#3a3a43] bg-transparent
                  font-epilogue text-white text-[18px] leading-[30px]
                  placeholder:text-[#4b5264] rounded-[13px]'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  
                />

                <CustomButton 
                  btnType='button'
                  title='Fund Campaign'
                  styles='w-full bg-[#8c6dfd]'
                  handleClick={handleDonate}
                />
              </div>
            </div>
        </div> */}
      </div>
    </div>
  )
}

export default YourMembershipDetails