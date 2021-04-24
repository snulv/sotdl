import React from "react";
import Input from "../../components/input";
import { CharacterDetails } from "../../pages/character/[pid]";

interface BaseInfoProps {
  character: CharacterDetails;
}

export default function BaseInfo({ character }: BaseInfoProps) {
  const sharedInputValues = {
    endpoint: "character",
    id: character.id,
  };

  return (
    <div>
      <div className="flex">
        <div className="pr-2">
          <Input
            defaultValue={character.name}
            field="name"
            {...sharedInputValues}
          />
        </div>
        <div className="pr-2">
          <Input
            defaultValue={character.level}
            field="level"
            {...sharedInputValues}
          />
        </div>
        <div className="pr-2">
          <Input
            defaultValue={character.ancestry}
            field="ancestry"
            {...sharedInputValues}
          />
        </div>
      </div>
      <div className="flex pt-2">
        <div className="pr-2">
          <Input
            defaultValue={character.novice_path}
            field="novice_path"
            {...sharedInputValues}
          />
        </div>
        <div className="pr-2">
          <Input
            defaultValue={character.expert_path}
            field="expert_path"
            {...sharedInputValues}
          />
        </div>
        <div className="pr-2">
          <Input
            defaultValue={character.master_path}
            field="master_path"
            {...sharedInputValues}
          />
        </div>
      </div>
    </div>
  );
}
