import React from 'react'
import { assets,aiToolsLinks } from '../assets/assets'
import { useUser,useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const { openSignIn } = useClerk();
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 border-t border-t-primary/30">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img className='h-9' src={assets.logo} alt="" />
                    <p className="mt-6 text-sm">
                        SaaSGen AI is your ultimate AI-powered content creation companion.
                        Create amazing content with our powerful AI tools. 
                        Generate text, images, write articles, resume review and 
                        more with our premium AI platform.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">AI Tools</h2>
                        <ul className="text-sm space-y-2">
                            {
                                aiToolsLinks.map((link, index) => (
                                    <li key={index} onClick={() => user ? navigate(link.link) : openSignIn()} className="hover:text-gray-800 cursor-pointer">{link.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+91-987654321</p>
                            <p>contact@saasgen_ai.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright {new Date().getFullYear()} © SaaSGen AI. All Right Reserved.
            </p>
        </footer>
    )
}

export default Footer
