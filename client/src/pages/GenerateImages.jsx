import { Image, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {

  const categories = [
    "Realistic",
    'Ghibli',
    'Artistic',
    'Cartoon',
    'Anime',
    'Pixel Art',
    '3D Render',
    'Watercolor',
    'Oil Painting'
  ]
  const [stylecategory, setStyleCategory] = useState(categories[0]);
  const [stylePrompt, setStylePrompt] = useState('');
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const prompt = `Generate an image with the idea: ${stylePrompt} in the style of ${stylecategory}.`
      const { data } = await axios.post('/ai/generate-image', {
        prompt,
        publish
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
      toast.error('Failed to generate image. Please try again.')
    }
    setLoading(false)
  }

  const handleDownload = async () => {
    try {
      const response = await axios.get(content, {
        responseType: "blob", 
      });

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "ai-generated-image.png";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };


  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className='w-6 text-[#00AD25]' />
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Image Idea</p>
        <textarea cols={"10"} rows={"4"} onChange={(e) => setStylePrompt(e.target.value)} value={stylePrompt} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 hover:border-green-500' placeholder='Describe the image you want to generate...' required />

        <p className='mt-6 text-smf font-medium'>Style</p>

        <div className='mt-3 flex gap-3 flex-wrap  sm:max-w-9/11'>
          {
            categories.map((item, index) => (
              <span onClick={() => setStyleCategory(item)} key={index} className={`text-xs px-4 py-1 w-28 text-center border rounded-full cursor-pointer ${stylecategory === item ? 'bg-green-100 border-green-500' : 'hover:bg-green-100 hover:border-green-500'}`}>{item}</span>
            ))
          }
        </div>
        <div className="my-6 flex items-center gap-2">
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e) => setPublish(e.target.checked)} value={publish} on className="sr-only peer" />
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
          </label>
          <p className='text-sm'>Make this Image Public</p>
        </div>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Image className='w-5' />
          } Generate Image
        </button>
      </form>
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className="flex items-center gap-3">
          <Image className='w-5 h-5 text-[#00AD25]' />
          <h1 className="text-xl font-semibold">Generated Images</h1>
        </div>
        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Image className='w-13 h-13' />
              <p>Give Idea and click "Generate Image" to get started</p>
            </div>
          </div>
        ) : (
          <div className='mt-3 h-full'>
            <img src={content} alt="image" className='w-full h-full' />
            <button
              type="button"
              onClick={handleDownload}
              className="mt-3 w-full bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white py-2 rounded-lg text-sm font-medium"
            >
              Download Image
            </button>
          </div>

        )}
      </div>
    </div>
  )
}

export default GenerateImages
