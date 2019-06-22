import React, { useState } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import TemplateLists from "./TemplatesLists";
import Templates from "../api/templates";
import AddTemplateModal from "./AddTemplateModal";

const ManageTemplates = ({ templates }) => {
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState("");

  style = {
    height: "70px"
  };

  return (
    <div className="mt-2 mx-auto bg-custom-paper pb-3 main border border-dark ">
      <div className="bg-custom-dim-gold  py-2 container-fluid">
        <Link to="/" className="btn btn-transparent">
          <i className="fa fa-arrow-left text-light" />
        </Link>
      </div>
      <div className="bg-custom-paper container-fluid py-2 text-dark">
        <strong>Manage Record Templates</strong>
      </div>
      <div className="bg-custom-dim-gold container-fluid py-2 clearfix mb-3 ">
        <form className="form-inline border border-light rounded w-25 px-2 float-left">
          <i
            className="fas fa-search text-light small pr-2"
            aria-hidden="true"
          />
          <input
            className="text-light bg-transparent form-control form-control-sm border border-0 ml-1 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <button
          type="button"
          data-toggle="modal"
          data-target="#addTemplateModal"
          className="btn btn-sm btn-primary bg-custom-pale-gold custom-radius border border-light float-right px-3 small"
        >
          Add Templates <i className="fa fa-plus ml-3" />
        </button>
        <AddTemplateModal setAlert={setAlert} setErrors={setErrors} />
      </div>
      <div className="container-fluid mb-2 overflow-custom list">
        {alert}
        {errors.length > 0 &&
          errors.map((error, index) => (
            <div key={index} className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle mr-2" />
              {error.msg}
            </div>
          ))}
        {templates && templates.length > 0 ? (
          templates.map((template, index) => (
            <TemplateLists
              key={template._id}
              id={template._id}
              template={template}
              setAlert={setAlert}
              setErrors={setErrors}
              index={index}
            />
          ))
        ) : (
          <div className=" w-100 bg-custom-pale-gold p-2 clearfix text-center text-dark">
            No Template
          </div>
        )}
      </div>
    </div>
  );
};

export default withTracker(() => {
  return {
    templates: Templates.find({}).fetch()
  };
})(ManageTemplates);
