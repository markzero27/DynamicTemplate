import React, { useState } from "react";

const TemplateField = ({ field, index, removeField, editField }) => {
  const [editing, setEditing] = useState(false);
  const [fieldName, setfieldName] = useState(field.name);
  const [fieldType, setfieldType] = useState(field.type);
  if (!editing) {
    return (
      <div className="d-flex flex-row mb-2 bg-custom-dark-blue">
        <div className="w-50 p-2">
          <div className="border border-light rounded text-light px-2 pb-2">
            {field.name}
          </div>
        </div>
        <div className="w-50 p-2 d-flex flex-row">
          <div className="w-75 border border-light rounded text-light px-2">
            {field.type}
          </div>

          <div className="w-25 d-flex flex-row ml-3">
            <button
              onClick={() => setEditing(true)}
              className="w-50 btn btn-sm btn-transparent border border-light text-light"
            >
              <i className="far fa-fw fa-edit" />
            </button>
            <button
              onClick={() => removeField(index)}
              className="w-50 btn btn-sm btn-transparent border border-light text-light"
            >
              <i className="fa fa-fw fa-trash" />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <form
        className="d-flex flex-row mb-2 bg-custom-dark-blue"
        onSubmit={e => {
          e.preventDefault();
          editField(index, fieldName, fieldType);
          setEditing(false);
        }}
      >
        <div className="w-50 p-2">
          <div className="border border-danger rounded">
            <input
              className="text-light bg-transparent form-control form-control-sm border border-0"
              type="text"
              placeholder="Field Name"
              aria-label="Field Name"
              value={fieldName}
              onChange={e => setfieldName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-50 p-2 d-flex flex-row">
          <div className="w-75 border border-danger rounded">
            <select
              className="text-light bg-transparent form-control form-control-sm border border-0"
              value={fieldType}
              onChange={e => setfieldType(e.target.value)}
            >
              <option value="text" className="bg-custom-dark-blue">
                text
              </option>
              <option value="number" className="bg-custom-dark-blue">
                number
              </option>
            </select>
          </div>

          <div className="w-25 ml-3">
            <button
              type="submit"
              className="w-100 btn btn-sm btn-transparent border border-danger text-light"
            >
              <i className="fa fa-fw fa-save" />
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default TemplateField;
