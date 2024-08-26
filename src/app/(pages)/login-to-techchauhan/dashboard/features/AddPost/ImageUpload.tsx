// ImageUpload.ts
export const handleImageUpload = async (
    file: File | null,
    setImageUrl: (url: string | null) => void // This should be the URL setter function
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
        throw new Error('Image upload failed');
      }
  
      const data = await response.json();
      const imageUrl = data.url;
      setImageUrl(imageUrl); // Correctly update the URL state
      return imageUrl;
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };
  