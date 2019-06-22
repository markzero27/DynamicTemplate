import React, { useState } from "react";
import TemplateField from "./TemplateField";
import Templates from "../api/templates";

const EditTemplateModal = ({ setErrors, setAlert, template,index }) => {
    const [templateName, settemplateName] = useState(template.name);
    const [fieldName, setFieldName] = useState("");
    const [fieldType, setFieldType] = useState("text");
    const [fields, setFields] = useState(template.fields);
    const errors = [];
    const isEmpty = string => {
        if (string.trim() === "") {
            return true;
        } else return false;
    };

    const addField = e => {
        e.preventDefault();
        if (!isEmpty(fieldName)) {
            setFields([...fields, { name: fieldName, type: fieldType }]);
            setFieldName("");
            setFieldType("text");
        }
    };

    const removeField = i => {
        const newField = fields.filter((value, index, field) => index != i);
        setFields(newField);
    };

    const editField = (index, name, type) => {
        newFields = fields;
        newFields[index].name = name;
        newFields[index].type = type;

        setFields(newFields);
    };

    const saveTemplate = () => {
        setErrors([]);
        if (isEmpty(templateName))
            errors.push({ msg: "Please enter template name!" });

        if (fields.length < 1)
            errors.push({ msg: "Please add atleast one field!" });

        if (errors.length < 1) {
            Templates.update({ _id: template._id }, { name: templateName, fields });
            
            setAlert(
                <div className="alert alert-success" role="alert">
                    <i className="fa fa-fw fa-check" />
                    Template updated successfully!
        </div>
            );
            setTimeout(() => {
                setAlert("");
            }, 5000);
        } else {
            setErrors(errors);
            setTimeout(() => {
                setErrors([]);
            }, 5000);
        }
    };

    return (
        <React.Fragment>
            <button
                type="button"
                data-toggle="modal"
                data-target={`#editTemplateModal${index}`}
                className="bg-custom-dark-blue border-0 text-center small text-light mr-2 box"
            >
                <i className="far fa-edit" />
            </button>
            <div
                className="modal fade"
                id={`editTemplateModal${index}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="addModalLabel"
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
                                        <i className="fa fa-arrow-left" />
                                    </button>
                                    <button
                                        onClick={saveTemplate}
                                        type="button"
                                        className="btn btn-sm btn-primary bg-custom-light-blue custom-radius border border-light px-4 small float-right"
                                        data-dismiss="modal"
                                    >
                                        Save
                  <i className="fa fa-save ml-3" />
                                    </button>
                                </div>

                                <div className="container-fluid py-2 text-light">
                                    <form
                                        className="d-flex flex-row bg-custom-dark-blue"
                                        onSubmit={e => e.preventDefault()}
                                    >
                                        <div className="w-50 p-2">
                                            <div className="">
                                                <input
                                                    className="text-light bg-transparent form-control form-control-sm border border-0"
                                                    type="text"
                                                    placeholder="Template Name"
                                                    aria-label="Template Name"
                                                    value={templateName}
                                                    onChange={e => settemplateName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="bg-custom-slate-blue container-fluid py-1 clearfix mb-3">
                                    <div className="d-flex flex-row text-light mt-2">
                                        <div className="w-50">
                                            <label htmlFor="" className="small ml-3">
                                                Field Name
                    </label>
                                        </div>
                                        <div className="w-50">
                                            <label htmlFor="" className="small ml-3">
                                                Type
                    </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-fluid mb-2">
                                    {fields.map((field, index) => (
                                        <TemplateField
                                            key={index}
                                            index={index}
                                            field={field}
                                            removeField={removeField}
                                            editField={editField}
                                        />
                                    ))}
                                    <hr />
                                    <form
                                        className="d-flex flex-row mb-2 bg-custom-dark-blue"
                                        onSubmit={addField}
                                    >
                                        <div className="w-50 p-2">
                                            <div className="border border-primary rounded">
                                                <input
                                                    className="text-light bg-transparent form-control form-control-sm border border-0"
                                                    type="text"
                                                    placeholder="Field Name"
                                                    aria-label="Field Name"
                                                    value={fieldName}
                                                    onChange={e => setFieldName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-50 p-2 d-flex flex-row">
                                            <div className="w-75 border border-primary rounded">
                                                <select
                                                    className="text-light bg-transparent form-control form-control-sm border border-0"
                                                    value={fieldType}
                                                    onChange={e => setFieldType(e.target.value)}
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
                                                    className="w-100 btn btn-sm btn-transparent border border-light text-light"
                                                >
                                                    <i className="fa fa-fw fa-plus" />
                                                </button>
                                            </div>
                                        </div>
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

export default EditTemplateModal;
