import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import React from "react";
import Layout from "../../components/layout";
import AttributeField from "../../components/character/attributeField";
import BaseInfoField from "../../components/character/baseInfoField";
import CoreAttributeList from "../../components/character/coreAttributeList";
import { CharacterDetails, useAppContext } from "../../utility/state";
import AttributeDetails from "../../components/character/attributeDetails";
import useCharacterDetailsState from "../../utility/useCharacterDetailsState";
import { useInterval } from "react-use";
import { characterDetailsReceivedAction } from "../../utility/characterReducer";
import CharacterTabs from "../../components/character/characterTabs";
import WeaponList from "../../components/character/weaponList";

const prisma = new PrismaClient();

export const getServerSideProps: GetStaticProps = async (context) => {
  const { pid } = context.params;

  const character = await prisma.character.findFirst({
    where: {
      id: Number(pid),
    },
    include: {
      attributes: {
        include: {
          subAttributes: true,
        },
      },
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
  }, 50000);

  if (!character) {
    return <Layout>Character not found</Layout>;
  }

  return (
    <Layout>
      <CharacterTabs characterId={characterId} />
      <div className="flex flex-grow">
        <div className="flex-grow flex flex-col p-4">
          <div className="grid gap-4 grid-cols-2">
            <div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                <BaseInfoField character={character} field="name" />
                <BaseInfoField character={character} field="level" />
                <BaseInfoField character={character} field="ancestry" />
                <BaseInfoField character={character} field="novice_path" />
                <BaseInfoField character={character} field="expert_path" />
                <BaseInfoField character={character} field="master_path" />
              </div>
            </div>
            <div>
              <WeaponList
                characterId={characterId}
                attributes={attributes.filter(
                  (attr) => attr.type === "Weapons"
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 mt-4">
            <div>
              <div className="max-w-xs max-h-80 grid gap-4 grid-flow-col grid-rows-4">
                {attributes
                  .filter((attr) => attr.type === "Base")
                  .map((attr) => (
                    <AttributeField key={attr.id} attribute={attr} />
                  ))}
              </div>
            </div>
            <div className="grid gap-4 grid-flow-col grid-rows-3">
              <CoreAttributeList
                characterId={characterId}
                type="Novice_path"
                attributes={attributes.filter(
                  (attr) => attr.type === "Novice_path"
                )}
              />
              <CoreAttributeList
                characterId={characterId}
                type="Expert_path"
                attributes={attributes.filter(
                  (attr) => attr.type === "Expert_path"
                )}
              />
              <CoreAttributeList
                characterId={characterId}
                type="Master_path"
                attributes={attributes.filter(
                  (attr) => attr.type === "Master_path"
                )}
              />
              <CoreAttributeList
                characterId={characterId}
                type="Ancestry"
                attributes={attributes.filter(
                  (attr) => attr.type === "Ancestry"
                )}
              />
              <CoreAttributeList
                characterId={characterId}
                type="Professions"
                attributes={attributes.filter(
                  (attr) => attr.type === "Professions"
                )}
              />
              <CoreAttributeList
                characterId={characterId}
                type="Languages"
                attributes={attributes.filter(
                  (attr) => attr.type === "Languages"
                )}
              />
            </div>
          </div>
        </div>
        <div className="w-80 border-l border-gray-900">
          <AttributeDetails attributes={focusedAttributes} />
        </div>
      </div>
    </Layout>
  );
}
