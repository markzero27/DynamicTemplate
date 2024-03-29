import React, { useState } from "react";
import Templates from "../api/templates";
import EditTemplateModal from "./EditTemplateModal";
import DeleteRecordModal from "./DeleteModal";

const TemplateLists = ({ id, template, setAlert, setErrors, index }) => {
  const [viewFields, setviewFields] = useState(false);
  const [caret, setcaret] = useState("right");

  return (
    <React.Fragment>
      <div className="d-flex flex-row mb-2">
        <div>
          <DeleteRecordModal
            set="templates"
            id={template._id}
            setAlert={setAlert}
          />
        </div>

        <div>
          <EditTemplateModal
            template={template}
            setErrors={setErrors}
            setAlert={setAlert}
            index={index}
          />
        </div>
        <div className=" w-100 bg-custom-pale-gold p-2 clearfix">
          <button
            onClick={() => {
              setviewFields(!viewFields);
              caret === "right" ? setcaret("down") : setcaret("right");
            }}
            className="text-left text-dark bg-custom-pale-gold border-0 w-100 d-block w-50 px-2"
          >
            <span className="text-secondary mr-4">Template Name</span>
            {template.name}
            <i className={`fas fa-caret-${caret} float-right mt-1`} />
          </button>
        </div>
      </div>
      {viewFields && (
        <div className="d-flex flex-row mb-2">
          <div className="box mr-2 bg-custom-paper" />
          <div className="box mr-3 bg-custom-paper" />
          <div className=" w-100 bg-custom-pale-gold rounded clearfix">
            {template.fields.map((field, index) => (
              <div className="d-flex flex-row" key={index}>
                <div className="rounded border border-light w-50 m-1 d-flex flex-row">
                  <label className="w-25 p-2 small text-secondary">
                    Field Name
                  </label>
                  <input
                    className="w-75 m-2 text-dark bg-custom-paper form-control form-control-sm border border-0"
                    readOnly
                    value={field.name}
                  />
                </div>
                <div className="rounded border border-light w-50 m-1 d-flex flex-row">
                  <label className="w-25 p-2 small text-secondary">Type</label>
                  <input
                    className="w-75 m-2 text-dark bg-custom-paper form-control form-control-sm border border-0"
                    readOnly
                    value={field.type}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TemplateLists;
