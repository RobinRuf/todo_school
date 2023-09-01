import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '../../../firebaseAdmin';

export default async function createTodo(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, todoName } = req.body;

    const collectionRef = adminDb.collection('users').doc(email).collection("active");

    try {
      const docRef = await collectionRef.add({
        name: todoName,
        // ... andere Daten
      });

      res.status(200).json({ message: 'Todo created successfully!', id: docRef.id });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
