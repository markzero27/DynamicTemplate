import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";

import RecordLists from "./RecordLists";
import Templates from "../api/templates";

const Main = ({ templates }) => {
  style = {
    height: "70px"
  };

  return (
    <div className="mt-2 mx-auto bg-custom-blue pb-3 main ">
      <div className="bg-custom-slate-blue  py-2 container-fluid">
        <form className="form-inline border border-light rounded w-25 px-2">
          <i
            className="fas fa-search text-light small pr-2"
            aria-hidden="true"
          />
          <input
            className="bg-transparent form-control form-control-sm border border-0 ml-1 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="bg-custom-blue container-fluid py-2 text-light">
        <strong>Record Templates</strong>
      </div>
      <div className="bg-custom-slate-blue container-fluid py-1 clearfix mb-3">
        <Link
          to="/manage-record-templates"
          className="btn btn-sm btn-primary bg-custom-light-blue custom-radius border border-light float-right px-3 small"
        >
          Manage Templates <i className="fa fa-cog ml-3" />
        </Link>
      </div>
      <div className="container-fluid mb-2 overflow-custom list">
        {templates && templates.length > 0 ? (
          templates.map((template, index) => (
            <RecordLists key={template._id} template={template} index={index} />
          ))
        ) : (
          <div className=" w-100 bg-custom-dark-blue p-2 clearfix text-center text-light">
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
})(Main);
