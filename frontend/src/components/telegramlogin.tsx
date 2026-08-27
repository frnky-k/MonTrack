  // import { useEffect, useState } from "react"

  import { API_URL } from "../lib/api";
  // import { useEffect } from "react"


  import {useEffect } from "react";


  export default function AuthTelegram(){
    // const [chatID, setChatID] = useState([]);

    
    async function startTeleLink(){
      const res = await fetch(`${API_URL}/auth/init`, {method:'POST'});
      const {link_token} = await res.json();

      sessionStorage.setItem("link_token", link_token);

      window.open(`https://telegram.me/TrackNeyBot?start=${link_token}`, "_blank")
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
      <div>
        <button onClick={startTeleLink} className="w-full h-50 bg-red-600 text-white">login via telegram</button>
      </div>
    );
  }

