import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import React from "react";
import Layout from "../../components/layout";
import AttributeField from "../../components/character/attributeField";
import BaseInfoField from "../../components/character/baseInfoField";
import AttributeList from "../../components/character/attributeList";
import { CharacterDetails, useAppContext } from "../../context/state";
import AttributeDetails from "../../components/character/attributeDetails";
import useCharacterDetailsState from "../../context/useCharacterDetailsState";
import { useInterval } from "react-use";
import { characterDetailsReceivedAction } from "../../context/characterReducer";
import CharacterTabs from "../../components/character/characterTabs";

const prisma = new PrismaClient();

export const getServerSideProps: GetStaticProps = async (context) => {
  const { pid } = context.params;

  const character = await prisma.character.findFirst({
    where: {
      id: Number(pid),
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

export default function Home({ character: defaultCharacter }: HomeProps) {
  const characterId = defaultCharacter.id;
  const { dispatch } = useAppContext();
  const { character, attributes, focusedAttributes } = useCharacterDetailsState(
    defaultCharacter
  );
  useInterval(() => {
    fetch(`/api/character/${characterId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((character) => {
        dispatch(characterDetailsReceivedAction(character));
      });
  }, 5000);

  if (!character) {
    return <Layout>Character not found</Layout>;
  }

  return (
    <Layout>
      <CharacterTabs characterId={characterId} />
      <div className="flex">
        <div className="flex-grow grid gap-4 grid-cols-1 sm:grid-cols-2 p-3">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <BaseInfoField character={character} field="name" />
            <BaseInfoField character={character} field="level" />
            <BaseInfoField character={character} field="ancestry" />
            <BaseInfoField character={character} field="novice_path" />
            <BaseInfoField character={character} field="expert_path" />
            <BaseInfoField character={character} field="master_path" />
          </div>
          <div>{character.name}</div>
          <div>
            <div className="max-w-xs max-h-80 grid gap-4 grid-flow-col grid-rows-4">
              {attributes
                .filter((attr) => attr.type === "Base")
                .map((attr) => (
                  <AttributeField key={attr.id} attribute={attr} />
                ))}
            </div>
          </div>

          <div className="grid gap-4 grid-flow-col grid-rows-4">
            <AttributeList
              characterId={characterId}
              type="Ancestry"
              attributes={attributes.filter((attr) => attr.type === "Ancestry")}
            />
            <AttributeList
              characterId={characterId}
              type="Novice_path"
              attributes={attributes.filter(
                (attr) => attr.type === "Novice_path"
              )}
            />
            <AttributeList
              characterId={characterId}
              type="Expert_path"
              attributes={attributes.filter(
                (attr) => attr.type === "Expert_path"
              )}
            />
            <AttributeList
              characterId={characterId}
              type="Master_path"
              attributes={attributes.filter(
                (attr) => attr.type === "Master_path"
              )}
            />
            <AttributeList
              characterId={characterId}
              type="Professions"
              attributes={attributes.filter(
                (attr) => attr.type === "Professions"
              )}
            />
            <AttributeList
              characterId={characterId}
              type="Languages"
              attributes={attributes.filter(
                (attr) => attr.type === "Languages"
              )}
            />
          </div>
        </div>
        <div className="w-80 border-l border-gray-900">
          <AttributeDetails attributes={focusedAttributes} />
        </div>
      </div>
    </Layout>
  );
}
