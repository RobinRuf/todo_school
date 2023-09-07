import { faToiletPaperSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export async function deleteTodo(todoId, email) {
  try {
    const response = await fetch("/api/deleteTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        todoId: todoId,
      }),
    });

    if (response.ok) {
      toast.success("ToDo successfully deleted!");
    } else {
      const data = await response.json();
      toast.error("Error:", data.message);
    }
  } catch (e) {
    toast.error("Error:", e.message);
  }
}
