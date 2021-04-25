// src/context/state.js
import { createContext, useContext, useState } from "react";
import { CharacterDetails } from "../pages/character/[pid]";

interface IAppContext {
  character: CharacterDetails | undefined;
  setCharacter: (character: CharacterDetails) => void;
}

const AppContext = createContext({} as IAppContext);

export function AppWrapper({ children }) {
  const [character, setCharacter] = useState<CharacterDetails | undefined>(
    undefined
  );

  return (
    <AppContext.Provider value={{ character, setCharacter }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
