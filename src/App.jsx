import React from "react";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/home";
import { Projects } from "./pages/Projects";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <Navbar>
          <Home />
          <Projects />
          <Experience />
          <About />
          <Contact />
        </Navbar>
      </div>
    </LanguageProvider>
  );
}

export default App;
