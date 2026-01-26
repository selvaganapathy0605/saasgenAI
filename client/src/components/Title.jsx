import React from 'react'

const Title = ({title,des}) => {
    return (
        <div className='text-center'>
            <h2 className='text-slate-700 text-[42px] font-semibold'>{title}</h2>
            <p className='text-gray-500 max-w-lg mx-auto'>{des}</p>
        </div>
    )
}

export default Title
