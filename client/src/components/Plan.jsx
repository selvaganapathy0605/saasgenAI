import React from 'react'
import Title from './Title'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className='max-w-2xl mx-auto z-20 my-30'>
            <Title title={"Choose the plan that’s right for you"} des={"Select the perfect plan for your needs and start creating amazing content with AI."} />
            <div className='mt-14 max-sm:mx-8'>
                <PricingTable />
            </div>
        </div>
    )
}

export default Plan
