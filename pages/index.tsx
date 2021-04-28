import { GetStaticProps } from "next";
import Link from "next/link";
import { Character, PrismaClient } from "@prisma/client";
import React, { useEffect, useMemo } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useAppContext } from "../utility/state";
import {
  characterCreatedAction,
  characterListReceivedAction,
} from "../utility/characterReducer";

const prisma = new PrismaClient();

export const getServerSideProps: GetStaticProps = async () => {
  const characters = await prisma.character.findMany();

  return {
    props: {
      characters,
    },
  };
};

interface HomeProps {
  characters: Character[];
}

export default function Home({ characters }: HomeProps) {
  const { characterState, dispatch } = useAppContext();

  useEffect(() => {
    dispatch(characterListReceivedAction(characters));
  }, []);
  const reducedCharacters = useMemo(
    () => Object.values(characterState.characters),
    [characterState.characters]
  );
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
  return (
    <Layout>
      <div className="flex-grow flex justify-center items-center">
        <div>
          <button
            onClick={createNew}
            className="border-b border-gray-200 hover:bg-gray-200"
          >
            Add new character
          </button>
          <ul className="flex flex-col divide-y divide-gray-200">
            {reducedCharacters.map((character) => (
              <li key={character.id}>
                <Link href={`/character/${character.id}`}>
                  <span className="hover:bg-gray-200 block cursor-pointer">
                    {character.name || "Unnamed"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
