import React , {useState} from 'react'
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

const handleFileUpload = async () => {
  try {
    const uploadUrl = await upload({
      data: [File],
      options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    });
    alert(uploadUrl);
    console.log(uploadUrl.toString());
    const urlParts = uploadUrl.toString().split('/');
    const ipfsHash = urlParts[urlParts.length - 2];
    setFileuri(ipfsHash);
    // setForm({ ...form, fileuri: ipfsHash });
    console.log(`IPFS Hash: ${ipfsHash}`);
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

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

            <FormField 
              LabelName='Duration* (in Days)'
              placeholder='Duration'
              inputType='number'
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline',e)}
            />
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

            {/* <div>
              <FormField 
                LabelName='Exclusive Content*'
                placeholder='Select Image*'
                inputType='file'
                onChange={(e) => setFile(e.target.files[0])}
                value={form.fileuri}
                handleChange={(e) => handleFormFieldChange('fileuri',e)}
              />

              <button onClick={handleFileUpload}>Upload</button> 
            </div> */}

            {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileUpload}>Upload</button> */}

            <div className='flex justify-center items-center mt-[40px]'>
              <CustomButton 
                btnType='submit'
                title='Submit new Campaign'
                styles='bg-[#1dc071]'
              />

            </div>
        </form>
    </div>
  )
}

export default CreateCampaign