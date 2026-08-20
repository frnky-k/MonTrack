import { useNavigate } from "react-router-dom";
import { API_URL } from "../lib/api";
import { useEffect } from "react";

type TelegramAuth = {
  id: number
  username: string
  first_name: string
  photo_url: string
  auth_date: string
  hash: string
} 

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuth) => void;
  }
}

export default function authTelegram(){
  const navigate = useNavigate()

  useEffect(() => {
    window.onTelegramAuth = async(user: TelegramAuth) =>{
    try{
      const res = await fetch (`${API_URL}/auth/telegram`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(user),
      credentials:"include"
      })
      const data = await res.json()
      console.log(data.username)
      navigate("/home")
    }
    catch(error){
      console.error("Telegram Auth Error", error)
    }
  }

  
  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?24";
  script.async = true;
  script.setAttribute("data-telegram-login", "TrackNeybot");
  script.setAttribute("data-size", "large");
  script.setAttribute("data-onauth", "onTelegramAuth(user)");
  script.setAttribute("data-request-access", "write");

  document.getElementById("telegram-widget")?.appendChild(script);

  return () => {
    document.getElementById("telegram-widget")?.removeChild(script);
  }
  }, [navigate]);
  return (  
    <div id="telegram-widget"/>
  )

  
}