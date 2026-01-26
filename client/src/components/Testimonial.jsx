import React from 'react'
import { assets, dummyTestimonialData } from '../assets/assets'
import Title from './Title'

const Testimonial = () => {
  return (
    <div>
      <div className='px-4 sm:px-20 xl:px-32 my-40'>
            <Title title={"Loved by Creators"} des={"Don't just take our word for it. Here's what our users are saying."} />
            <div className='flex flex-wrap mt-10 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                        <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_,index) =>(
                                <img className='w-4 h-4' key={index} src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon} alt='star'/>
                            ))}
                        </div>
                        <p className='text-gray-500 text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-600'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-500'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Testimonial
