import { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../firebaseAdmin";
import { toast } from "react-toastify";

export default async function getTodos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const email = req.body.email;

    try {
      const todoRef = adminDb.collection("todos").doc(email);
      const snapshot = await todoRef.collection("todos").get();

      const todosArray = [];

      snapshot.forEach((doc) => {
        const todoData = doc.data();
        todoData.id = doc.id; // Hinzufügen der Dokument-ID
        todosArray.push(todoData);
      });

      // sort the array
      todosArray.sort((a, b) => a.date - b.date);

      return res.status(200).json({ data: todosArray });
    } catch (error) {
      toast.error("Database error:" + error);
      console.error("Database error:", error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
