import React, { useState } from "react";
import "./App.css";
import "./index.css";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import About from "./components/About";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const [defaultTheme, setDarkTheme] = useState("light");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2000);
  };

  const toggleTheme = () => {
    if (defaultTheme === "light") {
      setDarkTheme("dark");
      document.body.style.backgroundColor = "#343a40";
      document.body.style.color = "#fff";
      showAlert("Enabled Dark Mode", "success");
    } else {
      setDarkTheme("light");
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#212529";
      showAlert("Enabled light mode", "success");
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar
            about="About Us"
            defaultTheme={defaultTheme}
            toggleTheme={toggleTheme}
          />
          <Alert alert={alert} />
          <div className="container">
            <Textform
              heading="Type your content here"
              defaultTheme={defaultTheme}
              showAlert={showAlert}
            />
          </div>
        </>
      ),
    },
    {
      path: "/About",
      element: (
        <>
          <Navbar
            about="About Us"
            defaultTheme={defaultTheme}
            toggleTheme={toggleTheme}
          />
          <Alert alert={alert} />
          <div className="container">
            <About defaultTheme={defaultTheme}/>
          </div>
        </>
      ),
    },
    {
      path: "/Contact",
      element: (
        <>
          <Navbar
            about="About Us"
            defaultTheme={defaultTheme}
            toggleTheme={toggleTheme}
          />
          <Alert alert={alert} />
          <div className="container">
            <Contact />
          </div>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
