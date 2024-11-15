import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function FlutterWithFirebase() {
  const [selectedKey, setSelectedKey] = useState("photos");

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
          <Tab
            key="photos"
            title={
              <span
                className={`px-4 py-2 rounded-lg ${
                  selectedKey === "photos"
                    ? "bg-primary text-white font-bold"
                    : "text-black"
                }`}
              >
                Photos
              </span>
            }
          >
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="music"
            title={
              <span
                className={`px-4 py-2 rounded-lg ${
                  selectedKey === "music"
                    ? "bg-primary text-white font-bold"
                    : "text-black"
                }`}
              >
                Music
              </span>
            }
          >
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
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
