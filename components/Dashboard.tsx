"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Input from "./Input";
import { handleGetTodos } from "@/utils/handleGetTodos";
import { ToDo } from "@/typings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ToDo[]>([]);

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // add 1 because months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  async function fetchTodos() {
    const fetchedTodos = await handleGetTodos(session!.user!.email!);
    const todosArray = fetchedTodos.data;
    const formattedTodos = todosArray.map((todo) => {
      return {
        ...todo,
        date: formatDate(todo.date),
      };
    });
    setTodos(formattedTodos);
    setLoading(false);
  }

  useEffect(() => {
    if (!session) return;
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

  async function deleteTodo(todoId) {
    try {
      const response = await fetch("/api/firestore/deleteTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: session!.user!.email!,
          id: todoId,
        }),
      });

      if (response.ok) {
        console.log("ToDo erfolgreich gelöscht");
        fetchTodos();
      } else {
        const data = await response.json();
        console.error("Fehler beim Löschen des ToDos:", data.message);
      }
    } catch (error) {
      console.error("Ein Fehler ist aufgetreten:", error);
    }
  }

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
          <div className="todos-list mt-10">
            {todos?.map((todo, index) => (
              <div
                key={index}
                className="flex justify-between items-center todo-item w-full max-w-3xl mx-auto bg-gradient-to-br from-blue-700/80 to-blue-200/80 text-white rounded-md mb-4 p-3"
              >
                <span>{todo.todo}</span>
                <div className="flex items-center space-x-3">
                  <span>{todo.date}</span>
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    title="Edit ToDo"
                    className="transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />

                  <FontAwesomeIcon
                    icon={faTrash}
                    title="Delete ToDo"
                    className="transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                    onClick={() => deleteTodo(todo.id)} // Hier wird die Funktion ausgeführt, wenn auf das Icon geklickt wird
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-center">
            <Input onTodoCreated={fetchTodos} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
