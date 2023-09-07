import { toast } from "react-toastify";

export const handleGetTodos = async (email: string) => {
  const response = await fetch("/api/firestore/getTodos", {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // check, if response is ok, before returning it
  if (response.ok) {
    return await response.json();
  } else {
    toast.error("Error while fetching todos - please reload");
    throw new Error(`Failed to fetch todos: ${response.statusText}`);
  }
};
