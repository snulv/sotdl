import { GetStaticProps } from "next";
import Link from "next/link";
import { Character, PrismaClient } from "@prisma/client";
import React from "react";
import Layout from "../components/layout";

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
  return (
    <Layout>
      {characters.map((character) => (
        <li>
          <Link href={`/character/${character.id}`}>{character.name}</Link>
        </li>
      ))}
    </Layout>
  );
}
