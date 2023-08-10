import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth";
import "@/styles/globals.scss";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth()
  
  if (!user) {
    return null
  }
  

  return (
    <div className="homeContainer">
      <Sidebar />
      <Chat />
    </div>
  );
}
