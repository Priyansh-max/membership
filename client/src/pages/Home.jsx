import React , {useState , useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaign } from '../components';


const Home = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [campaigns,setCampaigns] = useState([]);
  const {address, contract , getCampaigns} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
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
          title='All Campaigns'
          isLoading={isLoading}
          campaigns={campaigns}
        />
      ) : (
        <div>
          <h1>Welcome to my website to get started connect your wallet to the sepolia test network
          </h1>
        </div>

      )} 

    </div>

    

    
  )
}

export default Home
