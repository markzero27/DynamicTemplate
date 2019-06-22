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
        <EditRecordModal record={record} setAlert={setAlert} />

        <DeleteRecordModal
          id={record._id}
          setRecord={setRecord}
          setAlert={setAlert}
          set="record"
        />
        <div className="w-100">
          <div className="px-3 py-2 bg-custom-pale-gold text-dark mb-1 d-flex flex-row">
            <span className="text-secondary w-25"> Date Created:</span>
            <div className="ml-2 w-50">
              {record.createdAt.getDate()}-{months[record.createdAt.getMonth()]}
              -{record.createdAt.getFullYear()} {record.createdAt.getHours()}:
              {record.createdAt.getMinutes()}:{record.createdAt.getSeconds()}
            </div>
          </div>

          <div className="text-dark mb-2">
            {record &&
              record.fields.map((field, index) => (
                <div
                  className="d-flex flex-row bg-custom-pale-gold mb-1 px-3 py-2"
                  key={index}
                >
                  <div className="text-secondary w-25 text-capitalize">
                    {field.name} :
                  </div>
                  <div className="ml-2 w-50 border text-dark bg-custom-paper px-2 rounded">
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
