import { ToDo } from "@/typings";

export const handleCreateToDo = async ({
  email,
  todo,
  date,
  state,
  tag,
}: ToDo) => {
  if (!email || !todo || !date || !state) {
    console.error("Missing required fields.");
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
      return true;
    } else {
      const data = await response.json();
      console.error(data.message);
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};
