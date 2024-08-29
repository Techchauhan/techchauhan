export const handleImageUpload = async (
  file: File | null,
  setImageUrl: (url: string | null) => void
): Promise<string | null> => {
  if (!file) {
    return null;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Image upload failed:', errorData.message || 'Unknown error');
      throw new Error(errorData.message || 'Image upload failed');
    }

    const data = await response.json();
    const imageUrl = data.url;

    // Update the state with the uploaded image URL
    setImageUrl(imageUrl);
    return imageUrl;

  } catch (error) {
    // Show an error message to the user, e.g., via toast
    console.error('Image upload error:', error);
    setImageUrl(null); // Reset the image URL on error
    return null;
  }
};
