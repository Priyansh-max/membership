import React,{useContext , createContext} from 'react';
import {useAddress , useContract , useMetamask,
useContractWrite } from '@thirdweb-dev/react';

import { useStorageUpload } from "@thirdweb-dev/react";
import {daysLeft } from '../utils';

import {ethers} from 'ethers';
import crowdfunding from '../../../thirdweb-contracts/artifacts/contracts/crowdfunding.sol/crowdfunding.json'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const {contract} = useContract('0xB11Be904609ca9A4CaF0C0Aa5DCd537Cf099ea93');
    const {mutateAsync: createCampaign} = useContractWrite(contract , 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async(form) => {
        try {
            const data = await createCampaign({

                args: [
                    
                    //ordered as per createcampaign function in 
                    //smart contract
                    address ,//owner
                    form.title, //title
                    form.description, // description
                    form.target,
                    form.deadline, //deadline
                    form.image,
                    form.fileuri
            
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
            fileuri:campaign.fileuri,
            pId: i,
    
        }));
        console.log(parsedCampaigns.target);
        console.log(parsedCampaigns);
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredCampaign = allCampaigns.filter((campaign) =>
        campaign.owner === address);

        console.log(allCampaigns)

        return filteredCampaign;
    }

    const getAllCampaigns = async () => {
        const allCampaigns = await getCampaigns();

        const filteredAllCampaign = allCampaigns.filter((campaign) =>
        campaign.owner !== address);

        console.log(allCampaigns)

        return filteredAllCampaign;
    }

    const donate = async(pId , amount) => {
        const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

        return data;
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     const campaigns = await contract.call('getCampaigns');
    //     const parsedCampaigns = campaigns.map((campaign,i) => ({
    //         owner: campaign.owner,
    //         title: campaign.title,
    //         description: campaign.description,
    //         target: ethers.utils.formatEther(campaign.target.toString()),
    //         deadline: campaign.deadline.toNumber(),
            
    //         amountCollected : ethers.utils.formatEther(campaign.amountCollected.toString()),
    //         image:campaign.image,
    //         fileuri:campaign.fileuri,
    //         pId: i,
    
    //     }));
    //     console.log(parsedCampaigns);
    //     console.log(parsedCampaigns.owner);
    //     const contract1 = new ethers.Contract(
    //         parsedCampaigns[0].owner,
    //         crowdfunding.abi,
    //         signer
    //       );
            
    //     const parsedAmount = ethers.utils.parseEther(amount.toString()).toString();
    //     console.log(parsedAmount);
        
    //     const paymentTransaction = await contract1.donateToCampaign(parsedCampaigns[0].pId, {
    //         value: ethers.utils.parseEther(amount.toString()).toString(),
    //     });

    //     await paymentTransaction.wait();

    //     return paymentTransaction;
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
            const remainingDays = daysLeft(campaign.deadline);

            const donations = await getDonations(campaign.pId);
            const hasDonation = donations.some((donation) => donation.donator === address);
            
            if (hasDonation) {
                donatedCampaigns.push(campaign);
            }

            // if (hasDonation && remainingDays > 0) {
            //     donatedCampaigns.push(campaign);
            // }
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
                getAllCampaigns,
            }}
        >
                {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext
(StateContext);

export default StateContext;