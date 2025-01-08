"use client"
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '@/app/context/SourceContext'
import { DestinationContext } from '@/app/context/DestinationContext'

export default function SearchSection() {
       const { source, setSource } = useContext(SourceContext)
       const {destination, setDestination} = useContext(DestinationContext)
     const headerMenu = [
    { id: 1, name: 'Ride', imageUrl: '/uberCarIcon.jpeg' },
    {
      id: 2,
      name: 'Courier',
      imageUrl: '/uberCourierIcon.jpeg',
    },
  ]

  useEffect(() => {
    if(source){
      console.log(source)
      
    }
    if (destination) {
      console.log(destination)
    }

  },[source, destination])
  return (
    <div>
      <p className="font-bold text-black text-5xl tracking-large">
        Go anywhere with Uber
      </p>

      <div className="flex flex-row justify-between gap-4 w-40 mt-5">
        {headerMenu.map((item) => (
          <div
            key={item.id}
            className=" flex justify-center flex-col
            items-center"
          >
            <span className="bg-gray-100 p-2 rounded-md hover:bg-gray-300">
              <Image
                src={item.imageUrl}
                width={26}
                height={26}
                className="font-bold"
                alt="IconImage"
              />
            </span>
            <h2 className="text-[14px] font-bold mt-1">{item.name} </h2>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-start mt-10">
        <div className="flex justify-center items-center bg-gray-100 rounded-xl cursor-pointer mb-2 pl-2">
          <Image src="/uberDot.jpeg" width={20} height={20} alt="iconImage" />
          <InputItem type="fromAddress" />
        </div>
        <p className="border-[0.1rem] border-l-black h-14 border-r-0 border-b-0 border-t-0 ml-[1.05rem] absolute"></p>
        <div className="flex justify-center items-center bg-gray-100 rounded-xl cursor-pointer mt-2 pl-2">
          <Image
            src="/uberSquare.jpeg"
            width={15}
            height={15}
            className="ml-[0.1rem] mt-[0.1rem]"
            alt="iconImage"
          />
          <InputItem type="toAddress" />
        </div>
      </div>

      <button className="bg-black text-white font-semibold tracking-wider mt-4 px-5 py-3 rounded-xl" onClick={()=> alert("In Progress!")}>
        See Prices
      </button>
    </div>
  )
}

   