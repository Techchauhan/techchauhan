'use client'
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import AddPost from "./features/AddPost/AddPost"

function AllPosts() {
  return <div>All Posts Component</div>;
}

 

function EditPost() {
  return <div>Edit Post Component</div>;
}

function AddCategory() {
  return <div>Add Category Component</div>;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<string>('All Posts');

  let ActiveComponent: React.ComponentType;
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
