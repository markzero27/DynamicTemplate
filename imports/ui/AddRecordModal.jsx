import React, { useState, useEffect } from "react";
import Records from "../api/records";

const AddRecordModal = ({ template, setErrors, setAlert }) => {
  const [templateName, settemplateName] = useState("");
  const [fields, setFields] = useState([]);
  useEffect(() => {
    if (template) {
      settemplateName(template.name);
      const newField = [];
      template.fields.forEach(field => {
        newField.push({
          name: field.name,
          value: "",
          type: field.type
        });
      });

      setFields(newField);
      localStorage.setItem("fields", JSON.stringify(newField));
      localStorage.setItem("emptyFields", JSON.stringify(newField));
    }
  }, [template]);

  const setFieldValue = (e, index) => {
    const newField = JSON.parse(localStorage.getItem("fields"));
    newField[index].value = e.target.value;
    setFields(newField);
    localStorage.setItem("fields", JSON.stringify(newField));
  };

  const saveRecord = () => {
    const fieldErr = [];
    const newFields = JSON.parse(localStorage.getItem("fields"));
    newFields.forEach(field => {
      if (field.value.trim() == "") {
        fieldErr.push({
          error: field.name,
          msg: `${field.name} is required!`
        });
      }
    });
    localStorage.setItem("fieldErrors", JSON.stringify(fieldErr));

    if (fieldErr.length > 0) {
      setErrors(fieldErr);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    } else {
      const newRecord = {
        templateid: template._id,
        template: template.name,
        fields: fields,
        createdAt: new Date()
      };
      Records.insert(newRecord);
      document.getElementById("fields").reset();
      const emptyFields = JSON.parse(localStorage.getItem("emptyFields"));
      localStorage.setItem("fields", JSON.stringify(emptyFields));
      setAlert(
        <div className="alert alert-success" role="alert">
          <i className="fa fa-fw fa-check" />
          Record added successfully!
        </div>
      );
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }
  };

  return (
    <div
      className="modal fade"
      id="addRecordModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="addModalLabel"
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
                  onClick={() => saveRecord()}
                >
                  Save
                  <i className="fa fa-save ml-3" />
                </button>
              </div>

              <div className="container-fluid py-2 text-dark ">
                <strong> {templateName}</strong>
              </div>
              <div className="bg-custom-dim-gold container-fluid py-1 clearfix mb-3">
                <div className="d-flex flex-row text-light mt-2 p-3" />
              </div>
              <div className="container-fluid mb-2">
                <form
                  className=""
                  id="fields"
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                >
                  {fields.map((field, index) => (
                    <div
                      className="d-flex flex-row bg-custom-pale-gold mb-1 px-3 py-2"
                      key={index}
                    >
                      <div className="text-light w-25 text-capitalize">
                        {field.name} :
                      </div>
                      <div className="ml-2 w-50 border border-light rounded">
                        <input
                          type={field.type}
                          onInput={e => {
                            localStorage.setItem(field.name, e.target.value);
                            setFieldValue(e, index);
                          }}
                          className="w-100 bg-custom-paper border border-0 pl-3 py-1 pr-1 text-dark rounded"
                        />
                      </div>
                    </div>
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

export default AddRecordModal;
