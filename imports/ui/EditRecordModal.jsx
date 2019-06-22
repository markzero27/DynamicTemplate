import React, { useState, useEffect } from "react";
import Records from "../api/records";
import RecordField from "./RecordField";

const EditRecordModal = ({ record, setErrors, setAlert }) => {
  const [fields, setfields] = useState(null);

  useEffect(() => {
    setfields(record.fields);
  }, [record]);

  const onUpdate = () => {
    Records.update(
      { _id: record._id },
      {
        templateid: record.templateid,
        template: record.templateName,
        fields,
        createdAt: record.createdAt
      }
    );
    setAlert(
      <div className="alert alert-success" role="alert">
        <i className="fa fa-fw fa-check" />
        Record updated successfully!
      </div>
    );
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };

  return (
    <div
      className="modal fade"
      id="editRecordModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="bg-custom-blue pb-3  ">
              <div className="bg-custom-slate-blue  py-2 container-fluid">
                <button
                  className="btn btn-sm btn-transparent text-light"
                  data-dismiss="modal"
                >
                  <i className="fa fa-times" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary bg-custom-light-blue custom-radius border border-light px-4 small float-right"
                  data-dismiss="modal"
                  onClick={() => onUpdate()}
                >
                  Update
                  <i className="fa fa-save ml-3" />
                </button>
              </div>

              <div className="container-fluid py-3 text-light ">
                <strong> {record.templateName}</strong>
              </div>
              <div className="bg-custom-slate-blue container-fluid py-1 clearfix mb-3">
                <div className="d-flex flex-row text-light mt-2 p-3" />
              </div>
              <div className="container-fluid mb-2">
                <form className="" id="fields">
                  {fields &&
                    fields.map((field, index) => (
                      <RecordField
                        key={index}
                        field={field}
                        fields={fields}
                        setfields={setfields}
                        index={index}
                      />
                    ))}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecordModal;
