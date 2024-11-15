'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { MarqueeDemo } from './ui/marquee';
import { db } from '@/Firebase/firebaseConfig';

type Props = {};

type Blog = {
  id: string;
  title: string;
  createdAt: Timestamp;
  imageUrl: string;
};

export default function RecentPost({}: Props) {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Store the Firestore document ID
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          imageUrl: doc.data().imageUrl,
        })) as Blog[];
        setPosts(blogs);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Map posts into the structure expected by MarqueeDemo
  const reviews = posts.map((post) => ({
    id: post.id, // Keep the Firestore doc ID in reviews
    name: post.title,
    username: `@${post.id}`, // Use the blog ID as the username or customize as needed
    body: `Published on: ${post.createdAt.toDate().toLocaleDateString()}`,
    img: post.imageUrl || "https://via.placeholder.com/32", // Placeholder image if imageUrl is not available
  }));

  return (
    <div> 
      <MarqueeDemo reviews={reviews} />
    </div>
  );
}
