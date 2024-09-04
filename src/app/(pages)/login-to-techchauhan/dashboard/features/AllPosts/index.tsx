'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for App Router in Next.js 13
import { db } from '../../../../../../Firebase/firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
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
  const [loading, setLoading] = useState<boolean>(true); // Loading state to control spinner
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
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
      } finally {
        setLoading(false); // Stop loading when fetch is complete
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId: string) => {
    router.push(`/login-to-techchauhan/dashboard/features/edit-post/${postId}`);
  };

  const handleView = (postId: string) => {
    router.push(`/login-to-techchauhan/dashboard/features/view-post/${postId}`);
  };

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await deleteDoc(doc(db, 'posts', postToDelete));
        setPosts(posts.filter((post) => post.id !== postToDelete));
        toast.success('Post deleted successfully.');
      } catch (error) {
        toast.error(`Error deleting post: ${(error as Error).message}`);
      } finally {
        setDialogOpen(false);
        setPostToDelete(null);
      }
    }
  };

  const openDeleteDialog = (postId: string) => {
    setPostToDelete(postId);
    setDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDialogOpen(false);
    setPostToDelete(null);
  };

  return (
    <>
      {loading ? ( // Display the CircularProgress when loading
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
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
                    <IconButton onClick={() => openDeleteDialog(post.id)}>
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
      )}

      <Dialog open={dialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AllPosts;
