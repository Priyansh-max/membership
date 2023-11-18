import React,{useContext , createContext} from 'react';
import {useAddress , useContract , useMetamask,
useContractWrite } from '@thirdweb-dev/react';

import { useStorageUpload } from "@thirdweb-dev/react";

import {ethers} from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const {contract} = useContract('0x82ec19B8793C6CD7723A073Eb652Fa27401D3d8B');
    const {mutateAsync: createCampaign} = useContractWrite(contract , 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async(form) => {
        try {
            const data = await createCampaign({

                args: [
                    
                    //ordered as per createcampaign function in 
                    //smart contract
                    address, //owner
                    form.title, //title
                    form.description, // description
                    form.target,
                    new Date(form.deadline).getTime(), //deadline
                    form.image
            
                ]
            })

            console.log("Contract call success" , data)
            
        } catch (error) {
            console.log("Contract call failure" , error)
            
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            
            amountCollected : ethers.utils.formatEther(campaign.amountCollected.toString()),
            image:campaign.image,
            pId: i,
    
        }));
        console.log(parsedCampaigns.target);
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaign = allCampaigns.filter((campaign) =>
        campaign.owner === address);

        console.log(allCampaigns)

        return filteredCampaign;
    }

    const donate = async(pId , amount) => {
        const data = await contract.call('donateToCampaign',[pId],
        {value : ethers.utils.parseEther(amount)});

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators',[pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0 ; i < numberOfDonations ; i++){
            parsedDonations.push({
                donator : donations[0][i],
                donations : ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonations;
    }

    const getDonatedCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const donatedCampaigns = [];

        for (const campaign of allCampaigns) {
            // Check if the campaign has donations from the current address
            const donations = await getDonations(campaign.pId);
            const hasDonation = donations.some((donation) => donation.donator === address);
            
            if (hasDonation) {
                donatedCampaigns.push(campaign);
            }
        }

        return donatedCampaigns;
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign : publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                getDonatedCampaigns,
            }}
        >
                {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext
(StateContext);