import { API_URL } from "../lib/api";
import {useEffect, useState } from "react";
import About from "./about";
import Carousel from "./carousel";
import Faq from "./faq";
import Footer from "./footer";
import { FaTelegram } from "react-icons/fa6";
import { Loader } from "lucide-react";
import Tutorial from "./tutorial";


export default function AuthTelegram(){
  const [isLoading, setIsLoading] = useState(false)  
  const slides = [
    "/logoabout.png",
    "/mockup.jpg",
    "/username.png"
  ]
  async function startTeleLink(){
    try{
      setIsLoading(true);
      const res = await fetch(`${API_URL}/auth/init`, {method:'POST'});
      const {link_token} = await res.json();

      sessionStorage.setItem("link_token", link_token);

      window.open(`https://telegram.me/TrackNeyBot?start=${link_token}`, "_blank")
    }
    catch(error){
      console.error("Connection Error", error);
      alert("Could not connect to server, Please check your internet")
    }
    finally{
      setIsLoading(false)
    }
  }

    useEffect(() => {
    const link_token = sessionStorage.getItem("link_token");
    if (link_token) {
      pollForLink(link_token);
    }
  }, []);

  async function pollForLink(link_token: string) {
    const res = await fetch(`${API_URL}/auth/status?link_token=${link_token}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data.linked) {
      sessionStorage.removeItem("link_token");
      window.location.href = "/dashboard";
    } else {
      setTimeout(() => pollForLink(link_token), 2000);
    }
  }

    return (
      <div className="min-h-screen flex flex-col">
        <main className="mt-10 flex-grow">
          <section className="flex justify-center flex-col md:flex justify-center flex-col items-center gap-8 p-5">
          <p className="text-[#6b6375] text-xs mb-[-25px]">Manage Your Financial Log</p>
          <h1 className="text-[#066f02] text-6xl text-center font-bold">Track your cash</h1>
          <h1 className="text-6xl text-center font-bold mt-[-25px]">right where you chat.</h1>
          <p className="text-[#6b6375] text-sm text-center">"Your pocket accountant on Telegram. Track expenses, set budgets, and watch your savings grow—all through a simple chat."</p>
          <div className="flex flex-row gap-4">
          <button onClick={startTeleLink} className="bg-sky-500 hover:bg-sky-600 transition text-black flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium shadow-md">
            {isLoading?(
              <>
              <Loader className="animate-spin"/>
              <span>Connecting...</span>
              </>
            ):(
              <>
                <FaTelegram className="w-5 h-5"/>
                <span>Login via Telegram</span>
              </>

            )}
            
          </button>
          <a href="#tutorial">
            <button className="bg-white border border-black hover:bg-[#ebeced] transition text-black flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium shadow-md text-sm">Learn How it works</button>
          </a>
          </div>
          <div className="w-[80%] mt-5 md:max-w-3xl mx-auto ">
            <Carousel slides={slides} />
          </div>
          </section>
          <section id="tutorial" className="py-12 scroll-smooth">
            <Tutorial />
          </section>
          <section id="about" className="py-12 scroll-smooth" >
            <About />
          </section>
          <section id="faq" className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start scroll-smooth">
            <div className="grid grid-rows-1 gap-5 mb-4 space-y-3">
              <h1 className="uppercase font-bold text-xl">faq's</h1>
              <p>Find quick answers about logging expenses, data security, and Telegram integration</p>
            </div>
          <div className="md:flex justify-center items-center gap-10 mb-[15%] ">
            <Faq />
          </div>
        </section>
        <section className="">
          <Footer />
        </section>
        
        </main>
      </div>
    );
}

