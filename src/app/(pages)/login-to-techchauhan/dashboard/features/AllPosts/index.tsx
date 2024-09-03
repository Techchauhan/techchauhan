'use client'; // This marks the component as a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for App Router in Next.js 13
import { db } from '../../../../../../Firebase/firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
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

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter(); // Use `useRouter` from 'next/navigation'

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(fetchedPosts);
      } catch (error) {
        toast.error(`Error fetching posts: ${(error as Error).message}`);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId: string) => {
    router.push(`/login-to-techchauhan/dashboard/features/edit-post/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success('Post deleted successfully.');
    } catch (error) {
      toast.error(`Error deleting post: ${(error as Error).message}`);
    }
  };

  const handleView = (postId: string) => {
    router.push(`/view-post/${postId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(post.id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(post.id)}>
                  <Delete />
                </IconButton>
                <IconButton onClick={() => handleView(post.id)}>
                  <Visibility />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllPosts;
