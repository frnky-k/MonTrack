import { ChevronRight } from "lucide-react"

export default function Faq() {
  return (
    <ul className="w-full max-w-2xl space-y-2 px-2 divide-y shadow rounded-x text-[#f1f5f9]">
      <li >
        <details className="group">
          <summary className="flex items-center text-black gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <ChevronRight className="transition group-open:rotate-90" />
            <span>How do I record my expenses and income?</span>
          </summary>
          <article className="p-4 bg-[#f1f5f9] text-black">
            <p>
              It’s simple! Just open our designated Telegram bot
              and send a message detailing your transaction (e.g., lunch 10000 or + salary 50000). The bot will process your input and save it securely to your account.
            </p>
          </article>
        </details>
      </li>
      <li>
        <details className="group">
          <summary className="flex items-center text-black gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <ChevronRight className="transition group-open:rotate-90" />
            <span>Why don't I see my recent Telegram input immediately on the website?</span>
          </summary>
          <article className="p-4 bg-[#f1f5f9] text-black">
            <p>
              MonTrack's website only displays transactions that have been successfully saved and processed. If a transaction is still pending or wasn't finalized through the bot prompt, it won't clutter your main dashboard until it is officially confirmed and saved. </p>
          </article>
        </details>
      </li>
      <li>
        <details className="group">
          <summary className="flex items-center text-black gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <ChevronRight className="transition group-open:rotate-90" />
            <span>Is my financial data secure?</span>
          </summary>
          <article className="p-4 bg-[#f1f5f9] text-black">
            <p>
              Yes. We take your privacy and data security very seriously. All your transaction records are encrypted and stored safely so that only you can access your financial overview via your verified account.</p>
          </article>
        </details>
      </li>
      <li>
        <details className="group">
          <summary className="flex items-center text-black gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <ChevronRight className="transition group-open:rotate-90" />
            <span>Is MonTrack free to use?</span>
          </summary>
          <article className="p-4 bg-[#f1f5f9] text-black">
            <p>
              Yes, MonTrack's core tracking features via the Telegram bot and web dashboard are completely free to help you stay on top of your budget. </p>
          </article>
        </details>
      </li>
      <li>
        <details className="group">
          <summary className="flex items-center text-black gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
            <ChevronRight className="transition group-open:rotate-90" />
            <span>Can I edit or delete a transaction once it's saved?</span>
          </summary>
          <article className="p-4 bg-[#f1f5f9] text-black">
            <p>
              Currently, transaction management is handled through our core system workflows. You can check your saved history on the website dashboard for a complete and accurate audit of all your recorded financial activities. </p>
          </article>
        </details>
      </li>
    </ul>
  )
}
