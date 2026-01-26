import React from 'react'
import { useUser,useClerk } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const { user } = useUser()
    const { openSignIn } = useClerk()
    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen '>
            <div className='text-center mb-6'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>
                    Create amazing content <br /> with <span className='text-primary'>AI tools</span>
                </h1>
                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'>
                    Generate text, images, write articles, resume review and more with our premium powerful AI platform
                </p>
            </div>
            <div className="mt-2 flex items-center justify-center">
                {
                    user ? (<Link to="/ai">
                        <button className="bg-primary text-white px-10 py-2.5 rounded-full hover:bg-primary/90" >Go to Dashboard</button>
                    </Link>) : (
                        <button onClick={openSignIn} className="bg-primary text-white px-10 py-2.5 rounded-full hover:bg-primary/90" >Start creating now</button>
                    )
                }
            </div>
            <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600'>
                <img src={assets.user_group} alt="userGroup" className='h-8' /> Trusted ny 10+k people
            </div>
        </div>
    )
}

export default Hero
