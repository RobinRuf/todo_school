import { ToDo } from "@/typings";
import { toast } from "react-toastify";

export const handleCreateToDo = async ({
  email,
  todo,
  date,
  state,
  tag,
}: ToDo) => {
  if (!email || !todo || !date || !state) {
    toast.error("Missing required fields!");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/firestore/createTodo",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          date: date?.toISOString(),
          todo,
          state,
          tag,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Todo successfully created");
      return true;
    } else {
      const data = await response.json();
      toast.error(`Error: ${data.message}`);
      return false;
    }
  } catch (e) {
    toast.error(`Error while creating Todo: ${e.message}`);
    return false;
  }
};
