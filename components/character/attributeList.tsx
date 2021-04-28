import React, { ReactNode, useState } from "react";
import {
  CheckCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { AttributeDetails, useAppContext } from "../../utility/state";
import { attributeCreatedAction } from "../../utility/characterReducer";

interface AttributeListProps {
  children: ReactNode;
  characterId: number;
  type: string;
}

export default function AttributeList({
  children,
  type,
  characterId,
}: AttributeListProps) {
  const { dispatch } = useAppContext();
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createNew = () => {
    if (!name) {
      return;
    }
    const newAttribute = {
      name,
      type,
      description: "",
      value: 0,
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
      .then((attribute: AttributeDetails) => {
        setName("");
        setIsCreating(false);

        dispatch(attributeCreatedAction(attribute));
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
  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      createNew();
    }
  };

  return (
    <div className="flex flex-col border-gray-900 rounded-sm border-2">
      <div className="flex bg-gray-900 text-gray-200 items-center p-2">
        {!isCreating ? (
          <>
            <span className="flex-grow capitalize text-xs">
              {type.replace("_", " ")}
            </span>
            <button onClick={startCreating} className="w-4 ml-2 text-green-600">
              <PlusCircleIcon />
            </button>
          </>
        ) : (
          <>
            <input
              className="flex-grow text-black text-xs"
              type="text"
              autoFocus
              value={name}
              onChange={updateName}
              onKeyDown={handleKeyPress}
            />
            <button onClick={createNew} className="w-4 ml-2 text-green-600">
              <CheckCircleIcon />
            </button>
            <button onClick={stopCreating} className="w-4 ml-2 text-red-600">
              <XCircleIcon />
            </button>
          </>
        )}
      </div>
      <div className="divide-y divide-gray-300 divide-solid flex flex-col">
        {children}
      </div>
    </div>
  );
}
