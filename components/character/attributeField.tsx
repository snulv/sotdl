import { Attribute, Character, PrismaClient } from "@prisma/client";
import React from "react";
import Input from "../input";

interface AttributeFieldProps {
  attribute: Attribute;
}

export default function AttributeField({ attribute }: AttributeFieldProps) {
  return (
    <div className="flex flex-col">
      <Input
        endpoint="attribute"
        id={attribute.id}
        field="value"
        defaultValue={attribute.value}
        int
        name={attribute.name}
        className="w-10 h-10 border-gray-500 border-2 rounded-sm text-center"
      />
      <label htmlFor={attribute.name} className="capitalize text-xs">
        {attribute.name}
      </label>
    </div>
  );
}
