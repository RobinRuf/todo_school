"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Input from "./Input";
import { handleGetTodos } from "@/utils/handleGetTodos";
import { ToDo } from "@/typings";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    if (!session) return;

    async function fetchTodos() {
      const fetchedTodos = await handleGetTodos(session!.user!.email!);
      console.log(fetchedTodos);
      setTodos(fetchedTodos);
      setLoading(false);
    }

    fetchTodos();
  }, [session]);

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
    <>
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Header */}
          <Header />
          {/* ToDo List */}
          <div className="todos-list">
            {todos?.data.map((todo, index) => (
              <div key={index} className="todo-item">
                {todo.todo} - {todo.date.toLocaleString()}
                {/* Sie können die anderen Todo-Eigenschaften ebenfalls anzeigen */}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-center">
            <Input />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
