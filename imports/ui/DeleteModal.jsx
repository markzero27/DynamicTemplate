import React from "react";
import Records from "../api/records";
import Templates from "../api/templates";

const DeleteRecordModal = ({ id, setRecord, setAlert, set }) => {
  const deleteRecord = () => {
    if (set == "templates") {
      Templates.remove({ _id: id });
      setAlert(
        <div className="alert alert-success" role="alert">
          <i className="fa fa-fw fa-check" />
          Template deleted successfully!
        </div>
      );
      setTimeout(() => {
        setAlert("");
      }, 3000);
    } else {
      Records.remove({ _id: id });
      setRecord([]);
      setAlert(
        <div className="alert alert-success" role="alert">
          <i className="fa fa-fw fa-check" />
          Record deleted successfully!
        </div>
      );
      setTimeout(() => {
        setAlert("");
      }, 3000);
    }
  };

  if (set == "template") {
  }
  return (
    <React.Fragment>
      <button
        className="bg-custom-pale-gold border-0 text-center small text-light mr-2 box"
        data-toggle="modal"
        data-target={`#deleteRecordModal${id}`}
      >
        <i className="fas fa-trash-alt" />
      </button>
      <div
        className="modal fade"
        id={`deleteRecordModal${id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteRecordModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content bg-custom-dim-gold">
            <div className="modal-body text-light">
              Delete {set}?
              <div className="float-right">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm mr-2"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger "
                  data-dismiss="modal"
                  onClick={() => {
                    deleteRecord();
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DeleteRecordModal;
