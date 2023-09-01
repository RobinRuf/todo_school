"use client"
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center">
      { session ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
}
