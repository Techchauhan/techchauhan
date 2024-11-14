'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/Firebase/firebaseConfig';
import { Spin } from 'antd';

type Blog = {
  id: string;
  title: string;
  createdAt: Timestamp;
};

export default function Blogs() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        setPosts(blogs);
        setFilteredPosts(blogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-gray-100 cursor-pointer transition-all duration-300"
            onClick={() => router.push(`/post/${post.id}`)}
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-400 text-sm">
              Created at: {post.createdAt.toDate().toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
         <div className="flex justify-center items-center mt-4">
         <Spin />
       </div>
      )}
    </div>
  );
}
