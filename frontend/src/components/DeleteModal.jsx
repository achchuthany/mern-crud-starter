import React from "react";

export default function DeleteModal({
  show,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div>
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }} />

      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1060 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title || "Confirm"}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              <p>{message || "Are you sure you want to delete this item?"}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
