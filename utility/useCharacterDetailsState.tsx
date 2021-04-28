import { CharacterDetails, useAppContext } from "./state";
import { useEffect, useMemo } from "react";
import { characterDetailsReceivedAction } from "./characterReducer";

function useCharacterDetailsState(character: CharacterDetails | undefined) {
  const characterId = character.id;
  const { characterState, dispatch } = useAppContext();

  useEffect(() => {
    if (character) {
      dispatch(characterDetailsReceivedAction(character));
    }
  }, [character]);

  const reducedCharacter = useMemo(() => {
    if (!characterState.characters[characterId] && character) {
      const { attributes, ...normalizedCharacter } = character;
      return normalizedCharacter;
    }

    if (!characterState.characters[characterId]) {
      return undefined;
    }

    return characterState.characters[characterId];
  }, [characterState.characters, characterId]);

  const reducedAttributes = useMemo(() => {
    return Object.values(characterState.attributes).reduce(
      (accumulator, attribute) => {
        if (attribute.characterId === characterId) {
          return [...accumulator, attribute];
        }
        return accumulator;
      },
      []
    );
  }, [characterState.attributes, characterId]);

  const reducedFocusedAttributes = useMemo(() => {
    return characterState.focusedAttributes.reduce(
      (accumulator, attributeId) => {
        if (
          !characterState.attributes[attributeId] ||
          characterState.attributes[attributeId].characterId !== characterId
        ) {
          return accumulator;
        }
        return [...accumulator, characterState.attributes[attributeId]];
      },
      []
    );
  }, [
    characterState.attributes,
    characterId,
    characterState.focusedAttributes,
  ]);

  return {
    character: reducedCharacter,
    attributes: reducedAttributes,
    focusedAttributes: reducedFocusedAttributes,
  };
}

export default useCharacterDetailsState;
