import Image from "next/image";
import React from "react";

export default function ImageViewerModal({
  link,
  handleModalClose,
}: {
  link: string;
  handleModalClose: () => void;
}) {
  const handleCloseBtn = () => {
    (document.getElementById("image_modal")! as HTMLDialogElement).close();
    handleModalClose();
  };

  // if (!link) return null;

  return (
    <dialog id="image_modal" className={`modal modal-middle p-6 md:p-0`}>
      <div className="modal-box w-fit h-fit flex flex-col items-center bg-white p-10">
        <button
          onClick={handleCloseBtn}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <Image
          src={link || 'https://placehold.co/600x500?text=No+Image'}
          width={1920}
          height={1080}
          alt="img"
          className="w-full h-full rounded-md"
        />
      </div>
    </dialog>
  );
}
