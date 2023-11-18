import React , {useState , useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaign, DisplayMembershipRented } from '../components';


const Profile = () => {
  const [isLoading,setIsLoading] = useState(false);
  const [campaigns,setCampaigns] = useState([]);
  const [campaigns1,setCampaigns1] = useState([]);
  const {address, contract , getUserCampaigns , getDonatedCampaigns} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();

  },[address , contract]);

  const fetchCampaigns1 = async () => {
    setIsLoading(true);
    const data1 = await getDonatedCampaigns();
    setCampaigns1(data1);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns1();

  },[address , contract]);

  return (
    <div>
      {address ? (
        <div>
          <DisplayCampaign 
          title='Your Campaigns'
          isLoading={isLoading}
          campaigns={campaigns}
          />

          <DisplayMembershipRented 
          title='Your Rented Memberships'
          isLoading={isLoading}
          campaigns={campaigns1}
          />

        </div>

      ) : (
        <div>
          <h1>Welcome to my website to get started connect your wallet to the sepolia test network
          </h1>
        </div>

      )} 

    </div>

    

    
  )
}

export default Profile
