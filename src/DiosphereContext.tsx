import { createContext, ReactNode, useContext } from "react";
import diographJson from "../mary-json.json";
import { Diograph } from "@diograph/diograph";
const diograph = new Diograph(diographJson);

const DiosphereContext = createContext<any>(diograph);

export function DiosphereProvider({ children }: { children?: ReactNode }) {
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
