import { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../firebaseAdmin";
import { toast } from "react-toastify";

export default async function updateTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, id, newText, newDate } = req.body; // Destructuring, um die benötigten Daten aus dem Body zu extrahieren

    if (!email || !id || !newText || !newDate) {
      return res
        .status(400)
        .json({ message: "Email, id, newText und newDate sind erforderlich." });
    }

    try {
      const todoRef = adminDb
        .collection("todos")
        .doc(email)
        .collection("todos")
        .doc(id);

      // Update document
      await todoRef.update({
        todo: newText,
        date: newDate,
      });

      return res
        .status(200)
        .json({ message: "ToDo erfolgreich aktualisiert." });
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
