import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../Firebase/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore';

interface PostData {
  title: string;
  tags: string;
  metaDescription: string;
  content: string;
  imageUrl?: string; // Optional field for image URL
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const postData: PostData = req.body;

    if (!postData.title || !postData.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      const docRef = await addDoc(collection(db, 'posts'), postData);
      return res.status(200).json({ message: 'Post saved successfully', id: docRef.id });
    } catch (error) {
      console.error('Error saving post:', error);
      return res.status(500).json({ error: 'Failed to save post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
