'use client'


import React from 'react'
import { BsPlus, BsTwitter, BsWhatsapp } from 'react-icons/bs'

const Contact = () => {
  return (
    <div className='fixed right-10 bottom-20 bg-transparent'>
      <div className='cursor-pointer hover:text-4xl z-10'>

      <BsPlus className='bg-teal-800 text-white h-10 w-10 hover:h-12 hover:w-12 origin-center rounded-full'/>
      </div>
      <div className=''>
        <BsTwitter className='absolute top-0 right-0 z-0'/>
        <BsTwitter className='absolute'/>
        <BsTwitter className='absolute'/>
        <BsTwitter className='absolute'/>
        <BsTwitter className='absolute'/>
        <BsWhatsapp className='absolute'/>
      </div>
    </div>
  )
}

export default Contact