// src/App.js
import Navbar from "./components/Navbar.jsx";
import LoadingBar from "react-top-loading-bar";
import React, { useState} from "react";
import Sidebar from "./components/Sidebar";
import MainArea from "./components/MainContainer.jsx";
import "./App.css";
// import CategorySection from "./components/CatergorySection.jsx";
// import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState(0);
 
  let apiKey = process.env.REACT_APP_NEWS_API_KEY; // error
  if(!apiKey){
    console.log('apiKey is missing', apiKey)
  }
  console.log("working Properly", apiKey)
  const handleSearch = (query) => {
    setQuery(query);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar onSearch={handleSearch} />
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="app-body">
          {console.log("checking env file", apiKey)}
          <Sidebar />
          <Routes>
            <Route
              path="/"
              element={
                <MainArea
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="general"
                  pageSize={5}
                  country="in"
                  category="general"
                  searchQuery={query}
                />
              }
            />
            <Route
              path="/business"
              element={
                <MainArea
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="business"
                  pageSize={5}
                  country="in"
                  category="business"
                  searchQuery={query}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <MainArea
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="entertainment"
                  pageSize={5}
                  country="in"
                  category="entertainment"
                  searchQuery={query}
                />
              }
            />
            <Route
              path="/general"
              element={
                <MainArea
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="general"
                  pageSize={5}
                  country="in"
                  category="general"
                  searchQuery={query}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <MainArea
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="sports"
                  pageSize={5}
                  country="in"
                  category="sports"
                  searchQuery={query}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <MainArea
                  setProgress={setProgress}
                  apiKey={apiKey}
                  key="technology"
                  pageSize={5}
                  country="in"
                  category="technology"
                  searchQuery={query}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
