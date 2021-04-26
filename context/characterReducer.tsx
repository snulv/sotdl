import { Character, Attribute } from "@prisma/client";
import deepEqual from "deep-equal";
import { CharacterDetails } from "./state";

export interface ICharacterState {
  characters: {
    [id: number]: Character;
  };
  attributes: {
    [id: number]: Attribute;
  };
  focusedAttributes: number[];
}

export const initialCharacterState: ICharacterState = {
  characters: {},
  attributes: {},
  focusedAttributes: [],
};

export const characterListReceivedAction = (characters: Character[]) =>
  ({
    type: "CHARACTER_LIST_RECEIVED",
    payload: {
      characters,
    },
  } as const);

export const characterDetailsReceivedAction = (character: CharacterDetails) =>
  ({
    type: "CHARACTER_DETAILS_RECEIVED",
    payload: {
      character,
    },
  } as const);

export const characterCreatedAction = (character: Character) =>
  ({
    type: "NEW_CHARACTER_CREATED",
    payload: {
      character,
    },
  } as const);

export const attributeCreatedAction = (attribute: Attribute) =>
  ({
    type: "NEW_ATTRIBUTE_CREATED",
    payload: {
      attribute,
    },
  } as const);

export const toggleAttributeFocusAction = (attributeId: number) =>
  ({
    type: "TOGGLE_ATTRIBUTE_FOCUS",
    payload: {
      attributeId,
    },
  } as const);

export type CHARACTER_ACTION_TYPES =
  | ReturnType<typeof characterListReceivedAction>
  | ReturnType<typeof characterDetailsReceivedAction>
  | ReturnType<typeof characterCreatedAction>
  | ReturnType<typeof attributeCreatedAction>
  | ReturnType<typeof toggleAttributeFocusAction>;

export const characterReducer = (
  state: ICharacterState,
  action: CHARACTER_ACTION_TYPES
) => {
  switch (action.type) {
    case "CHARACTER_LIST_RECEIVED": {
      const characters = action.payload.characters;

      return characters.reduce<ICharacterState>(
        (accumulatedState, character): ICharacterState => {
          if (
            !accumulatedState.characters[character.id] ||
            accumulatedState.characters[character.id].updatedAt !==
              character.updatedAt
          ) {
            return {
              ...accumulatedState,
              characters: {
                ...accumulatedState.characters,
                [character.id]: character,
              },
            };
          }
          return accumulatedState;
        },
        state
      );
    }
    case "CHARACTER_DETAILS_RECEIVED": {
      const { attributes, ...normalizedCharacter } = action.payload.character;
      const stateWithCharacter =
        !state.characters[normalizedCharacter.id] ||
        state.characters[normalizedCharacter.id].updatedAt !==
          normalizedCharacter.updatedAt
          ? {
              ...state,
              characters: {
                ...state.characters,
                [normalizedCharacter.id]: normalizedCharacter,
              },
            }
          : state;
      if (!attributes) {
        return stateWithCharacter;
      }
      return attributes.reduce<ICharacterState>(
        (accumulatedState, attribute): ICharacterState => {
          if (
            !accumulatedState.attributes[attribute.id] ||
            accumulatedState.attributes[attribute.id].updatedAt !==
              attribute.updatedAt
          ) {
            return {
              ...accumulatedState,
              attributes: {
                ...accumulatedState.attributes,
                [attribute.id]: attribute,
              },
            };
          }
          return accumulatedState;
        },
        stateWithCharacter
      );
    }
    case "NEW_CHARACTER_CREATED": {
      return {
        ...state,
        characters: {
          ...state.characters,
          [action.payload.character.id]: action.payload.character,
        },
      };
    }
    case "NEW_ATTRIBUTE_CREATED": {
      return {
        ...state,
        attributes: {
          ...state.attributes,
          [action.payload.attribute.id]: action.payload.attribute,
        },
      };
    }
    case "TOGGLE_ATTRIBUTE_FOCUS": {
      const { attributeId } = action.payload;
      if (state.focusedAttributes.find((i) => i === attributeId)) {
        return {
          ...state,
          focusedAttributes: state.focusedAttributes.filter(
            (i) => i !== attributeId
          ),
        };
      }
      return {
        ...state,
        focusedAttributes: [...state.focusedAttributes, attributeId],
      };
    }
    default:
      throw new Error("what's going on?");
  }
};
