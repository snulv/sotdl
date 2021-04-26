import { Attribute } from "@prisma/client";
import React from "react";
import Input from "../input";
import { useAppContext } from "../../context/state";
import { toggleAttributeFocusAction } from "../../context/characterReducer";
import { XCircleIcon } from "@heroicons/react/solid";

interface AttributeDetailsProps {
  attributes: Attribute[];
}

export default function AttributeDetails({
  attributes,
}: AttributeDetailsProps) {
  const { dispatch } = useAppContext();

  const handleCloseAttribute = (attributeId: number) => () => {
    dispatch(toggleAttributeFocusAction(attributeId));
  };
  return (
    <div className="flex flex-col">
      <div className="divide-y divide-gray-300 divide-solid flex flex-col">
        {attributes.map((attribute) => (
          <div key={attribute.id} className="text-left p-2 bg-gray-100">
            <div className="flex flex-col">
              <label htmlFor="name" className="capitalize text-xs">
                Name
              </label>
              <div className="flex items-center">
                <div className="w-6/6">
                  <Input
                    endpoint="attribute"
                    id={attribute.id}
                    field="name"
                    defaultValue={attribute.name}
                    className="border-gray-500 border rounded-sm px-1"
                  />
                </div>
                <div className="w-1/6 flex items-center">
                  <button
                    onClick={handleCloseAttribute(attribute.id)}
                    className="w-5 ml-2 text-red-600"
                  >
                    <XCircleIcon />
                  </button>
                </div>
              </div>

              <label htmlFor="description" className="capitalize text-xs">
                Description
              </label>
              <Input
                endpoint="attribute"
                id={attribute.id}
                field="description"
                defaultValue={attribute.description}
                area
                className="border-gray-500 leading-4 border rounded-sm p-1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
