import React, { useState } from "react";
import { Box, Tabs, Tab, Card, CardContent } from "@mui/material";
import NextJsAuthentication from './auth/page';  // Importing the NextJsAuthentication component
import NextjsFirestore from './Firestrore/page';

export default function NextJsWithFirebase() {
  const [selectedKey, setSelectedKey] = useState("Authentication");

  return (
    <div className="flex h-screen"> {/* Full-screen container */}
      <Box
        sx={{
          width: 250, // Fixed width for the tab container
          position: "sticky", // Sticky tabs
          top: 0, // Stick to the top
          height: "100vh", // Full height to fill the screen
          backgroundColor: "#f9f9f9", // Light background for the tabs
          borderRight: "1px solid #E5E7EB", // Border on the right of the tab bar
          zIndex: 10, // Keeps tabs above the content
          padding: "10px", // Optional padding for inner spacing
        }}
      >
        <Tabs
          value={selectedKey}
          onChange={(event, newValue) => setSelectedKey(newValue)}
          aria-label="Options"
          orientation="vertical" // Vertical tabs
          sx={{
            height: "100%", // Ensure the tabs take up the full height
            display: "flex",
            flexDirection: "column", // Stack tabs vertically
            padding: 0, // Remove default padding
            marginTop: 2, // Add some margin from the top
          }}
        >
          {/* Authentication Tab */}
          <Tab
            label="Authentication"
            value="Authentication"
            sx={{
              fontWeight: selectedKey === "Authentication" ? "bold" : "normal",
              color: selectedKey === "Authentication" ? "white" : "black",
              backgroundColor: selectedKey === "Authentication" ? "#6832a8" : "transparent",
              borderRadius: "4px",
              padding: "10px 20px",
              margin: "5px 0",
              '&:hover': {
                backgroundColor: "#6832a8",
                color: "white"
              }
            }}
          />

          {/* Firestore Tab */}
          <Tab
            label="Firestore"
            value="Firestore"
            sx={{
              fontWeight: selectedKey === "Firestore" ? "bold" : "normal",
              color: selectedKey === "Firestore" ? "white" : "black",
              backgroundColor: selectedKey === "Firestore" ? "#6832a8" : "transparent",
              borderRadius: "4px",
              padding: "10px 20px",
              margin: "5px 0",
              '&:hover': {
                backgroundColor: "#6832a8",
                color: "white"
              }
            }}
          />

          {/* Videos Tab */}
          <Tab
            label="Videos"
            value="videos"
            sx={{
              fontWeight: selectedKey === "videos" ? "bold" : "normal",
              color: selectedKey === "videos" ? "white" : "black",
              backgroundColor: selectedKey === "videos" ? "#6832a8" : "transparent",
              borderRadius: "4px",
              padding: "10px 20px",
              margin: "5px 0",
              '&:hover': {
                backgroundColor: "#6832a8",
                color: "white"
              }
            }}
          />
        </Tabs>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          flex: 1, // Allow this box to take the remaining space
          padding: "20px", // Padding for content
          overflowY: "auto", // Ensures scrolling content if needed
        }}
      >
        {/* Render the content for the selected tab */}
        {selectedKey === "Authentication" && (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <NextJsAuthentication /> {/* Calling the NextJsAuthentication component */}
            </CardContent>
          </Card>
        )}

        {selectedKey === "Firestore" && (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <NextjsFirestore /> {/* Calling the NextjsFirestore component */}
            </CardContent>
          </Card>
        )}

        {selectedKey === "videos" && (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
}
