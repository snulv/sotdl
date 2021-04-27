import { Attribute } from "@prisma/client";
import React from "react";
import { AttributeDetails, useAppContext } from "../../context/state";
import { toggleAttributeFocusAction } from "../../context/characterReducer";
import AttributeList from "./attributeList";

interface WeaponListProps {
  attributes: AttributeDetails[];
  characterId: number;
}

export default function WeaponList({
  attributes,
  characterId,
}: WeaponListProps) {
  const { dispatch } = useAppContext();
  const selectAttribute = (attribute: Attribute) => () =>
    dispatch(toggleAttributeFocusAction(attribute.id));

  return (
    <AttributeList characterId={characterId} type="Weapons">
      {attributes.map((attr) => (
        <button
          key={attr.id}
          className="hover:bg-gray-300 text-left px-2"
          onClick={selectAttribute(attr)}
        >
          {attr.name}
        </button>
      ))}
    </AttributeList>
  );
}
