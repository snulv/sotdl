import React, { useEffect, useState } from "react";
import { SubAttribute } from "@prisma/client";
import { AttributeDetails, useAppContext } from "../../utility/state";
import { attributeCreatedAction } from "../../utility/characterReducer";

interface MultiplierProps {
  characterId: number;
  subAttribute: SubAttribute;
  onChange: (newRegen: number) => void;
}

function Multiplier({ characterId, subAttribute, onChange }: MultiplierProps) {
  const { characterState } = useAppContext();
  const [value, setValue] = useState(subAttribute.value);
  useEffect(() => {
    setValue(subAttribute.value);
  }, [subAttribute.value]);
  const [healthAttribute, setHealthAttribute] = useState<
    AttributeDetails | undefined
  >(undefined);

  useEffect(() => {
    if (
      healthAttribute &&
      healthAttribute.characterId === characterId &&
      !!characterState.attributes[healthAttribute.id]
    ) {
      setHealthAttribute(characterState.attributes[healthAttribute.id]);
      return;
    }
    setHealthAttribute(
      Object.values(characterState.attributes).find(
        (item) => item.characterId === characterId && item.name === "Health"
      )
    );
  }, [characterState.attributes, characterId]);
  const handleBlur = () => {
    onChange(value > 0 ? value : 1);
  };
  const handleChange = (e) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="flex flex-col">
      {!!healthAttribute && (
        <div className="w-5 h-5 -ml-px border-gray-500 border-t-2 border-l-2 border-r-2 rounded-sm text-center text-xs">
          {healthAttribute.value > 0 && subAttribute.value > 0
            ? Math.round(healthAttribute.value / subAttribute.value)
            : "-"}
        </div>
      )}
      <input
        name="regen"
        className="w-5 h-5 -ml-px border-gray-500 bg-gray-100 border-2 rounded-sm text-center text-xs"
        value={value + ""}
        onChange={handleChange}
        onBlur={handleBlur}
        type="number"
      />
    </div>
  );
}

interface AttributeFieldProps {
  attribute: AttributeDetails;
}

export default function AttributeField({ attribute }: AttributeFieldProps) {
  const { dispatch } = useAppContext();
  const [value, setValue] = useState(attribute.value);
  const modifier = attribute.subAttributes.find(
    (item) => item.type === "Modifier"
  );
  const regen = attribute.subAttributes.find(
    (item) => item.type === "Multiplier"
  );
  useEffect(() => {
    setValue(attribute.value);
  }, [attribute.value]);
  const save = (newRegen?: number) => {
    fetch(`/api/attribute/${attribute.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
        subAttributes: attribute.subAttributes.map((subAttr) => {
          if (subAttr.type === "Modifier") {
            return {
              ...subAttr,
              value: value - 10,
            };
          }
          if (subAttr.type === "Multiplier" && newRegen) {
            return {
              ...subAttr,
              value: newRegen,
            };
          }
          return subAttr;
        }),
      }),
    })
      .then((response) => response.json())
      .then((attribute: AttributeDetails) => {
        dispatch(attributeCreatedAction(attribute));
      });
  };
  const onBlur = () => {
    save();
  };
  const onChange = (e) => {
    setValue(Number(e.target.value));
  };

  const onRegenChanged = (newRegen: number) => {
    save(newRegen);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-end">
        <input
          name={attribute.name}
          className="w-10 h-10 border-gray-500 bg-gray-100 border-2 rounded-sm text-center"
          value={value + ""}
          onChange={onChange}
          onBlur={onBlur}
          type="number"
        />
        {!!regen && (
          <Multiplier
            characterId={attribute.characterId}
            subAttribute={regen}
            onChange={onRegenChanged}
          />
        )}
        {!!modifier && (
          <div className="w-7 h-7 -ml-px border-gray-500 border-t-2 border-r-2 border-b-2 rounded-sm text-center">
            {modifier.value > 1 ? `+${modifier.value}` : modifier.value}
          </div>
        )}
      </div>

      <label htmlFor={attribute.name} className="capitalize text-xs">
        {attribute.name}
      </label>
    </div>
  );
}
