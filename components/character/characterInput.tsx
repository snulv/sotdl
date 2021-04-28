import * as React from "react";
import { useEffect, useState } from "react";
import { CharacterDetails, useAppContext } from "../../utility/state";
import {
  characterUpdatedAction,
  characterValueUpdatedAction,
} from "../../utility/characterReducer";
import callApi from "../../utility/callApi";
import { Character } from "@prisma/client";

interface IProps {
  defaultValue: string | number;
  id: number;
  field: keyof Character;
  name?: string;
  className?: string;
  type?: "area" | "number" | "text";
}

function CharacterInput({
  id,
  defaultValue,
  field,
  name,
  className,
  type,
}: IProps) {
  const { dispatch } = useAppContext();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onBlur = async () => {
    const previousValue = defaultValue;
    dispatch(characterValueUpdatedAction(id, { [field]: value }));
    try {
      const character: CharacterDetails = await callApi(
        `/api/character/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            [field]: value,
          }),
        }
      );
      dispatch(characterUpdatedAction(character));
    } catch (e) {
      dispatch(characterValueUpdatedAction(id, { [field]: previousValue }));
    }
  };
  const onChange = (e) => {
    setValue(type !== "number" ? e.target.value : Number(e.target.value));
  };

  if (type === "area") {
    return (
      <textarea
        name={!name ? field : name}
        className={
          className ? className : "border-gray-500 border-2 rounded-sm"
        }
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }

  return (
    <input
      name={!name ? field : name}
      className={className ? className : "border-gray-500 border-2 rounded-sm"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type ? type : "text"}
    />
  );
}

export default CharacterInput;
