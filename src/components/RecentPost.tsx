'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../Firebase/firebaseConfig';
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
  createdAt: Timestamp;
}

const RecentPosts: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const recentPostsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(5));
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
      <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Recent Posts</h2>
        <div className="text-white">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Recent Posts</h2>
        <div className="text-red-200">{error}</div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Recent Posts</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className="w-80 p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.metaDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-indigo-500 font-medium">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.createdAt.toDate().toDateString()}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-white">No recent posts available.</div>
        )}
      </div>
    </section>
  );
};

export default RecentPosts;
