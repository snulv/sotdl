import { Attribute } from "@prisma/client";
import React from "react";
import Input from "../input";

interface AttributeDetailsProps {
  attributes: Attribute[];
  characterId: number;
}

export default function AttributeDetails({
  attributes,
  characterId,
}: AttributeDetailsProps) {
  return (
    <div className="flex flex-col border-gray-900 rounded-sm border-2">
      <div className="divide-y divide-gray-300 divide-solid flex flex-col">
        {attributes.map((attribute) => (
          <button
            key={attribute.id}
            className="hover:bg-gray-300 text-left px-2"
          >
            <div className="flex flex-col">
              <Input
                endpoint="attribute"
                id={attribute.id}
                field="name"
                defaultValue={attribute.name}
                className="border-gray-500 border-2 rounded-sm text-center"
              />
              <label htmlFor="name" className="capitalize text-xs">
                Name {attribute.name}
              </label>
              <Input
                endpoint="attribute"
                id={attribute.id}
                field="description"
                defaultValue={attribute.description}
                className="border-gray-500 border-2 rounded-sm text-center"
              />
              <label htmlFor="description" className="capitalize text-xs">
                Description
              </label>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
