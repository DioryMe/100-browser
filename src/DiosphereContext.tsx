import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Diograph } from "@diograph/diograph";
import { HttpClient } from "@diograph/http-client";
import { validateDiograph } from "@diograph/diograph/validator";
import { IDiory } from "@diograph/diograph/types";

const loadDiographJson = async () => {
  const httpClient = new HttpClient("http://diory-demo-content.surge.sh");
  const diographContents = await httpClient.readTextItem("diograph.json");

  const diograph = JSON.parse(diographContents);
  validateDiograph(diograph);

  return diograph;
};

interface DiosphereContextType {
  diograph: Diograph | null;
  storyDiory: IDiory;
  setStoryDiory: React.Dispatch<React.SetStateAction<IDiory>>;
}

const DiosphereContext = createContext<DiosphereContextType>(null);

export function DiosphereProvider({ children }: { children?: ReactNode }) {
  const [diograph, setDiograph] = useState<Diograph | null>(null);
  const [storyDiory, setStoryDiory] = useState<IDiory | null>(null);

  useEffect(() => {
    loadDiographJson().then((diographJson) => {
      setDiograph(new Diograph(diographJson));
    });
  }, []);

  return (
    <DiosphereContext.Provider
      value={{
        diograph,
        setStoryDiory,
        storyDiory,
      }}
    >
      {children}
    </DiosphereContext.Provider>
  );
}

export function useDiosphereContext() {
  const context = useContext(DiosphereContext);
  if (context === undefined) {
    throw new Error(
      "useDiosphereContext must be used within a DiosphereProvider"
    );
  }
  return context;
}
