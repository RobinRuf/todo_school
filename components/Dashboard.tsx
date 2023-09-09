"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Header from "./Header";
import Input from "./Input";
import { handleGetTodos } from "@/utils/handleGetTodos";
import { ToDo } from "@/typings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");
  const [editTodoDate, setEditTodoDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredTodos, setFilteredTodos] = useState<ToDo[]>([]);

  function formatDate(isoString: string) {
    if (!isoString) return "Invalid Date";

    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  async function fetchTodos() {
    try {
      const fetchedTodos = await handleGetTodos(session!.user!.email!);
      const todosArray = fetchedTodos.data;

      const formattedTodos = todosArray.map((todo) => {
        return {
          ...todo,
          formattedDate: formatDate(todo.date),
        };
      });

      const sortedFormattedTodos = formattedTodos.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

      setTodos(sortedFormattedTodos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session) return;
    fetchTodos();
  }, [session]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter((todo) =>
        todo.todo.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, todos]);
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
    }).catch((e) => {
      toast.error("Unexpected Error - please reload");
      console.log(e.message);
    });
  }, [session]);

  async function updateTodo() {
    try {
      const response = await fetch("/api/firestore/updateTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session!.user!.email!,
          id: todos[editingTodo].id,
          newText: editTodoText,
          newDate: editTodoDate.toISOString(),
        }),
      });

      if (response.ok) {
        // update todo locally, so changed are visible immediately
        setTodos((prevTodos) => {
          const updatedTodos = [...prevTodos];
          updatedTodos[editingTodo] = {
            ...updatedTodos[editingTodo],
            todo: editTodoText,
            date: editTodoDate.toISOString(),
            formattedDate: formatDate(editTodoDate.toISOString()),
          };
          return updatedTodos;
        });
        toast.success("Todo updated successfully");
      } else {
        throw new Error("Failed to update Todo");
      }
    } catch (error) {
      toast.error("Error while updating todo");
      console.error("Error while updating todo:", error);
    } finally {
      setEditingTodo(null);
    }
  }

  async function deleteTodo(todoId: string) {
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
        toast.success("Deleted Todo successfully!");
        fetchTodos();
      } else {
        const data = await response.json();
        toast.error("Error while deleting Todo - please reload");
        console.error("Error while deleting Todo:", data.message);
      }
    } catch (error) {
      toast.error("Error while deleting Todo - please reload");
      console.error("Error while deleting Todo", error);
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-7xl text-blue-400">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-y-hidden">
          {/* Header */}
          <Header onSearch={setSearchText} />

          {/* ToDo List */}
          <div
            className="flex-grow overflow-y-auto mt-10 mx-4 pb-20 no-scrollbar"
            style={{ maxHeight: "calc(100vh - 220px)" }}
          >
            {filteredTodos?.map((todo, index) => (
              <div
                key={index}
                className="flex justify-between items-start todo-item w-full max-w-3xl mx-auto bg-gradient-to-br from-blue-700/80 to-blue-200/80 text-white rounded-md mb-4 p-3"
              >
                {/* Datum und ToDo Text */}
                <div>
                  {editingTodo === index ? (
                    <DatePicker
                      selected={editTodoDate || new Date(todo.date)}
                      onChange={(date) => setEditTodoDate(date)}
                      dateFormat="dd.MM.yyyy HH:mm"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={10}
                      className="bg-gray-800 text-white w-32 focus:ring-0 outline-none"
                      placeholderText={todo.formattedDate}
                      minDate={new Date()}
                    />
                  ) : (
                    <span className="block">{todo.formattedDate}</span>
                  )}
                  {editingTodo === index ? (
                    <input
                      type="text"
                      value={editTodoText}
                      onChange={(e) => setEditTodoText(e.target.value)}
                      className="bg-gray-800 text-white mt-2 block w-full rounded border-none outline-none"
                    />
                  ) : (
                    <span className="block mt-2">{todo.todo}</span>
                  )}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-3">
                  {editingTodo === index ? (
                    <>
                      <FontAwesomeIcon
                        icon={faTimes}
                        title="Cancel Editing"
                        className="h-4 w-4 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => setEditingTodo(null)}
                      />
                      <FontAwesomeIcon
                        icon={faSave}
                        title="Save ToDo"
                        className="h-4 w-4 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={updateTodo}
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faPencilAlt}
                        title="Edit ToDo"
                        className="h-4 w-4 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => {
                          setEditingTodo(index);
                          setEditTodoText(todo.todo);
                          setEditTodoDate(new Date(todo.date));
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        title="Delete ToDo"
                        className="h-4 w-4 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                        onClick={() => deleteTodo(todo.id)}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 pb-4">
            <Input onTodoCreated={fetchTodos} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
