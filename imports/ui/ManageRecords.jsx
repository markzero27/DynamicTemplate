import React, { useState, useEffect } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import Record from "./Record";
import Records from "../api/records";
import Templates from "../api/templates";
import AddRecordModal from "./AddRecordModal";

const RecordLists = ({ match, templates, records }) => {
  const id = match.params.id;
  const [template, settemplate] = useState(null);
  const [errors, setErrors] = useState([]);
  const [record, setRecord] = useState([]);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if (templates.length > 0) {
      settemplate(templates.filter(temp => temp._id === id)[0]);
    }
  }, [templates]);

  useEffect(() => {
    if (records.length > 0) {
      setRecord(records.filter(rec => rec.templateid === id));
    }
  }, [records]);

  return (
    <div className="mt-2 mx-auto bg-custom-paper pb-3 main border border-dark">
      <div className="bg-custom-dim-gold  py-2 container-fluid">
        <Link to="/" className="btn btn-sm btn-transparent text-light">
          <i className="fa fa-arrow-left" />
        </Link>
      </div>
      <div className="bg-custom-paper container-fluid py-2 text-dark">
        <strong>{template && template.name} Record</strong>
      </div>
      <div className="bg-custom-dim-gold container-fluid py-1  mb-3 clearfix">
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
          data-target="#addRecordModal"
          className="btn btn-sm text-light bg-custom-pale-gold custom-radius border border-light float-right px-3 small"
        >
          Add Record <i className="fa fa-plus ml-3" />
        </button>
        <AddRecordModal
          template={template}
          setErrors={setErrors}
          setAlert={setAlert}
        />
      </div>
      <div className="container-fluid mb-2 overflow-custom margin-custom list">
        {alert}
        {errors.length > 0 &&
          errors.map((error, index) => (
            <div key={index} className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-circle mr-2" />
              {error.msg}
            </div>
          ))}
        {record &&
          record.map((rec, index) => (
            <Record
              key={rec._id}
              record={rec}
              template={template}
              index={index}
              setRecord={setRecord}
              setAlert={setAlert}
            />
          ))}

        {record && record.length == 0 && (
          <div className=" w-100 bg-custom-pale-gold p-2 clearfix text-center text-light">
            No record
          </div>
        )}
      </div>
    </div>
  );
};

export default withTracker(() => {
  return {
    templates: Templates.find({}).fetch(),
    records: Records.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(RecordLists);
