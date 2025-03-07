import React from "react";
import CameraCapture from "./CameraCapture";

export default function ModalCamera({
  getUploadedUrl,
}: {
  getUploadedUrl: (url:string) => void,
}) {
  return (
    <dialog id="camera_modal" className={`modal modal-middle`}>
      <div className="modal-box w-fit flex flex-col items-center bg-white">
        <CameraCapture getUploadedUrl={getUploadedUrl}/>
      </div>
    </dialog>
  );
}
