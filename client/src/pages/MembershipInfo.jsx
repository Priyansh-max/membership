import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useStateContext } from '../context';
import { MediaRenderer } from "@thirdweb-dev/react";


const MembershipInfo = () => {
  const [isLoading,setIsLoading] = useState(false);
  const {state} = useLocation();
  const {getCampaigns, contract, address } = useStateContext();
  const [image, setImage] = useState(null);

  // useEffect(() => {
  //   const fetchFileData = async () => {
  //     try {
        
  //       const imageData = await getDonatedCampaigns();
  //       console.log(imageData);
  //       console.log(imageData[5].fileuri)
  //       setImage(imageData[5].fileuri);

  //     } catch (error) {
  //       console.error('Error fetching file data:', error);
  //     }
  //   };

  //   fetchFileData();
  // }, [3000]);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    
    setImage(state.fileuri);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
    console.log("Image: ", image);
  },[address , contract, image]);

  return (
    <div>
        {image && <MediaRenderer src={`ipfs://${image}`} />}
    </div>
  );
};

export default MembershipInfo;