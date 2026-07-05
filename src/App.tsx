import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import { LanguageProvider } from "./context/LanguageProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <LanguageProvider>
          <Suspense>
            <MainContainer>
              <Suspense>
                <CharacterModel />
              </Suspense>
            </MainContainer>
          </Suspense>
        </LanguageProvider>
      </LoadingProvider>
    </>
  );
};

export default App;
