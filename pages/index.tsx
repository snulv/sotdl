import { GetStaticProps } from "next";
import Link from "next/link";
import { Character, PrismaClient } from "@prisma/client";
import React from "react";
import Layout from "../components/layout";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const createNew = () => {
    fetch(`/api/character`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((data) => data.json())
      .then((data) => {
        console.debug(data);
        router.push(`/character/${data.id}`);
      });
  };
  return (
    <Layout>
      <button onClick={createNew}>Add new character</button>
      {characters.map((character) => (
        <li>
          <Link href={`/character/${character.id}`}>
            {character.name || "Unnamed"}
          </Link>
        </li>
      ))}
    </Layout>
  );
}
