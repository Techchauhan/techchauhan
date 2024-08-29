import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../Firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Define the interface for the post data
interface PostData {
  title: string;
  tags?: string; // Optional field for tags
  metaDescription?: string; // Optional field for meta description
  content: string;
  imageUrl?: string; // Optional field for image URL
}

// Define the handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Parse the post data from the request body
    const postData: PostData = req.body;

    // Basic validation for required fields
    if (!postData.title || !postData.content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
      // Add the post data to the 'posts' collection in Firestore
      const docRef = await addDoc(collection(db, 'posts'), postData);

      // Send a success response with the document ID
      return res.status(200).json({ message: 'Post saved successfully', id: docRef.id });
    } catch (error) {
      // Log the error and send a server error response
      console.error('Error saving post:', (error as Error).message);
      return res.status(500).json({ error: 'Failed to save post' });
    }
  } else {
    // Set the allowed methods and send a method not allowed response
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
