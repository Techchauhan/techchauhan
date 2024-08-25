import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../../../../Firebase/firebaseConfig'; // Import storage
import { collection, addDoc } from 'firebase/firestore';
import Head from 'next/head';

const AddPost = () => {
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      try {
        await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        return url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    try {
      const imageUrl = await handleImageUpload();

      const postData = {
        title,
        tags,
        metaDescription,
        content,
        imageUrl,
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

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          placeholder="Enter post title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          placeholder="Enter tags separated by commas"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Meta Description</label>
        <textarea
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700"
          rows={3}
          placeholder="Enter meta description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="border rounded w-full py-2 px-3 text-gray-700"
        />
        {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4" />}
      </div>

      <ReactQuill 
        value={content} 
        onChange={handleContentChange} 
        modules={AddPost.modules} 
        formats={AddPost.formats} 
        placeholder="Write something amazing..."
        className="mb-4 text-black"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Post
      </button>
    </div>
  );
};

// Setting up modules and formats for React Quill
AddPost.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['code-block'],
    [{ 'align': [] }],
    ['clean'] // removes formatting
  ],
};

AddPost.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image', 'video',
  'code-block', 'align'
];

export default AddPost;
