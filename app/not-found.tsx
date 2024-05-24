'use client'


import Image from "next/image";
import {useRouter} from "next/navigation";
export default function NotFound() {


  const router = useRouter()

	return (
    <div>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute top-[-12rem] -bottom-32 left-5">
              <div className="flex flex-col justify-between gap-64 items-center">
                <div>
                  <h1 className="my-2 font-bold text-2xl">
                    Looks like you have found the doorway to the great nothing
                  </h1>
                  <p className="my-2">
                    Sorry about that! Please visit our hompage to get where you
                    need to go.
                  </p>
                </div>
                <button className="sm:w-full lg:w-auto my-2 rounded md py-4 px-8 text-center hover:bg-teal-800 hover:text-white border border-teal-800 dark:border-white" onClick={() => router.replace('/')}>
                  Go to Dashboard!
                </button>
              </div>
            </div>
            <div>
              <Image src="https://i.ibb.co/G9DC8S0/404-2.png" alt="alt2"/>
            </div>
          </div>
        </div>
        <div>
          <Image src="https://i.ibb.co/ck1SGFJ/Group.png" alt="alt"/>
        </div>
      </div>
    </div>
  );
}

