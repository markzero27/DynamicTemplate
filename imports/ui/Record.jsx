import React, { useEffect } from "react";
import EditRecordModal from "./EditRecordModal";
import DeleteRecordModal from "./DeleteModal";

const Record = ({ record, setRecord, setAlert }) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  return (
    <React.Fragment>
      <div className="d-flex flex-row">
        <button
          className="bg-custom-dark-blue border-0 text-center small text-light mr-2 box"
          data-toggle="modal"
          data-target="#editRecordModal"
        >
          <i className="fas fa-edit" />
        </button>
        <EditRecordModal record={record} setAlert={setAlert} />
        <button
          className="bg-custom-dark-blue border-0 text-center small text-light mr-2 box"
          data-toggle="modal"
          data-target="#deleteRecordModal"
        >
          <i className="fas fa-trash-alt" />
        </button>
        <DeleteRecordModal
          id={record._id}
          setRecord={setRecord}
          setAlert={setAlert}
          set="record"
        />
        <div className="w-100">
          <div className="px-3 py-2 bg-custom-dark-blue text-white mb-1 d-flex flex-row">
            <span className="text-secondary w-25"> Date Created:</span>
            <div className="ml-2 w-50">
              {record.createdAt.getDate()}-{months[record.createdAt.getMonth()]}
              -{record.createdAt.getFullYear()} {record.createdAt.getHours()}:
              {record.createdAt.getMinutes()}:{record.createdAt.getSeconds()}
            </div>
          </div>

          <div className="text-white mb-2">
            {record &&
              record.fields.map((field, index) => (
                <div
                  className="d-flex flex-row bg-custom-dark-blue mb-1 px-3 py-2"
                  key={index}
                >
                  <div className="text-secondary w-25 text-capitalize">
                    {field.name} :
                  </div>
                  <div className="ml-2 w-50 border border-primary px-2 rounded">
                    {field.value}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Record;
