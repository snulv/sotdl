import { GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import AttributeField from "../../components/character/attributeField";
import BaseInfoField from "../../components/character/baseInfoField";
import AttributeList from "../../components/character/attributeList";
import { CharacterDetails, useAppContext } from "../../context/state";
import AttributeDetails from "../../components/character/attributeDetails";

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

export default function Home({ character: defaultCharacter }: HomeProps) {
  const { character, setCharacter, focusedAttributes } = useAppContext();
  useEffect(() => {
    setCharacter(defaultCharacter);
  }, []);
  if (!character) {
    return <Layout>Character not found</Layout>;
  }

  return (
    <Layout>
      <div className="p-3">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            <BaseInfoField character={character} field="name" />
            <BaseInfoField character={character} field="level" />
            <BaseInfoField character={character} field="ancestry" />
            <BaseInfoField character={character} field="novice_path" />
            <BaseInfoField character={character} field="expert_path" />
            <BaseInfoField character={character} field="master_path" />
          </div>
          <div>-</div>
          <div>-</div>
          <div>
            <div className="max-w-xs max-h-80 grid gap-4 grid-flow-col grid-rows-4">
              {character.attributes
                .filter((attr) => attr.type === "Base")
                .map((attr) => (
                  <AttributeField key={attr.id} attribute={attr} />
                ))}
            </div>
          </div>

          <div className="grid gap-4 grid-flow-col grid-rows-2">
            <AttributeList
              characterId={character.id}
              type="Ancestry"
              attributes={character.attributes.filter(
                (attr) => attr.type === "Ancestry"
              )}
            />
            <AttributeList
              characterId={character.id}
              type="Novice_path"
              attributes={character.attributes.filter(
                (attr) => attr.type === "Novice_path"
              )}
            />
            <AttributeList
              characterId={character.id}
              type="Expert_path"
              attributes={character.attributes.filter(
                (attr) => attr.type === "Expert_path"
              )}
            />
            <AttributeList
              characterId={character.id}
              type="Master_path"
              attributes={character.attributes.filter(
                (attr) => attr.type === "Master_path"
              )}
            />
          </div>
          <div>
            <AttributeDetails
              attributes={focusedAttributes}
              characterId={character.id}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
