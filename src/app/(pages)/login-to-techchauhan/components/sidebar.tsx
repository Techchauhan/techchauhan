import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faEdit, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
  setActiveTab: (tab: string) => void;
};

export default function Sidebar({ setActiveTab }: SidebarProps) {
  return (
    <div className="md:w-64 w-full md:h-full h-auto bg-gray-800 text-white p-4 md:flex md:flex-col md:fixed">
      <ul className="space-y-4 flex md:flex-col flex-row justify-between md:justify-start">
        <li
          onClick={() => setActiveTab('All Posts')}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faList} className="text-lg" />
          <span className="hidden md:inline">All Posts</span>
        </li>
        <li
          onClick={() => setActiveTab('Add Post')}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faPlus} className="text-lg" />
          <span className="hidden md:inline">Add Post</span>
        </li>
        <li
          onClick={() => setActiveTab('Edit Post')}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faEdit} className="text-lg" />
          <span className="hidden md:inline">Edit Post</span>
        </li>
        <li
          onClick={() => setActiveTab('Add Category')}
          className="cursor-pointer hover:bg-gray-700 p-2 rounded flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faFolderPlus} className="text-lg" />
          <span className="hidden md:inline">Add Category</span>
        </li>
      </ul>
    </div>
  );
}
