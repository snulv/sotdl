import { Attribute } from "@prisma/client";
import React, { useState } from "react";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { useAppContext } from "../../context/state";

interface AttributeListProps {
  attributes: Attribute[];
  characterId: number;
  type: string;
}

export default function AttributeList({
  attributes,
  type,
  characterId,
}: AttributeListProps) {
  const { character, setCharacter, toggleAttributeFocus } = useAppContext();
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createNew = () => {
    const newAttribute = {
      name,
      type,
      description: "",
      value: 0,
      max: 0,
      current: 0,
      characterId,
    };
    fetch(`/api/attribute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttribute),
    })
      .then((data) => data.json())
      .then((data) => {
        setName("");
        setIsCreating(false);
        setCharacter({
          ...character,
          attributes: [
            ...character.attributes,
            { ...newAttribute, id: data.created },
          ],
        });
      });
  };
  const startCreating = () => {
    setIsCreating(true);
  };
  const stopCreating = () => {
    setIsCreating(false);
    setName("");
  };
  const updateName = (e) => {
    setName(e.target.value);
  };
  const selectAttribute = (attribute: Attribute) => () =>
    toggleAttributeFocus(attribute);

  return (
    <div className="flex flex-col border-gray-900 rounded-sm border-2">
      <div className="flex bg-gray-900 text-gray-200 items-center p-2">
        {!isCreating ? (
          <>
            <span className="flex-grow capitalize">
              {type.replace("_", " ")}
            </span>
            <button onClick={startCreating} className="w-5 ml-2 text-green-600">
              <PlusCircleIcon />
            </button>
          </>
        ) : (
          <>
            <input
              className="flex-grow text-black"
              type="text"
              autoFocus
              value={name}
              onChange={updateName}
            />
            <button onClick={createNew} className="w-5 ml-2 text-green-600">
              <CheckCircleIcon />
            </button>
            <button onClick={stopCreating} className="w-5 ml-2 text-red-600">
              <XCircleIcon />
            </button>
          </>
        )}
      </div>
      <div className="divide-y divide-gray-300 divide-solid flex flex-col">
        {attributes.map((attr) => (
          <button
            key={attr.id}
            className="hover:bg-gray-300 text-left px-2"
            onClick={selectAttribute(attr)}
          >
            {attr.name}
          </button>
        ))}
      </div>
    </div>
  );
}
