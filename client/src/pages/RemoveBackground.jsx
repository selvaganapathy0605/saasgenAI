import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBackground = () => {

  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")

  const { getToken } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', image)
      const { data } = await axios.post('/ai/remove-background', formData, {
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
      toast.error('Failed to remove background. Please try again.')
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
      link.download = "background-removed-image.png";

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
          <Sparkles className='w-6 text-[#FF4938]' />
          <h1 className='text-xl font-semibold'>Background Remover</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={(e) => setImage(e.target.files[0])} accept='image/*' type="file" className='text-gary-600 w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 hover:border-orange-500' required />
        <p className="text-xs text-gray-500 font-light mt-1">Supports JPG, PNG, and other image formats</p>
        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Eraser className='w-5' />
          } Remove Background
        </button>
      </form>
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className="flex items-center gap-3">
          <Eraser className='w-5 h-5 text-[#FF4938]' />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {!content ? (
          <div className="flex flex-1 justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className='w-13 h-13' />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>) : (
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

export default RemoveBackground
