import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import NextJsAuthentication from './auth/page';  // Importing the NextJsAuthentication component
import NextjsFirestore from './Firestrore/page'

export default function NextJsWithFirebase() {
  const [selectedKey, setSelectedKey] = useState("Authentication");

  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          placement="start"
          selectedKey={selectedKey}
          onSelectionChange={(key) => setSelectedKey(key)}
          className="custom-tabs"
        >
          {/* Authentication Tab */}
          <Tab
            key="Authentication"
            title={
              <span
                className={`px-4 py-2 rounded-lg ${
                  selectedKey === "Authentication"
                    ? "bg-primary text-white font-bold"
                    : "text-black"
                }`}
              >
                Authentication
              </span>
            }
          >
            <Card>
              <CardBody>
                <NextJsAuthentication /> {/* Calling the NextJsAuthentication component */}
              </CardBody>
            </Card>
          </Tab>

          {/* Music Tab */}
          <Tab
            key="Firestore"
            title={
              <span
                className={`px-4 py-2 rounded-lg ${
                  selectedKey === "Firestore"
                    ? "bg-primary text-white font-bold"
                    : "text-black"
                }`}
              >
                Firestore
              </span>
            }
          >
            <Card>
              <CardBody>
                  <NextjsFirestore/>
              </CardBody>
            </Card>
          </Tab>

          {/* Videos Tab */}
          <Tab
            key="videos"
            title={
              <span
                className={`px-4 py-2 rounded-lg ${
                  selectedKey === "videos"
                    ? "bg-primary text-white font-bold"
                    : "text-black"
                }`}
              >
                Videos
              </span>
            }
          >
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
