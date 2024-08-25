'use client'
import { useEffect, useState } from 'react';
import { db } from '../../../../../../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const BlogPosts = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map(doc => doc.data());
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6">
      {posts.map((post, index) => (
        <div key={index} className="mb-6 p-4 border rounded-lg bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-2">{post.metaDescription}</p>
          <div className="text-black" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          {post.imageUrl && <img src={post.imageUrl} alt="Post Image" className="mt-4 w-full" />}
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
