// src/context/state.js
import { Character, Attribute, SubAttribute } from "@prisma/client";
import { createContext, useContext, useReducer, useState } from "react";
import {
  CHARACTER_ACTION_TYPES,
  characterReducer,
  ICharacterState,
  initialCharacterState,
} from "./characterReducer";

export type AttributeDetails = Attribute & { subAttributes: SubAttribute[] };
export type CharacterDetails = Character & {
  attributes: AttributeDetails[];
};

interface IAppContext {
  characterState: ICharacterState;
  dispatch: (action: CHARACTER_ACTION_TYPES) => void;
}

const AppContext = createContext({} as IAppContext);

export function AppWrapper({ children }) {
  const [characterState, dispatch] = useReducer(
    characterReducer,
    initialCharacterState
  );
  return (
    <AppContext.Provider
      value={{
        characterState,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
