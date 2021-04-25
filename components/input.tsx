import * as React from "react";
import { useState } from "react";

interface IProps {
  defaultValue: string | number;
  field: string;
  endpoint: string;
  id: number;
  className?: string;
  int?: boolean;
  name?: string;
}

function input({
  defaultValue,
  field,
  endpoint,
  id,
  int,
  name,
  className,
}: IProps) {
  const [value, setValue] = useState(defaultValue);
  const onBlur = () => {
    fetch(`/api/${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [field]: value,
      }),
    });
  };
  const onChange = (e) => {
    setValue(!int ? e.target.value : Number(e.target.value));
  };

  return (
    <input
      name={!name ? field : name}
      className={className ? className : "border-gray-500 border-2 rounded-sm"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={!int ? "text" : "number"}
    />
  );
}

export default input;
