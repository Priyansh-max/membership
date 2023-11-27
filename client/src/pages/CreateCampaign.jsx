import React , {useState, useEffect} from 'react'
import { useStorageUpload } from "@thirdweb-dev/react";
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';

import {useStateContext} from '../context';
import {money} from '../assets';
import {CustomButton, FormField} from '../components';
import {checkIfImage} from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const {createCampaign} = useStateContext();
  const [isLoading , setIsLoading] = useState(false);
  const [amount,setAmount] = useState("");
  const [File , setFile] = useState();
  const [Fileuri , setFileuri] = useState();
  const { mutateAsync: upload } = useStorageUpload();
  
  const [form , setForm] = useState({
    name:'',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image:'',
    fileuri:''
  })

  const handleFormFieldChange = (fieldname,e) => {
    setForm({...form,[fieldname]:e.target.value})
  }

  useEffect(() => {
    if (File) {
      handleFileUpload(); 
    }
  }, [File]);

  useEffect(() => {
    console.log("Updated fileURI state:", form.Fileuri);
  }, [form.Fileuri])

  const handleFileUpload = async (e) => {
    e.preventDefault();

    try {
      console.log("Starting file upload");
      const uploadUrl = await upload({
        data: [File],
        options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
      });
      console.log("Upload URL:", uploadUrl);

      console.log(uploadUrl.toString());

      const urlParts = uploadUrl.toString().split('/');
      const ipfsHash = urlParts[urlParts.length - 2];

      setFileuri(ipfsHash);
      setForm((prevForm) => ({
        ...prevForm,
        fileuri: ipfsHash,
      }));

      console.log("fileURI state:", Fileuri);

      console.log(`IPFS Hash: ${ipfsHash}`);
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form.fileuri);

    checkIfImage(form.image , async (exists) => {
      if(exists){
        setIsLoading(true);
        await createCampaign({...form , 
        target:ethers.utils.parseUnits(form.target,18)});
        setIsLoading(false);
        navigate('/')

      }
      else{
        alert("Provide valid image url");
        setForm({...form , image:''});
      }
    }) 

  }

  return (
    <div className='bg-[#1c1c24]  flex justify-center items-center 
      flex-col rounded-[10px] p-4 '>
        {isLoading && 'loader....'}
        <div className='flex justify-center items-center 
        p-[16px] rounded-[10px] bg-gradient-to-b from-violet-800 to-fuchsia-1000'>
          <h1 className='font-epilogue font-bold text-[22px] 
          leading-[38px] text-white'>Create your membership</h1>
        </div>

        <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col 
        gap-[30px]'>
          <div className='flex flex-wrap gap-[40px]'>
            <FormField 
              LabelName='Your Name*'
              placeholder='Artist'
              inputType='text'
              value={form.name}
              handleChange={(e) => handleFormFieldChange('name',e)}
            />

            <FormField 
              LabelName='Membership Title*'
              placeholder='Write a title which best suits your membership'
              inputType='text'
              value={form.title}
              handleChange={(e) => handleFormFieldChange('title',e)}
            />
          </div>

          <FormField 
              LabelName='Description *'
              placeholder='Write about who you are and what you will offer *'
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange('description',e)}
            />

          <div className='w-full flex justify-start items-center p-4 bg-gradient-to-t from-violet-800 to-fuchsia-500";
          h-[120px] rounded-[10px]'>
            <img src= {money} alt="money" className='w-[50px] h-[50px]
            object-contain' />
            <h4 className='font-epilogue font-bold text-[37px] text-white ml-[20px]'>Get 100% of your membership amount
            </h4>

          </div>

          <div className='flex flex-wrap gap-[40px]'>
            <FormField 
              LabelName='Price*'
              placeholder='ETH 0.05'
              inputType='number'
              value={form.target}
              value1={amount}
              onChange={(e) => setAmount(e.target.value1)}
              handleChange={(e) => handleFormFieldChange('target',e)}
            />

            {/* <FormField 
              LabelName='Duration* (in Days)'
              placeholder='Duration'
              inputType='number'
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline',e)}
            /> */}
            <label 
                className = "flex-1 w-full flex flex-col"
              >
                <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>Duration* (in Days)</span>
                  <input 
                    className = "py-[15px] px-[15px] outline-none border-[1px] border-[#3a4a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]"
                    placeholder='Select Image'
                    type='number'
                    value={form.deadline}
                    onChange={(e) => handleFormFieldChange('deadline',e)}
                  />
              </label>

          </div>
            <FormField 
              LabelName='Display Image*'
              placeholder='Place image URL of your display image. NOTE!! *This image will be visible to everyone*'
              inputType='url'
              value={form.image}
              handleChange={(e) => handleFormFieldChange('image',e)}
            />

            {/* <div className='flex flex-wrap gap-[40px]'>
              <FormField 
                LabelName='Exclusive Content'
                placeholder='Upload content 1'
                inputType='file'
                value={form.target}
                onChange={(e) => setAmount(e.target.value1)}
                handleChange={(e) => handleFormFieldChange('target',e)}
              />

              <FormField 
                LabelName='End Date*'
                placeholder='End Date'
                inputType='date'
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange('deadline',e)}
              />
            </div> */}

            <div  className='flex flex-wrap gap-[40px]'>
              <label 
                className = "flex-1 w-full flex flex-col"
              >
                <span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>Upload Files</span>
                  <input 
                    className = "py-[15px] px-[15px] outline-none border-[1px] border-[#3a4a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px]"
                    placeholder='Select Image'
                    type='file'
                    onChange={(e) => setFile(e.target.files[0])} 
                  />
              </label>
              

              <div className='flex justify-center items-center mt-8'>
                <button 
                  className="font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#1dc071]" 
                  onClick={handleFileUpload}
                >
                  Upload Files
                </button> 
              </div>
            </div>

            {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload</button> */}

            <div className='flex justify-center items-center mt-[40px]'>
              <CustomButton 
                btnType='submit'
                title='Submit new Campaign'
                styles='bg-[#1dc071]'
                handleClick={handleSubmit}
              />

            </div>
        </form>
    </div>
  )
}

export default CreateCampaign