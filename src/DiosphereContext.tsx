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

const loadDiographJson = async () => {
  const httpClient = new HttpClient("http://diory-demo-content.surge.sh");
  const diographContents = await httpClient.readTextItem("diograph.json");

  const diograph = JSON.parse(diographContents);
  validateDiograph(diograph);

  return diograph;
};

const DiosphereContext = createContext<Diograph | null>(null);

export function DiosphereProvider({ children }: { children?: ReactNode }) {
  const [diograph, setDiograph] = useState<Diograph | null>(null);

  // My Diory diograph
  useEffect(() => {
    loadDiographJson().then((diographJson) => {
      setDiograph(new Diograph(diographJson));
    });
  }, []);

  return (
    <DiosphereContext.Provider value={diograph}>
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
