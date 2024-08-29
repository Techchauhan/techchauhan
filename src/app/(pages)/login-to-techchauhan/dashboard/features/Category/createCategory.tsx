import React, { useState, useEffect } from 'react';
import { db } from '../../../../../../Firebase/firebaseConfig'; // Adjust the path as necessary
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';

interface Category {
  id: string;
  name: string;
  parentId?: string; // Optional for subcategories
}

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState<string>('');
  const [parentCategory, setParentCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Fetch categories from Firestore on component mount
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, 'categories'));
        const querySnapshot = await getDocs(q);
        const fetchedCategories: Category[] = [];
        querySnapshot.forEach((doc) => {
          fetchedCategories.push({ id: doc.id, ...doc.data() } as Category);
        });
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSaveCategory = async () => {
    if (!categoryName) {
      toast.error('Category name is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a new category
      await addDoc(collection(db, 'categories'), {
        name: categoryName,
        parentId: parentCategory || null,
      });
      toast.success('Category saved successfully!');

      // Clear form fields
      setCategoryName('');
      setParentCategory(null);

      // Refetch categories to update the list
      const q = query(collection(db, 'categories'));
      const querySnapshot = await getDocs(q);
      const updatedCategories: Category[] = [];
      querySnapshot.forEach((doc) => {
        updatedCategories.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(updatedCategories);
    } catch (error) {
      toast.error(`Error saving category: ${(error as Error).message}`);
      console.error('Error saving category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter category name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Parent Category</label>
        <select
          value={parentCategory || ''}
          onChange={(e) => setParentCategory(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select parent category (optional)</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSaveCategory}
        disabled={isSubmitting}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        {isSubmitting ? 'Saving...' : 'Save Category'}
      </button>
    </div>
  );
}
