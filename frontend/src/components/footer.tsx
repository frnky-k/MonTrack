import { LuInstagram } from "react-icons/lu"
import { FaGithub } from "react-icons/fa6"
export default function Footer(){
  return (
    <footer>
          <div className='max-w-4xl md:h-0.5 w-full bg-[#f1f5f9] mt-20'></div>
          <div className='flex flex-col items-center justify-center mt-5'>
            <div className="flex items-center gap-3">
              <img src='/Logo.png' width={45} height={45} alt='logo'
                className='rounded-xl' />
              <h1 className='font-bold text-gray-950'>MonTrack</h1>
            </div>
            <p className='capitalize text-xs text-center p-5 text-[#6b6375]'>Simple Money Tracker synced via Telegram</p>
            <div className="flex gap-5">
              <a href="https://www.instagram.com/?hl=en"><LuInstagram /></a>
              <a href="https://github.com/frnky-k/MonTrack"><FaGithub /></a>
            </div>
            <p className='capitalize text-xs text-center p-5 text-[#6b6375]'>&copy; 2026 MonTrack. All rights reserved.</p>

          </div>
        </footer>
  )
}