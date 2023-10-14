import Image from 'next/image'
import React from 'react'
import weblearn from '../public/assets/weblearn.png'
import Btn from './Btn'

function WorkSampleCard() {
  return (
    <div className='w-[380px] flex flex-col justify-between items-center rounded-2xl workSampleCard p-5 gap-y-8'>
        <Image src={weblearn} className='w-full rounded-2xl'/>
        <h1 className='text-3xl font-bold'>سایت وب لرن</h1>
        <p className='text-2xl font-extralight'>یه سایت آموزش برنامه نویسی</p>
        <Btn title={"مشاهده وب سایت"} href={"/"} />
    </div>
  )
}

export default WorkSampleCard