import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-15 relative h-15.5 bg-[#fff] font-semibold'>
      <div className='flex items-center gap-3'>
        <img src='/Logo.png' width={50} height={50} alt='logo'
          className='rounded-xl' />
        <h1 className='font-bold text-gray-950'>MonTrack</h1>
      </div>
      <div className='absolute left-1/2 -translate-x-1/2'>
        <ul className="flex items-center gap-3">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    </nav>
  )
}
