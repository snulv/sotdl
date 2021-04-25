// src/context/state.js
import { Character, Attribute } from "@prisma/client";
import { createContext, useContext, useState } from "react";

export type CharacterDetails = Character & { attributes: Attribute[] };

interface IAppContext {
  character: CharacterDetails | undefined;
  setCharacter: (character: CharacterDetails) => void;
  focusedAttributes: Attribute[];
  toggleAttributeFocus: (attribute: Attribute) => void;
}

const AppContext = createContext({} as IAppContext);

export function AppWrapper({ children }) {
  const [character, setCharacter] = useState<CharacterDetails | undefined>(
    undefined
  );
  const [focusedAttributes, setFocusedAttributes] = useState<Attribute[]>([]);
  const toggleAttributeFocus = (attribute: Attribute) => {
    if (focusedAttributes.find((i) => i.id === attribute.id)) {
      setFocusedAttributes(
        focusedAttributes.filter((i) => i.id !== attribute.id)
      );
      return;
    }
    setFocusedAttributes([...focusedAttributes, attribute]);
  };
  return (
    <AppContext.Provider
      value={{
        character,
        setCharacter,
        focusedAttributes,
        toggleAttributeFocus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
