'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link
import { db } from '../Firebase/firebaseConfig'; // Adjust the path as necessary
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

interface Post {
  id: string;
  title: string;
  tags: string;
  metaDescription: string;
  content: string;
  imageUrl: string | null;
  category: string;
  createdAt: Timestamp; // Use Timestamp from Firestore
}

const RecentPosts: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const recentPostsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(5)); // Fetch 5 recent posts
        const querySnapshot = await getDocs(recentPostsQuery);
        const posts: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<Post, 'id'>,
        }));

        setRecentPosts(posts);
      } catch (error) {
        const errorMsg = `Error fetching recent posts: ${(error as Error).message}`;
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
        <div>Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-semibold mb-6">Recent Posts</h2>
        <div className="text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-6">Recent Posts</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id} className="w-80 p-6 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-32 w-full object-cover rounded-md mb-2"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.metaDescription}</p>
            </Link>
          ))
        ) : (
          <div>No recent posts available.</div>
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
