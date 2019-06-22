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
    <div className="mt-2 mx-auto bg-custom-paper pb-3 main border border-dark">
      <div className="bg-custom-dim-gold  py-2 container-fluid">
        <form className="form-inline border border-light rounded w-25 px-2">
          <i
            className="fas fa-search text-light small pr-2"
            aria-hidden="true"
          />
          <input
            className="bg-transparent form-control form-control-sm text-light border border-0 ml-1 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="bg-custom-paper container-fluid py-2">
        <strong>Record Templates</strong>
      </div>
      <div className="bg-custom-dim-gold container-fluid py-1 clearfix mb-3">
        <Link
          to="/manage-record-templates"
          className="btn btn-sm bg-custom-pale-gold text-light custom-radius border border-light float-right px-3 small"
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
          <div className=" w-100 bg-custom-pale-gold p-2 clearfix text-center text-dark">
            <strong>No Template</strong>
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
