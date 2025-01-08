import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

export default function Header() {
    const headerMenu = [
      { id: 1, name: "Ride", imageUrl: '/uberCarIcon.jpeg' },
      {
        id: 2,
        name: "Courier",
        imageUrl: '/uberCourierIcon.jpeg',
      },
    ]
  return (
    <div className="flex flex-row justify-between bg-black">
      <div className="p-4 pb-4 pl-10   flex flex-row">
        <img src="/uberLogo.svg" width={70} height={70} alt="uberLogo" />
        <div className="flex gap-6 items-center ml-5">
          {headerMenu.map((item) => (
            <div
              key={item.id}
              className="flex justify-center flex-row rounded-3xl cursor-pointer items-center hover:bg-slate-800"
            >
              <h2 className="text-[14px] font-medium text-white px-3 py-2 rounded-xl">
                {item.name}{' '}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mr-10 flex-none items-center justify-center flex border-[2px] border-white h-fit rounded-full my-auto">
        <UserButton />
      </div>
    </div>
  )
}

       