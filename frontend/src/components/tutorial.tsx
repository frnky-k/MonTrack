import { Squircle } from "lucide-react"

export default function Tutorial(){
  return (
    <div>
    <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
      {/* <div className="flex flex-col h-full p-8 rounded-lg border-l-2 border-black" /> */}
      <h1 className="text-3xl font-bold ">How it Works</h1>
      
      <section className="grid grid-cols-1 gap-8 items-stretch max-w-4xl mx-auto px-6 py-12">

        <div className="flex flex-col gap-2 h-full p-8 rounded-md bg-white shadow-md">
          <p className="font-bold text-xl flex flex-row gap-2 items-center"><Squircle className="w-4 h-4" />Message the Bot</p>
          <p className="text-gray-500">Simply send a message like "lunch 25000" to our Telegram bot. No form, no apps to open.</p>
        </div>
       
        
        <div className="flex flex-col gap-2 h-full p-8 rounded-md bg-white shadow-md">
          <p className="font-bold text-xl flex flex-row gap-2 items-center"><Squircle className="w-4 h-4" />Confirm Transaction Noted</p>
          <p className="text-gray-500">The bot categorized automatically, Just confirm bot reply after your message sent.</p>
        </div>
        <div className="flex flex-col gap-2 h-full p-8 rounded-md bg-white shadow-md">
          <p className="font-bold text-xl flex flex-row gap-2 items-center"><Squircle className="w-4 h-4" />Analyze on Web</p>
          <p className="text-gray-500">View your spending, budgets, and insight real-time on our dashboard.</p>
        </div>
      </section>
      {/* </div> */}
    </main>
  </div>
  )
}