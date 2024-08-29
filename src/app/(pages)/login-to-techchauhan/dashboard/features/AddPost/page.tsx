import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { handleImageUpload } from './ImageUpload';
import PostForm from './PostForm';
import { toast } from 'react-toastify';
import { db } from '../../../../../../Firebase/firebaseConfig'; // Ensure correct import path
import { collection, addDoc } from 'firebase/firestore'; // Ensure correct imports

// Dynamically import the QuillEditor with SSR disabled
const QuillEditor = dynamic(() => import('./QuillEditor'), { ssr: false });

const AddPost = () => {
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [postStatus, setPostStatus] = useState<string>('Draft');
  const [categories, setCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error('Title and content are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Handle image upload if an image file is provided
      const uploadedImageUrl = imageFile ? await handleImageUpload(imageFile, setImageUrl) : imageUrl;

      // Prepare post data to be saved in Firestore
      const postData = {
        title,
        tags,
        metaDescription,
        content,
        imageUrl: uploadedImageUrl || null,
        category: selectedCategory,
        status: postStatus,
        createdAt: new Date(), // Optional: Adding timestamp
      };

      // Debug check
      console.log('Firestore instance:', db);

      // Ensure `db` is correctly initialized and passed to `collection`
      const postsCollection = collection(db, 'posts'); // Correctly reference the collection
      console.log('Posts collection reference:', postsCollection);

      const docRef = await addDoc(postsCollection, postData);
      console.log('Post saved successfully with ID:', docRef.id);
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
      <Head>
        <title>{title || 'Add New Post'}</title>
        <meta name="description" content={metaDescription || 'Add a new post to your blog.'} />
      </Head>

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

      <QuillEditor content={content} onChange={handleContentChange} />

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
