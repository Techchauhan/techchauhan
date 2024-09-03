'use client';
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import AddPost from "./features/AddPost/page";
import EditPost from './features/edit-post/[id]/page';
import AddCategory from './features/Category/Category';
import AllPosts from './features/AllPosts/index'; // Adjust the import according to your project

type TabName = 'All Posts' | 'Add Post' | 'Edit Post' | 'Add Category';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabName>('All Posts');

  let ActiveComponent: React.ComponentType<any>;

  switch (activeTab) {
    case 'Add Post':
      ActiveComponent = AddPost;
      break;
    case 'Edit Post':
      ActiveComponent = EditPost;
      break;
    case 'Add Category':
      ActiveComponent = AddCategory;
      break;
    case 'All Posts':
    default:
      ActiveComponent = AllPosts;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 bg-gray-100 mt-16 md:mt-0 md:ml-64">
        <ActiveComponent />
      </div>
    </div>
  );
}
