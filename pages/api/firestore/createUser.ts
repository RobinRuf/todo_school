import { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "../../../firebaseAdmin";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, image } = req.body;

    const docRef = adminDb.collection("users").doc(email);

    const doc = await docRef.get();

    if (!doc.exists) {
      try {
        await docRef.set({
          name,
          email,
          image,
        });

        res.status(200).json({ message: "Signed up successfully!" });
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: error.message });
      }
    } else {
      res.status(200).json({ message: "Signed in successfully" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
