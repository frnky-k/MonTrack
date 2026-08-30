import { BowArrow } from "lucide-react"
import { Eye } from "lucide-react"


export default function About() {

  return (
    <div>
      <main className='max-w-4xl mx-auto px-6 py-12 flex flex-col items-center'>
        <article className="py-20">
        <section className="mt-2 mb-[15%]">
          <div className="text-xs font-bold text-[#066f02] uppercase">what we do</div>
          <h1 className="text-3xl font-bold">We help people manage their money with effortless awareness.</h1>
          <p className="mt-5 text-[#6b6375] font-semibold">MonTrack is a smart, simple, and seamless expense-tracking platform designed to help you take control of your financial life.
            We know that managing money can often feel overwhelming, which is why we integrated directly with Telegram.
          </p>
          <p className="mt-5 text-[#6b6375] font-semibold">By leveraging the chat app you already use every day, MonTrack allows you to log your income and expenses instantly on the go.
            Once saved, your transactions securely sync to our web dashboard, giving you a clean, organized, and reliable overview of your financial habits
            without the clutter of unsaved drafts.</p>
          <div className="h-0.5 w-full bg-[#f1f5f9] mt-20" />
          <div className="grid grid-cols-1 pb-10 md:grid-cols-3 gap-6 mt-10 flex justify-center gap-[25%]">
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col h-full p-8 rounded-lg border-l-4 border-black">
            <div className="flex flex-col gap-4">
              <Eye />
              <h1 className="text-xl font-bold">Our Vision</h1>
              <p className="text-grey-700">To empower individuals with effortless financial awareness,
                making smart money management a seamless part of everyday life.</p>
            </div>
          </div>
          <div className="flex flex-col h-full bg-[#f1f5f9] p-8 rounded-lg">
            <div className="flex flex-col gap-4">
              <BowArrow className="h-fit" />
              <h1 className="text-xl font-bold">Our Mission</h1>
              <ul className=" pl-5 list-disc space-y-2 text-sm">
                <li>Simplify Tracking: Eliminate friction in personal finance by enabling instant transaction logging through Telegram.</li>
                <li>Promote Clarity: Provide a secure, intuitive web platform that highlights your saved financial history to encourage mindful spending.</li>
                <li>Build Financial Confidence: Equip users with the tools they need to understand their cash flow and achieve their financial goals.</li>
              </ul>
            </div>
          </div>
        </section>

        
        </article>
        
        
      </main>
    </div>
  )
}
