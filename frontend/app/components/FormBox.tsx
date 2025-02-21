"use client";
import React, { useActionState, useEffect, useState } from "react";
import { addBoxAction, editBoxAction } from "../data/actions/formBox";
import ZodErrors from "./ZodErrors";
import SuccessModal from "./SuccessModal";
import ErrorToast from "./ErrorToast";
import { ApiError } from "../types/ApiError";
import ModalLoadingLite from "./Loader/ModalLoading";
import { Box } from "../types/Box";

interface FormBoxProps {
  boxData?: Box;
  getIsFormShowingState: (state: boolean) => void;
  onCloseForm: () => void;
}

export default function FormBox({
  boxData,
  getIsFormShowingState,
  onCloseForm,
}: FormBoxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [formAddState, formAddAction] = useActionState(addBoxAction, {
    data: null,
  });
  const [formEditState, formEditAction] = useActionState(editBoxAction, {
    data: null,
  });
  const [formBoxState, setFormBoxState] = useState<Box>({
    id: boxData?.id || "",
    name: boxData?.name || "",
    number: boxData?.number || 0,
    color: boxData?.color || "",
  });

  useEffect(() => {
    if (boxData) {
      setFormBoxState({
        id: boxData.id,
        name: boxData.name,
        color: boxData.color,
        number: boxData.number,
      });
    }
  }, [boxData]);

  useEffect(() => {
    if (!formAddState.isLoading || !formEditState.isLoading) {
      setIsLoading(false);
    }

    if (formAddState.isError || formEditState.isError) {
      setErrorData({
        code: formAddState?.apiErrors?.code || formEditState?.apiErrors?.code,
        message:
          formAddState?.apiErrors?.message || formEditState?.apiErrors?.message,
      });
      setIsToastOpen(true);
    }

    if (formAddState.isSuccess || formEditState.isSuccess) {
      (
        document.getElementById("success_modal") as HTMLDialogElement
      ).showModal();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [formAddState, formEditState]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormBoxState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBackButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    isShow: boolean
  ) => {
    event.preventDefault();
    const confirmBack = confirm(
      "Apakah Anda yakin ingin kembali? Perubahan data tidak akan tersimpan."
    );

    if (confirmBack) {
      getIsFormShowingState(isShow);
      onCloseForm();
    }
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div className="flex justify-center">
      <SuccessModal message={formAddState?.message || formEditState?.message} />
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <form
        action={boxData ? formEditAction : formAddAction}
        onSubmit={() => setIsLoading(true)}
        className="outline-1 outline outline-zinc-400 sm:w-[60vw] lg:w-[45vw] w-[95vw] h-full py-4 px-7 rounded-md"
      >
        <h1 className="text-center font-poppins font-semibold text-xl my-4">
          {boxData ? "Form Edit Box" : "Form Tambah Box"}
        </h1>
        {boxData && (
          <input
            type="text"
            placeholder="Type here"
            name="id"
            className="input input-bordered w-full"
            value={formBoxState.id}
            onChange={handleInputChange}
            hidden
          />
        )}
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">
              Name <span className="text-red-700">*</span>
            </span>
          </div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Type here..."
            value={formBoxState.name}
            onChange={handleInputChange}
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.name || formEditState?.zodErrors?.name
              }
            />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">Color</span>
          </div>
          <input
            type="text"
            id="color"
            name="color"
            value={formBoxState.color ? formBoxState.color : ""}
            onChange={handleInputChange}
            placeholder="Type here..."
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.color ||
                formEditState?.zodErrors?.color
              }
            />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">Number</span>
          </div>
          <input
            min={0}
            id="number"
            name="number"
            type="number"
            value={formBoxState.number ? formBoxState.number : ""}
            onChange={handleInputChange}
            placeholder="101"
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.number ||
                formEditState?.zodErrors?.number
              }
            />
          </div>
        </label>
        <div className="flex flex-row gap-2 justify-end mt-5">
          <button
            onClick={(event) => handleBackButton(event, false)}
            className="btn btn-outline btn-warning text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`btn btn-info text-white ${
              isLoading ? "btn-disabled" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
      <ModalLoadingLite isOpen={isLoading} />
    </div>
  );
}
