'use client';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../../../Firebase/firebaseConfig'; // Adjust the path as necessary
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
import { handleImageUpload } from './ImageUpload';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

const PostForm = dynamic(() => import('./PostForm'), { ssr: false });
const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

const AddPost = () => {
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [postStatus, setPostStatus] = useState<string>('Draft');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ [key: string]: string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, 'categories'));
        const querySnapshot = await getDocs(q);
        const fetchedCategories: Category[] = [];
        const fetchedCategoryOptions: { [key: string]: string[] } = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Category, 'id'>; // Exclude 'id' to prevent duplication
          const id = doc.id;
          fetchedCategories.push({ id, ...data });

          if (data.parentId) {
            if (!fetchedCategoryOptions[data.parentId]) {
              fetchedCategoryOptions[data.parentId] = [];
            }
            fetchedCategoryOptions[data.parentId].push(id);
          }
        });

        setCategories(fetchedCategories);
        setCategoryOptions(fetchedCategoryOptions);
      } catch (error) {
        toast.error(`Error fetching categories: ${(error as Error).message}`);
      }
    };

    fetchCategories();
  }, []);

  // Function to create a slug from the title
  const createSlug = (title: string): string => {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing whitespace
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error('Title and content are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedImageUrl = imageFile ? await handleImageUpload(imageFile, setImageUrl) : imageUrl;

      const slug = createSlug(title); // Generate slug from the title

      const postData = {
        title,
        tags,
        metaDescription,
        content,
        imageUrl: uploadedImageUrl || null,
        category: selectedCategory,
        status: postStatus,
        uid: slug, // Use the generated slug as the uid
        createdAt: new Date(),
      };

      // Use setDoc instead of addDoc to specify the document ID as the slug
      const postDocRef = doc(db, 'posts', slug);
      await setDoc(postDocRef, postData);
      console.log('Post saved successfully with slug:', slug);
      toast.success('Post saved successfully!');

      // Clear form fields after successful submission
      setTitle('');
      setTags('');
      setMetaDescription('');
      setContent('');
      setImageFile(null);
      setImageUrl(null);
      setSelectedCategory('');
      setPostStatus('Draft');
    } catch (error) {
      toast.error(`Error saving post: ${(error as Error).message}`);
      console.error('Error saving post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Post</h2>

      <PostForm
        title={title}
        setTitle={setTitle}
        tags={tags}
        setTags={setTags}
        metaDescription={metaDescription}
        setMetaDescription={setMetaDescription}
        imageFile={imageFile}
        setImageFile={setImageFile}
        imageUrl={imageUrl}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        postStatus={postStatus}
        setPostStatus={setPostStatus}
        onSubmit={handleSubmit}
      />

      <QuillEditor content={content} onChange={setContent} />

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        {isSubmitting ? 'Saving...' : 'Save Post'}
      </button>
    </div>
  );
};

export default AddPost;
