import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className='hidden md:flex items-center justify-between px-8 md:px-16 h-16 bg-white font-semibold sticky top-0 z-50 border-b border-gray-100 shadow-sm'>
      <div className='flex items-center gap-3 text-sm'>
        <img src='/Logo.png' width={50} height={50} alt='logo'
          className='rounded-xl' />
        <h1 className='font-bold text-gray-950'>MonTrack</h1>
      </div>
      <ul className="flex items-center gap-8 text-sm text-gray-700">
        <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
        <li><a href="#tutorial" className="hover:text-green-600 transition">Tutorial</a></li>
        <li><a href="#about" className="hover:text-green-600 transition">About</a></li>
      </ul>
      
      
    </nav>
  )
}
