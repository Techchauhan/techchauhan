import { useState } from 'react';
import Head from 'next/head';
import { handleImageUpload } from './ImageUpload';
import QuillEditor from './QuillEditor';
import PostForm from './PostForm';

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

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    try {
      const uploadedImageUrl = await handleImageUpload(imageFile, setImageUrl); // Use setImageUrl for URL update

      const postData = {
        title,
        tags,
        metaDescription,
        content,
        imageUrl: uploadedImageUrl,
        category: selectedCategory,
        status: postStatus,
      };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Post saved successfully:', result);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <Head>
        <title>{title || "Add New Post"}</title>
        <meta name="description" content={metaDescription || "Add a new post to your blog."} />
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
        setImageFile={setImageFile} // This should be for handling image files
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Post
      </button>
    </div>
  );
};

export default AddPost;
