import * as React from "react";
import { useEffect, useState } from "react";
import { AttributeDetails, useAppContext } from "../../utility/state";
import {
  attributeUpdatedAction,
  attributeValueUpdatedAction,
} from "../../utility/characterReducer";
import callApi from "../../utility/callApi";

interface IProps {
  defaultValue: string | number;
  id: number;
  field: keyof AttributeDetails;
  name?: string;
  className?: string;

  type?: "area" | "number" | "text";
}

function AttributeInput({
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
    dispatch(attributeValueUpdatedAction(id, { [field]: value }));
    try {
      const attribute: AttributeDetails = await callApi(
        `/api/attribute/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            [field]: value,
          }),
        }
      );
      dispatch(attributeUpdatedAction(attribute));
    } catch (e) {
      dispatch(attributeValueUpdatedAction(id, { [field]: previousValue }));
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

export default AttributeInput;
