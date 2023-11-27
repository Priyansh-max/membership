import React,{useState} from 'react';
import {Link , useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import {CustomButton} from "./";
import {logo , menu , search , thirdweb } from '../assets';
import {navlinks} from '../constants';

const Navbar = () => {
    const navigate = useNavigate();
    const [isActive, setisActive] = useState('dashboard');
    const [toggleDrawer, settoggleDrawer] = useState(false);
    const {connect , address} = useStateContext();

    return (

        <div className='md:flex flex-row justify-between mb-[45px]
        gap-6'>
            <div className='md:flex flex flex-row w-[700px] 
            py-2 pl-4 pr-2 h-[62px] bg-[#1c1c24] rounded-[80px]' >
                <input type ="text" placeholder='Search for membership'
                className='flex w-full font-epilogue font-normal text-[14px]
                placeholder:text-[#4b5264] text-white bg-transparent outline-none' />


                <div className='w-[72px] h-full rounded-[20px]
                bg-[#4acd8d] flex justify-center 
                items-center cursor-pointer'>
                    <img src={search} alt = "search"
                    className='w-[15px] h-[15px]
                    object-contain'/>
                </div>
            </div>

            <div className='md:flex flex-row justify-end gap-4'>
                <CustomButton 
                    btntype = "button"
                    title = {address ? 'Create your Membership' : 'Connect'}
                    styles= {address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                    handleClick={() =>{
                        if(address) navigate('create-campaigns')
                        else connect();
                    }}
                />

                <Link to="/Profile">
                    <div className='w-[70px] h-[70px] rounded-full 
                    bg-[#2c2f32] flex justify-center 
                    items-center cursor-pointer'>
                        <img src={thirdweb} alt="user" className='w-[60%] h-[60%] 
                        object-contain' />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Navbar