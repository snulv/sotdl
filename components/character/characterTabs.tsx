import * as React from "react";
import { useMemo } from "react";
import { useAppContext } from "../../context/state";
import { characterListReceivedAction } from "../../context/characterReducer";
import Link from "next/link";
import { useInterval, useMount } from "react-use";

interface IProps {
  characterId: number;
}

function CharacterTabs({ characterId }: IProps) {
  const { characterState, dispatch } = useAppContext();

  const reducedCharacters = useMemo(
    () => Object.values(characterState.characters),
    [characterState.characters]
  );

  const fetchCharacters = () => {
    fetch(`/api/character`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((characters) => {
        console.debug(characters);
        dispatch(characterListReceivedAction(characters));
      });
  };

  useInterval(() => {
    fetchCharacters();
  }, 30000);
  useMount(() => {
    if (reducedCharacters.length < 2) {
      fetchCharacters();
    }
  });

  return (
    <ul className="flex mb-3">
      {reducedCharacters.map((character) => (
        <li key={character.id}>
          <Link href={`/character/${character.id}`}>
            <span
              className={`block py-2 px-4 border-b border-l border-gray-900 hover:bg-gray-100 cursor-pointer${
                characterId === character.id ? " bg-gray-300" : ""
              }`}
            >
              {character.name || "Unnamed"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CharacterTabs;
