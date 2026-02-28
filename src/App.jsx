import React from "react";
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

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <GlobalStyles />
        <GlobalBackground />
        <div className="App">
          <Navbar>
            <Home />
            <Earth />
            <About />
            <Projects />
            <Experience />
            <Certificates />
            <Contact />
          </Navbar>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
