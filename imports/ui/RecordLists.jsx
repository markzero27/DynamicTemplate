import React from "react";
import { Link } from "react-router-dom";

const RecordLists = ({ template }) => {
  return (
    <React.Fragment>
      <div className="d-flex flex-row mb-2">
        <div className=" w-100 bg-custom-dark-blue p-2 clearfix">
          <Link
            to={`/manage-records/${template._id}`}
            className="text-left text-light bg-custom-dark-blue border-0 w-100 d-block w-50 px-2"
          >
            <span className="text-secondary mr-4">Record</span>
            {template.name}
            <i className={`fas fa-caret-right float-right mt-1`} />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecordLists;
