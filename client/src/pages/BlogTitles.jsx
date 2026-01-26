import { Edit, Hash, Sparkle, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react'
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {

  const [blogTopic, setBlogTopic] = useState('');
  const categories = [
    "General", 'Technology', 'Business',
    'Lifestyle', 'Travel', "Education",
    'Food', 'Health', 'Sports',
    'Entertainment', 'Finance', 'Fashion',
  ]
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const prompt = `Generate 5 blog titles for the keyword ${blogTopic} in the category of ${selectedCategory}.`
      const { data } = await axios.post('/ai/blog-title', {
        prompt
      }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })
      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Failed to generate blog titles. Please try again.')
    }
    setLoading(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Article copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy article');
    }
  };



  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Blog Topic</p>
        <input onChange={(e) => setBlogTopic(e.target.value)} value={blogTopic} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 hover:border-purple-500' placeholder='The future of artificial intelligence is...' required />

        <p className='mt-6 text-sm font-medium'>Topics</p>

        <div className='mt-3 flex gap-3 flex-wrap  sm:max-w-9/11'>
          {
            categories.map((item, index) => (
              <span onClick={() => setSelectedCategory(item)} key={index} className={`text-xs px-4 py-1 w-28 text-center border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-100 border-purple-500' : 'hover:bg-purple-100 hover:border-purple-500'}`}>{item}</span>
            ))
          }
        </div>
        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Edit className='w-5' />
          }
          Generate Titles
        </button>
      </form>
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hash className='w-5 h-5 text-[#8E37EB]' />
            <h1 className="text-xl font-semibold">Generated Titles</h1>
          </div>

          {content && (
            <button
              onClick={handleCopy}
              className="text-xs px-3 py-1 border rounded-md hover:bg-purple-100 hover:border-purple-500"
            >
              Copy
            </button>
          )}
        </div>

        {
          !content ? (
            <div className="flex flex-1 justify-center items-center">
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Hash className='w-13 h-13' />
                <p>Enter a topic and click "Generate  Titles" to get started</p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
              <div className='reset-tw'>
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}

export default BlogTitles
