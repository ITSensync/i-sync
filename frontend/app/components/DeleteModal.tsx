import React, { useState } from "react";
import { Box } from "../types/Box";
import { ApiError } from "../types/ApiError";
import { boxService } from "../data/services";
import ErrorToast from "./ErrorToast";
import ModalLoadingLite from "./Loader/ModalLoading";

export default function DeleteModal({
  boxData,
  onDelete,
}: {
  boxData: Box;
  onDelete: (id: string) => void;
}) {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastData, setToastData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDelete = async () => {
    (document.getElementById("delete_modal") as HTMLDialogElement).close();
    setIsLoading(true);

    const response = await boxService.deleteBox(boxData.id);
    if (response.statusCode !== 200) {
      setToastData({
        message: response.message,
        code: response.statusCode,
      });
      setIsToastOpen(true);
    } else {
      setToastData({
        message: response.message,
        code: response.statusCode,
      });
      setIsSuccess(true);
      onDelete(boxData.id);
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div>
      <ErrorToast
        error={toastData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
        style={isSuccess ? "alert-success" : "alert-error"}
      />
      <ModalLoadingLite isOpen={isLoading} />
      <dialog id="delete_modal" className="modal">
        <div className="modal-box w-fit p-10 bg-white">
          <h1 className="mb-4 text-center text-3xl font-bold text-black-2">
            Delete Box
          </h1>
          <p className="mb-4 text-center">
            Are you sure to delete{" "}
            <span className="font-bold">{boxData?.name}</span>?
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
