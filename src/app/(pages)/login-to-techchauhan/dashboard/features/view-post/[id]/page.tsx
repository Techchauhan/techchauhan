'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../../../../../Firebase/firebaseConfig'; // Adjust this import based on your directory structure
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

interface Post {
  id: string;
  title: string;
  tags: string;
  metaDescription: string;
  content: string;
  imageUrl: string | null;
  category: string;
  status: string;
  createdAt: any;
}

const ViewPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const postId = params?.id as string;

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        const docRef = doc(db, 'posts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data() as Omit<Post, 'id'>; // Exclude 'id' from the type
          setPost({
            id: docSnap.id,
            ...postData,
          });
        } else {
          toast.error('Post not found.');
          router.push('/techchauhan/dashboard/'); // Redirect if the post is not found
        }
      } catch (error) {
        toast.error(`Error fetching post: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state while fetching post data
  }

  if (!post) {
    return <div>No post found to display.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <style jsx>{`
        .ql-editor img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-4">
        <p><strong>Tags:</strong> {post.tags}</p>
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Status:</strong> {post.status}</p>
        <p><strong>Meta Description:</strong> {post.metaDescription}</p>
      </div>
      {post.imageUrl && (
        <div className="mb-4">
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-md" />
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2 text-black">Content</h2>
        <div className='text-black' dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default ViewPost;
