'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../../Firebase/firebaseConfig';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
        const recentPostsQuery = query(postsRef, orderBy('createdAt', 'desc'), limit(10)); // Increase the limit to 10
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
      <style jsx>{`
        .ql-editor img {
          display: block;
          align-item: center
          margin-left: auto;
          margin-right: auto;
          max-width: 100%;
          height: auto;
        }
        .recent-posts-scrollable {
          max-height: 700px; /* Increase max height to accommodate more posts */
          overflow-y: auto; /* Enable vertical scrolling */
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
        <div className="mb-4 bg-gray-100 p-3 rounded-md shadow">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {post.category}
          </span>
        </div>
        <div className="text-black text-lg" dangerouslySetInnerHTML={{ __html: post.metaDescription }} />
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <div className="mb-4 ql-editor text-black text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
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
