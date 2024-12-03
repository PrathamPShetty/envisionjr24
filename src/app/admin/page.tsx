"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/login";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {


      
        setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}
