import * as React from "react";
import { useEffect, useState } from "react";

interface IProps {
  defaultValue: string | number;
  field: string;
  endpoint: string;
  id: number;
  className?: string;
  int?: boolean;
  area?: boolean;
  name?: string;
}

function input({
  defaultValue,
  field,
  endpoint,
  id,
  int,
  area,
  name,
  className,
}: IProps) {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
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

  if (area) {
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
      type={!int ? "text" : "number"}
    />
  );
}

export default input;
