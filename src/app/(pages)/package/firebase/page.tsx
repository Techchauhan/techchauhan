'use client';

import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import { NextIcon } from './Icons/NextIcons'; // Custom Next.js icon
import { FlutterIcon } from './Icons/FlutterIcon'; // Custom Flutter icon
import Particles from '@/components/ui/particles'; // Magic UI Particles component
import Meteors from '@/components/ui/meteors'; // Magic UI Meteors component
import NextJsWithFirebase from './nextjs-with-firebase/page';
import FlutterWithFirebase from './nextjs-with-firebase/page'
type Props = {};

const FirebaseCompleteLearning = (props: Props) => {
  const [activeTab, setActiveTab] = useState('nextjs'); // Default active tab is Next.js

  const renderTabContent = () => {
    switch (activeTab) {
      case 'nextjs':
        return (
            <div className="relative p-6 bg-gradient-to-r from-purple-500/70 via-purple-400/50 to-indigo-600/70 text-white rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 rounded-lg pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold">Next.js & Firebase</h2>
              <NextJsWithFirebase />
            </div>
          </div>
        );
      case 'flutter':
        return (
            <div className="relative  p-6 bg-gradient-to-r from-blue-400/70 to-cyan-500/70 text-white rounded-lg shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 rounded-lg pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold">Flutter & Firebase</h2>
              <FlutterWithFirebase></FlutterWithFirebase>
            </div>
          </div>
          
        );
      default:
        return <div className="text-center">Select a tab to view its content.</div>;
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full p-8 bg-black overflow-hidden">
      {/* Galaxy background with moving particles and meteors */}
      <Particles className="absolute top-0 left-0 w-full h-full z-0" />
      <Meteors />

      <div className="flex justify-end z-10">
        <Tabs
          aria-label="Firebase Learning Tabs"
          color="primary"
          variant="bordered"
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
          className="w-80 bg-white rounded-lg shadow-md"
        >
          <Tab
            key="nextjs"
            title={
              <div className="flex items-center space-x-2">
                <NextIcon />
                <span className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                  Next.js
                </span>

              </div>
            }
          />
          <Tab
            key="flutter"
            title={
              <div className="flex items-center space-x-2">
                <FlutterIcon />
                <span className="font-medium text-gray-800 hover:text-blue-500 transition-colors">
                  Flutter
                </span>
              </div>
            }
          />
        </Tabs>
      </div>
      <div className="mt-10 z-10">{renderTabContent()}</div>
    </div>
  );
};

export default FirebaseCompleteLearning;
