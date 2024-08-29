import React, { useState, useEffect } from 'react';
import { db } from '../../../../../../Firebase/firebaseConfig'; // Adjust the path as necessary
import { collection, query, getDocs } from 'firebase/firestore';

interface Category {
  id: string;
  name: string;
  parentId?: string;
}

export default function FetchCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'categories'));
        const querySnapshot = await getDocs(q);
        const fetchedCategories: Category[] = [];
        querySnapshot.forEach((doc) => {
          fetchedCategories.push({ id: doc.id, ...doc.data() } as Category);
        });
        setCategories(fetchedCategories);
      } catch (error) {
        setError(`Error fetching categories: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategories = (parentId: string | null, level: number) => {
    return categories
      .filter((cat) => cat.parentId === parentId)
      .map((cat) => (
        <li key={cat.id} style={{ marginLeft: `${level * 20}px` }}>
          <div>{cat.name}</div>
          <ul>
            {renderCategories(cat.id, level + 1)}
          </ul>
        </li>
      ));
  };

  return (
    <div className="p-6 bg-white text-black shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul>
          {renderCategories(null, 0)}
        </ul>
      )}
    </div>
  );
}
