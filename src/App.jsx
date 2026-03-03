import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/home";
import { Projects } from "./pages/Projects";
import { Certificates } from "./pages/Certificates";
import { Earth } from "./pages/Earth";
import { GlobalBackground } from "./components/GlobalBackground";
import { LanguageProvider, ThemeProvider } from "./context";
import { GlobalStyles } from "./utils";
import AdminApp from "./admin/AdminApp";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GlobalStyles />
        <GlobalBackground />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <Navbar>
                  <Home />
                  <Earth />
                  <About />
                  <Projects />
                  <Experience />
                  <Certificates />
                  <Contact />
                </Navbar>
              }
            />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;