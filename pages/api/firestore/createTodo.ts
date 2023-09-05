import { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../firebaseAdmin";

export default async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, date, todo, state, tag } = req.body;

    const docRef = adminDb.collection("todos").doc(email);
    const todoRef = docRef.collection("todos");

    try {
      await todoRef.add({
        date,
        todo,
        state,
        tag,
      });

      res.status(200).json({ message: "Todo created successfully" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
