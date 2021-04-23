import { GetStaticProps } from "next";
import { Character, PrismaClient } from "@prisma/client";
import React from "react";
import Layout from "../../components/layout";
import Input from "../../components/input";

const prisma = new PrismaClient();

export const getServerSideProps: GetStaticProps = async () => {
  const character = await prisma.character.findFirst({
    where: {
      id: 1,
    },
  });

  return {
    props: {
      character,
    },
  };
};

interface HomeProps {
  character: Character | undefined;
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
      <Input
        defaultValue={character.name}
        field="name"
        {...sharedInputValues}
      />

      <Input
        defaultValue={character.level}
        field="level"
        {...sharedInputValues}
      />

      <Input
        defaultValue={character.ancestry}
        field="ancestry"
        {...sharedInputValues}
      />

      <Input
        defaultValue={character.novice_path}
        field="novice_path"
        {...sharedInputValues}
      />

      <Input
        defaultValue={character.expert_path}
        field="expert_path"
        {...sharedInputValues}
      />

      <Input
        defaultValue={character.master_path}
        field="master_path"
        {...sharedInputValues}
      />
    </Layout>
  );
}
