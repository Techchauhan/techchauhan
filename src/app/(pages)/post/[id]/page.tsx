'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../../Firebase/firebaseConfig';
import { doc, getDoc, collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';

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

const ViewPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
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
          const postData = docSnap.data() as Omit<Post, 'id'>;
          setPost({
            id: docSnap.id,
            ...postData,
            createdAt: docSnap.data().createdAt, // No need to convert to Date here
          });
          console.log('Post content:', postData.content);
        } else {
          toast.error('Post not found.');
          router.push('/techchauhan/dashboard/');
        }
      } catch (error) {
        toast.error(`Error fetching post: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRecentPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const recentPostsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(recentPostsQuery);
        const posts: Post[] = [];

        querySnapshot.forEach((doc) => {
          const postData = doc.data() as Omit<Post, 'id'>;
          posts.push({ id: doc.id, ...postData });
        });

        setRecentPosts(posts);
      } catch (error) {
        toast.error(`Error fetching recent posts: ${(error as Error).message}`);
      }
    };

    fetchPost();
    fetchRecentPosts();
  }, [postId, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No post found to display.</div>;
  }

  return (
    <div className="px-4 lg:px-20 py-6 bg-white shadow-md rounded-md">
      <style jsx global>{`
        .ql-editor img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          height: auto;
        }
        .ql-editor code {
          background-color: #282c34;
          color: #ffffff;
          padding: 8px;
          border-radius: 5px;
          font-family: 'Courier New', Courier, monospace;
          display: block;
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          margin: 16px 0;
        }
        .ql-editor pre {
          background-color: #282c34;
          color: #ffffff;
          padding: 12px;
          border-radius: 5px;
          overflow-x: auto;
          margin: 16px 0;
        }
        .ql-editor h1 {
          font-size: 2.5em;
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 10px;
        }
        .ql-editor h2 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 15px;
          margin-bottom: 8px;
        }
        .ql-editor p {
          margin-bottom: 1em;
        }
        .recent-posts-scrollable {
          max-height: 700px;
          overflow-y: auto;
        }
        @media (max-width: 768px) {
          .px-4 {
            padding-left: 10px;
            padding-right: 10px;
          }
          .lg\\:px-20 {
            padding-left: 10px;
            padding-right: 10px;
          }
          .lg\\:text-5xl {
            font-size: 2.5rem;
          }
          .ql-editor h1 {
            font-size: 2rem;
          }
          .ql-editor h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {post.imageUrl && (
        <div className="mb-6 flex justify-center">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full md:max-w-md md:max-h-80 object-cover rounded-md shadow-lg"
          />
        </div>
      )}
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-tight leading-tight lg:text-5xl">
        {post.title}
      </h1>
      <div className="text-gray-600 mb-4">
        <div className="mb-4 bg-gray-100 p-3 rounded-md shadow flex items-center justify-between">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">
            {format(post.createdAt.toDate(), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="text-black text-lg" dangerouslySetInnerHTML={{ __html: post.metaDescription }} />
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <div className="mb-4 ql-editor text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="recent-posts-scrollable mb-10">
              <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {recentPosts.map((recentPost) => (
                  <div
                    key={recentPost.id}
                    className="p-4 bg-gray-50 rounded-md shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    {recentPost.imageUrl && (
                      <img
                        src={recentPost.imageUrl}
                        alt={recentPost.title}
                        className="h-32 w-full object-cover rounded-md mb-2"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">{recentPost.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{recentPost.metaDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

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
