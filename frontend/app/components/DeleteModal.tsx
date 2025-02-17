import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Book } from "../types/Box";
import { ApiError } from "../types/ApiError";
import { booksService } from "../data/services";
import ErrorToast from "./ErrorToast";
import SuccessModal from "./SuccessModal";
import ModalLoadingLite from "./Loader/ModalLoading";

export default function DeleteModal({ bookData }: { bookData: Book }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  useEffect(() => {
    if (isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        router.back();
      }, 2000);
    }
  });

  const router = useRouter();
  const handleDelete = async () => {
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
    setIsLoading(true);

    const response = await booksService.deleteBooks(bookData.id);
    if (response.statusCode !== 200) {
      setErrorData({
        message: response.message,
        code: response.code,
      });
      setIsToastOpen(true);
    } else {
      setIsSuccess(true)
    }
    setIsLoading(false);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div>
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <SuccessModal message={"Delete Books Success"} />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="delete_modal" className="modal">
        <div className="modal-box w-fit p-10 bg-white">
          <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
            Delete Books
          </h1>
          <p className="mb-4 text-center">
            Are you sure to delete{" "}
            <span className="font-bold">{bookData.title}</span>?
          </p>
          <div className="card-actions justify-center">
            <form method="dialog">
              <button className="btn btn-outline btn-warning">Cancel</button>
            </form>
            <button onClick={handleDelete} className="btn btn-error text-white">
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
