import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="relative">
      <Image
        src="/uberBannerImage.png"
        width={1400}
        height={600}
        className="object-contain h-full w-full"
        alt="BackgroundImage"
      />

      <div className="absolute top-10 right-10">
        <SignIn />
      </div>
    </div>
  )
}
