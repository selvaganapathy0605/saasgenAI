import React from 'react'
import { useUser, useClerk, Protect } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
    { label: 'Dashboard', to: '/ai', Icon : House },
    { label: 'Write Article', to: '/ai/write-article', Icon : SquarePen },
    { label: 'Blog Titles', to: '/ai/blog-title', Icon : Hash },
    { label: 'Generate Images', to: '/ai/generate-image', Icon : Image },
    { label: 'Remove Background', to: '/ai/remove-background', Icon : Eraser },
    { label: 'Remove Object', to: '/ai/remove-object', Icon : Scissors },
    { label: 'Review Resume', to: '/ai/review-resume', Icon : FileText },
    { label: 'Community', to: '/ai/community', Icon : User }
]


const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        <div className={`w-60 bg-white border-r border-gray-300 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="my-7 w-full">
                <img src={user.imageUrl} alt="user" className='w-13 rounded-full mx-auto' />
                <h1 className='mt-1 text-center'>{user.fullName}</h1>
                <div className="mt-4 px-6 text-sm text-gray-600 font-medium">
                    {sidebarItems.map(({to,label,Icon}) => (
                        <NavLink key={to} to={to} end={to === "/ai"} className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 hover:bg-gray-200 ${isActive ? 'bg-gradient-to-r from-[#3cf3f6] to-[#03bbb8] text-white': ''}`}>
                            {
                                ({ isActive }) => (
                                    <>
                                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                                        <span className='text-sm'>{label}</span>
                                    </>
                                )
                            }
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className='gap-5 w-full border-t border-gray-200 p-4 px-7 flex items-center justify-center'>
                <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer'>
                    <img src={user.imageUrl} alt="user" className='w-9 rounded-full' />
                    <div>
                        <h1 className='text-sm font-medium'>{user.fullName}</h1>
                        <p className="text-sm font-light"><Protect plan='premium' fallback="Free">Premium</Protect> Plan</p>
                    </div>
                </div>
                <LogOut className='w-4.5 text-gray-400 hover:text-gray-70 transition cursor-pointer' onClick={signOut} />
            </div>
        </div>
    )
}

export default Sidebar
