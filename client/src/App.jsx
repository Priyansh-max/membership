import React from 'react';
import { Route , Routes }from 'react-router-dom';
import {CampaignDetails , CreateCampaign , Home , MembershipInfo, Profile} from './pages';
import { Slidebar,Navbar } from './components';
export const App = () => {
  return (
    <div className = "realtive sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className='sm:flex hidden relative'>
        <Slidebar />

      </div>
      <div className='text-white flex-1 max-sm:w-full max-w-[2220px] mx-10 sm:pr-5'>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaigns" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/Membership-details/:id" element={<MembershipInfo />} />
        </Routes>

      </div>
    </div>
  )
}

export default App
