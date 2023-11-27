import React from 'react'

const FormField = ({LabelName , placeholder , inputType , 
    isTextArea , value , handleChange}) => {

    return (
        <label className='flex-1 w-full flex flex-col'>
            {LabelName &&(
                <span className='font-epilogue font-medium
                text-[14px] leading-[22px] text-[#808191]
                mb-[10px]'>{LabelName}</span>
            )}

            {isTextArea ? (
                <textarea 
                    required
                    value={value} 
                    onChange={handleChange}
                    rows={10}
                    placeholder={placeholder}
                    className='py-[15px] px-[15px] outline-none
                    border-[1px] border-[#3a4a43] bg-transparent font-epilogue
                    text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]'
                
                />
            ) : (
                <input 
                    required
                    value={value} 
                    onChange={handleChange}
                    step='0.01'
                    type={inputType}
                    placeholder={placeholder}
                    className='py-[15px] px-[15px] outline-none
                    border-[1px] border-[#3a4a43] bg-transparent font-epilogue
                    text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]'
                />

            )}
        </label>
    )
}

export default FormField