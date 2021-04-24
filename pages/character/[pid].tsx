import { GetStaticProps } from "next";
import { Attribute, Character, PrismaClient } from "@prisma/client";
import React from "react";
import Layout from "../../components/layout";
import Input from "../../components/input";
import BaseInfo from "../../components/character/baseInfo";

export type CharacterDetails = Character & { attributes: Attribute[] };

const prisma = new PrismaClient();

export const getServerSideProps: GetStaticProps = async () => {
  const character = await prisma.character.findFirst({
    where: {
      id: 1,
    },
    include: {
      attributes: true,
    },
  });

  return {
    props: {
      character,
    },
  };
};

interface HomeProps {
  character: CharacterDetails | undefined;
}

export default function Home({ character }: HomeProps) {
  if (!character) {
    return <Layout>Character not found</Layout>;
  }

  const sharedInputValues = {
    endpoint: "character",
    id: character.id,
  };

  return (
    <Layout>
      <BaseInfo character={character} />

      {character.attributes.map((attr) => (
        <Input
          endpoint="attribute"
          id={attr.id}
          field="value"
          defaultValue={attr.value}
          int
        />
      ))}
    </Layout>
  );
}
