import React, { useState, useEffect } from "react";

const RecordField = ({ fields, field, setfields, index }) => {
  const [fieldValue, setfieldValue] = useState("");
  const [fieldName, setfieldName] = useState("");
  const [fieldType, setfieldType] = useState("");

  useEffect(() => {
    setfieldValue(field.value);
    setfieldName(field.name);
    setfieldType(field.type);
  }, [field]);

  const onchange = (value, index) => {
    const newFields = fields;
    newFields[index].value = value;
    setfields(newFields);
    setfieldValue(value);
  };

  return (
    <div className="d-flex flex-row bg-custom-pale-gold mb-1 px-3 py-2">
      <div className="text-light w-25 text-capitalize">{fieldName} :</div>
      <div className="ml-2 w-50 rounded">
        <input
          type={fieldType}
          value={fieldValue}
          onChange={e => {
            onchange(e.target.value, index);
          }}
          className="w-100 bg-custom-paper border border-0 pl-3 py-1 pr-1 text-dark rounded"
        />
      </div>
    </div>
  );
};

export default RecordField;
