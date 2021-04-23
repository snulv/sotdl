import * as React from "react";
import { useState } from "react";

interface IProps {
  defaultValue: string;
  field: string;
  endpoint: string;
  id: number;
}

function input({ defaultValue, field, endpoint, id }: IProps) {
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
    setValue(e.target.value);
  };

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
}

export default input;
