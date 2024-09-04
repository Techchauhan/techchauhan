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
  createdAt: any;
}

const ViewPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    <div className="px-4 lg:px-20 py-6 bg-white shadow-md rounded-md">
      <style jsx>{`
        .ql-editor img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          height: auto;
        }
      `}</style>
      {post.imageUrl && (
        <div className="mb-6 flex justify-center">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="max-w-md max-h-80 object-cover rounded-md shadow-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-tight leading-tight lg:text-5xl">
        {post.title}
      </h1>
      <div className="text-gray-600 mb-4">
        <div className="mb-4 bg-gray-100 p-3 rounded-md shadow">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {post.category}
          </span>
        </div>
        <div className="text-black" dangerouslySetInnerHTML={{ __html: post.metaDescription }} />
      </div>
      <div className="mb-4">
        <div className="text-black" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.split(',').map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
