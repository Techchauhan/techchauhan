'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { db } from '../../../../../../../Firebase/firebaseConfig'; // Adjust the path as necessary
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import PostForm from '../../AddPost/PostForm'; // Adjust this import path based on your directory structure
import QuillEditor from '../../AddPost/QuillEditor'; // Import QuillEditor

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

const EditPost: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<string>(''); // State for QuillEditor content
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
          setContent(postData.content); // Initialize content for QuillEditor
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

    fetchPost();
  }, [postId, router]);

  const handleUpdate = async () => {
    if (!postId || !post) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedPost = {
        title: post.title,
        tags: post.tags,
        metaDescription: post.metaDescription,
        content,
        imageUrl: post.imageUrl,
        category: post.category,
        status: post.status,
      };

      await updateDoc(doc(db, 'posts', postId), updatedPost);
      toast.success('Post updated successfully!');
      router.push('/login-to-techchauhan/dashboard'); // Redirect to the All Posts page
    } catch (error) {
      setError(`Error updating post: ${(error as Error).message}`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading state while fetching post data
  }

  if (!post) {
    return <div>No post found to edit.</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

      <PostForm
        title={post.title}
        setTitle={(title: string) => setPost(prev => prev ? { ...prev, title } : null)}
        tags={post.tags}
        setTags={(tags: string) => setPost(prev => prev ? { ...prev, tags } : null)}
        metaDescription={post.metaDescription}
        setMetaDescription={(metaDescription: string) => setPost(prev => prev ? { ...prev, metaDescription } : null)}
        imageFile={null} // Not handling image file input here, you can add this logic if needed
        setImageFile={() => {}} // Placeholder function
        imageUrl={post.imageUrl}
        categories={[]} // Populate with your categories if needed
        selectedCategory={post.category}
        setSelectedCategory={(category: string) => setPost(prev => prev ? { ...prev, category } : null)}
        postStatus={post.status}
        setPostStatus={(status: string) => setPost(prev => prev ? { ...prev, status } : null)}
        onSubmit={handleUpdate}
      />

      <QuillEditor content={content} onChange={setContent} />

      <button
        onClick={handleUpdate}
        disabled={isSubmitting}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        {isSubmitting ? 'Saving...' : 'Save Post'}
      </button>
    </div>
  );
};

export default EditPost;
