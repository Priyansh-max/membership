import React from 'react'

const CountBox = ({title , value , text}) => {
  return (
    <div className='flex flex-col items-center w-[150px]'>
        <h4 className='font-epilogue font-bold text-[12px]
        text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full
        text-center'>{value} {text}</h4>
        <p className='font-epilogue text-[12px] text-[#808191] bg-[#28282e]
        px-3 py-2 w-full text-center text-ellipsis overflow-hidden ... rounded-b-[10px]'>{title}</p>
    </div>
  )
}

export default CountBox