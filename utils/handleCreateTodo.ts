import { ToDo } from "@/typings";

export const handleCreateToDo = ({ email, todo, date, state, tag }: ToDo) => {
  if (!email || !todo || !date || !state) {
    console.error("Missing required fields.");
    return;
  }

  fetch("http://localhost:3000/api/firestore/createTodo", {
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
  }).catch((e) => console.log(e));
};
