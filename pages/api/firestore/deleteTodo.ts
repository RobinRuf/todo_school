import { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../firebaseAdmin";
import { toast } from "react-toastify";

export default async function deleteTodo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, id } = req.body; // Destructuring, um email und id aus dem Body zu extrahieren

    if (!email || !id) {
      return res
        .status(400)
        .json({ message: "Email und id sind erforderlich." });
    }

    try {
      // Zugriff auf das spezifische ToDo-Dokument über die gegebene email und id
      const todoRef = adminDb
        .collection("todos")
        .doc(email)
        .collection("todos")
        .doc(id);

      // Löschen des Dokuments
      await todoRef.delete();

      return res.status(200).json({ message: "ToDo erfolgreich gelöscht." });
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
