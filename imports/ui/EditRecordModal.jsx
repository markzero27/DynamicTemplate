import React, { useState, useEffect } from "react";
import Records from "../api/records";
import RecordField from "./RecordField";

const EditRecordModal = ({ record, setAlert }) => {
  const [fields, setfields] = useState(null);

  useEffect(() => {
    setfields(record.fields);
  }, [record]);

  const onUpdate = () => {
    Records.update(
      { _id: record._id },
      {
        templateid: record.templateid,
        template: record.template,
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
    <React.Fragment>
      <button
        className="bg-custom-pale-gold border-0 text-center small text-light mr-2 box"
        data-toggle="modal"
        data-target={`#editRecordModal${record._id}`}
      >
        <i className="fas fa-edit" />
      </button>
      <div
        className="modal fade"
        id={`editRecordModal${record._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="bg-custom-paper pb-3  ">
                <div className="bg-custom-dim-gold  py-2 container-fluid">
                  <button
                    className="btn btn-sm btn-transparent text-light"
                    data-dismiss="modal"
                  >
                    <i className="fa fa-times" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary bg-custom-pale-gold custom-radius border border-light px-4 small float-right"
                    data-dismiss="modal"
                    onClick={() => onUpdate()}
                  >
                    Update
                    <i className="fa fa-save ml-3" />
                  </button>
                </div>

                <div className="container-fluid py-3 text-dark ">
                  <strong> {record.template}</strong>
                </div>
                <div className="bg-custom-dim-gold container-fluid py-1 clearfix mb-3">
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
    </React.Fragment>
  );
};

export default EditRecordModal;
