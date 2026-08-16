import Carousel from "./carousel"
import { BowArrow } from "lucide-react"
import { Eye } from "lucide-react"
import Faq from "./faq"
import { LuInstagram } from "react-icons/lu"
import { FaTelegram } from "react-icons/fa6";

export default function About() {

  const slides = [
    "/logoabout.png",
    "/mockup.jpg",
    "/username.png"
  ]

  return (
    <div>
      <main className='app_main p-5'>
        <section className="mb-[15%]">
          <h1 className="font-bold text-center text-3xl p-5">About Us</h1>
          <p className="text-sm text-center text-[#6b6375]">Helping you take control of your financial life through smart tracking</p>
          <div className="w-[60%] mt-5 max-w-2xl mx-auto ">
            <Carousel slides={slides} />
          </div>
        </section>
        <section className="mt-5 mb-[15%]">
          <div className="text-xs font-bold text-[#066f02] uppercase">what we do</div>
          <h1 className="text-3xl font-bold">We help people manage their money with effortless awareness.</h1>
          <p className="mt-5 text-[#6b6375] font-semibold">MonTrack is a smart, simple, and seamless expense-tracking platform designed to help you take control of your financial life.
            We know that managing money can often feel overwhelming, which is why we integrated directly with Telegram.
          </p>
          <p className="mt-5 text-[#6b6375] font-semibold">By leveraging the chat app you already use every day, MonTrack allows you to log your income and expenses instantly on the go.
            Once saved, your transactions securely sync to our web dashboard, giving you a clean, organized, and reliable overview of your financial habits
            without the clutter of unsaved drafts.</p>
          <div className="h-0.5 w-full bg-[#f1f5f9] mt-20" />
          <div className="mt-10 flex justify-center gap-[25%]">
            <div className="text-center">
              <p className="font-bold text-xl ">24/7</p>
              <p className="text-[#6b6375] text-sm">Telegram Bot</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl ">Secure</p>
              <p className="text-[#6b6375] text-sm">Encrypted Data</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl ">Free</p>
              <p className="text-[#6b6375] text-sm">Core Features</p>
            </div>
          </div>
        </section>

        <section className="flex justify-center items-start gap-10 mb-[15%]">
          <div className="py-20 h-135 border-l-5 ">
            <div className=" grid grid-rows-2 gap-5 p-5">
              <Eye />
              <h1 className="text-xl font-bold">Our Vision</h1>
              <p className="w-[75%]">To empower individuals with effortless financial awareness,
                making smart money management a seamless part of everyday life.</p>
            </div>
          </div>
          <div className="py-20 bg-[#f1f5f9]">
            <div className="grid grid-rows-2 gap-1 p-5">
              <BowArrow className="h-fit" />
              <h1 className="text-xl font-bold">Our Mission</h1>
              <ul className=" p-5 list-disc w-[75%]">
                <li>Simplify Tracking: Eliminate friction in personal finance by enabling instant transaction logging through Telegram.</li>
                <li>Promote Clarity: Provide a secure, intuitive web platform that highlights your saved financial history to encourage mindful spending.</li>
                <li>Build Financial Confidence: Equip users with the tools they need to understand their cash flow and achieve their financial goals.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex justify-center items-start gap-10 mb-[15%]">
          <div>
            <div className="grid grid-rows-1 gap-5 mb-4">
              <h1 className="uppercase font-bold text-xl">faq's</h1>
              <p>Find quick answers about logging expenses, data security, and Telegram integration</p>
            </div>
          </div>
          <div>
            <Faq />
          </div>
        </section>
        <footer>
          <div className='h-0.5 w-full bg-[#f1f5f9] mt-20'></div>
          <div className='flex items-center justify-center mt-5  flex-col'>
            <div className="flex items-center gap-3">
              <img src='/Logo.png' width={45} height={45} alt='logo'
                className='rounded-xl' />
              <h1 className='font-bold text-gray-950'>MonTrack</h1>
            </div>
            <p className='capitalize text-xs text-center p-5 text-[#6b6375]'>Simple Money Tracker synced via Telegram</p>
            <div className="flex gap-5">
              <LuInstagram />
              <FaTelegram />
            </div>
            <p className='capitalize text-xs text-center p-5 text-[#6b6375]'>&copy; 2026 MonTrack. All rights reserved.</p>

          </div>
        </footer>
      </main>
    </div>
  )
}
