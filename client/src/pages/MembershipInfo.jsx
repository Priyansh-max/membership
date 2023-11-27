import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useStateContext } from '../context';
import { MediaRenderer } from "@thirdweb-dev/react";


const MembershipInfo = () => {
  const {state} = useLocation();
  const { donate, getCampaigns, contract, address } = useStateContext();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        
        const imageData = await getCampaigns();
        console.log(imageData);
        setImage(imageData[2].fileuri);

      } catch (error) {
        console.error('Error fetching file data:', error);
      }
    };

    fetchFileData();
  }, [3000]);

  return (
    <div>
        <MediaRenderer src={image} />
    </div>
  );
};

export default MembershipInfo;