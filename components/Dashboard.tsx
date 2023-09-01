"use client"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import Header from "./Header";
import Input from "./Input";

const Dashboard = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    fetch("http://localhost:3000/api/firestore/createUser", {
      method: "POST",
      body: JSON.stringify({
        name: session?.user?.name,
        image: session?.user?.image,
        email: session?.user?.email,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).catch((e) => console.log(e));
  }, [session]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <Header />
      {/* ToDO List */}

      {/* Footer */}
      <div className="flex justify-center">
      <Input />
      </div>
    </div>
  );
};

export default Dashboard;
