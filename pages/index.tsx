import { GetStaticProps } from "next";
import Link from "next/link";
import { Character, PrismaClient } from "@prisma/client";
import React, { useEffect, useMemo } from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useAppContext } from "../context/state";
import {
  characterCreatedAction,
  characterListReceivedAction,
} from "../context/characterReducer";

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
      <div className="flex justify-center items-center">
        <div>
          <button onClick={createNew}>Add new character</button>
          <ul className="flex flex-col">
            {reducedCharacters.map((character) => (
              <li key={character.id}>
                <Link href={`/character/${character.id}`}>
                  {character.name || "Unnamed"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
