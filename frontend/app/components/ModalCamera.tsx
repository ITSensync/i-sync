import React from "react";
import CameraCapture from "./CameraCapture";

export default function ModalCamera({
  getUploadedUrl,
}: {
  getUploadedUrl: (url: string) => void;
}) {
  const handleCloseBtn = () => {
    (document.getElementById("camera_modal")! as HTMLDialogElement).close();
    // handleModalClose();
  };
  return (
    <dialog id="camera_modal" className={`modal modal-middle`}>
      <div className="modal-box w-fit flex flex-col items-center bg-white p-10">
        <button
          onClick={handleCloseBtn}
          className="btn btn-sm text-lg btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <CameraCapture getUploadedUrl={getUploadedUrl} />
      </div>
    </dialog>
  );
}
