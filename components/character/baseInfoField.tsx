import { Character } from "@prisma/client";
import React from "react";
import Input from "../../components/input";
import CharacterInput from "./characterInput";

interface BaseInfoFieldProps {
  character: Character;
  field: keyof Omit<Character, "updatedAt">;
}

export default function BaseInfoField({
  character,
  field,
}: BaseInfoFieldProps) {
  const sharedInputValues = {
    id: character.id,
    className: "border-gray-500 border-b-2 rounded-sm mb-1",
  };

  return (
    <div className="flex flex-col">
      <CharacterInput
        defaultValue={character[field]}
        field={field}
        {...sharedInputValues}
      />
      <label htmlFor="name" className="capitalize text-xs">
        {field.replace("_", " ")}
      </label>
    </div>
  );
}
