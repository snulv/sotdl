import * as React from "react";
import { useMemo } from "react";
import { useAppContext } from "../../utility/state";
import {
  characterCreatedAction,
  characterListReceivedAction,
} from "../../utility/characterReducer";
import Link from "next/link";
import { useInterval, useMount } from "react-use";
import { useRouter } from "next/router";
import { Character } from "@prisma/client";
import { PlusCircleIcon } from "@heroicons/react/solid";

interface IProps {
  characterId: number;
}

function CharacterTabs({ characterId }: IProps) {
  const { characterState, dispatch } = useAppContext();
  const router = useRouter();

  const createNew = () => {
    fetch(`/api/character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((character: Character) => {
        dispatch(characterCreatedAction(character));
        router.push(`/character/${character.id}`);
      });
  };

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
    <ul className="flex border-b border-gray-900">
      {reducedCharacters.map((character) => (
        <li key={character.id}>
          <Link href={`/character/${character.id}`}>
            <span
              className={`block py-2 px-4 border-l border-gray-900 hover:bg-gray-100 cursor-pointer${
                characterId === character.id ? " bg-gray-300" : ""
              }`}
            >
              {character.name || "Unnamed"}
            </span>
          </Link>
        </li>
      ))}
      <li>
        <button
          onClick={createNew}
          className="block py-2 px-4 border-l border-gray-900 hover:bg-gray-100 cursor-pointer h-full"
        >
          <PlusCircleIcon className="w-4" />
        </button>
      </li>
    </ul>
  );
}

export default CharacterTabs;
