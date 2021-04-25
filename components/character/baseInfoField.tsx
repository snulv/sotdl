import React from "react";
import Input from "../../components/input";
import { CharacterDetails } from "../../context/state";

interface BaseInfoFieldProps {
  character: CharacterDetails;
  field: keyof CharacterDetails;
}

export default function BaseInfoField({
  character,
  field,
}: BaseInfoFieldProps) {
  if (field === "attributes") {
    console.error("This attribute is not handled by [BaseInfoField]");
    return null;
  }
  const sharedInputValues = {
    endpoint: "character",
    id: character.id,
    className: "border-gray-500 border-b-2 rounded-sm mb-1",
  };

  return (
    <div className="flex flex-col">
      <Input
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
