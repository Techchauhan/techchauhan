import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { handleImageUpload } from './ImageUpload';

type PostFormProps = {
  title: string;
  setTitle: (value: string) => void;
  tags: string;
  setTags: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  imageUrl: string | null;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  postStatus: string;
  setPostStatus: (status: string) => void;
  onSubmit: () => Promise<void>;
};

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

const PostForm: React.FC<PostFormProps> = ({
  title,
  setTitle,
  tags,
  setTags,
  metaDescription,
  setMetaDescription,
  imageFile,
  setImageFile,
  imageUrl,
  categories,
  selectedCategory,
  setSelectedCategory,
  postStatus,
  setPostStatus,
  onSubmit,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFormSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let uploadedImageUrl: string | null = null;

      if (imageFile) {
        uploadedImageUrl = await handleImageUpload(imageFile, (url) => {
          setImageFile(null);
          if (url) {
            console.log('Image URL:', url);
          }
        });
      }

      await onSubmit();
    } catch (error) {
      setError('Failed to save the post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Status Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 2,
          right: 16,
          display: 'flex',
          gap: 1,
        }}
      >
        <Button
          variant={postStatus === 'Draft' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => setPostStatus('Draft')}
        >
          Draft
        </Button>
        <Button
          variant={postStatus === 'Published' ? 'contained' : 'outlined'}
          color="primary"
          onClick={handleFormSubmit}
        >
          Publish
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter post title"
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            {/* Tags */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                placeholder="Enter tags separated by commas"
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            {/* Meta Description */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
                rows={3}
                placeholder="Enter meta description"
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            {/* Category */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Categories
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured Image */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Featured Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded" className="mt-4" />
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

      {/* Submit Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </Box>
    </Box>
  );
};

export default PostForm;
