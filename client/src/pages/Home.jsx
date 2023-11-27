import React , {useState , useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaign } from '../components';


const Home = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [campaigns,setCampaigns] = useState([]);
  const {address, contract , getAllCampaigns} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getAllCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();

  },[address , contract]);

  return (
    <div>
      {address ? (
        <DisplayCampaign 
          title='All Memberships'
          isLoading={isLoading}
          campaigns={campaigns}
        />
      ) : (
        <div className='flex-1'>
          <h1 className='flex flex-row p-4 bg-[#1c1c24] rounded-[10px] font-epilogue font-medium text-[18px] w-full
              text-center text-[#808191]'>
               Welcome to my website to get started connect your wallet to the sepolia test network 
          </h1>
        </div>

      )} 

    </div>

    

    
  )
}

export default Home
