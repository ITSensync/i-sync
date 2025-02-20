"use client";
import React, { useActionState, useEffect, useState } from "react";
import ZodErrors from "./ZodErrors";
import SuccessModal from "./SuccessModal";
import ErrorToast from "./ErrorToast";
import { ApiError } from "../types/ApiError";
import ModalLoadingLite from "./Loader/ModalLoading";
import { Stuff } from "../types/Stuff";
import { addStuffAction, editStuffAction } from "../data/actions/formStuff";
import { useParams } from "next/navigation";

interface FormStuffProps {
  stuffData?: Stuff;
  getIsFormShowingState: (state: boolean) => void;
  onCloseForm: () => void;
}

export default function FormStuff({
  stuffData,
  getIsFormShowingState,
  onCloseForm,
}: FormStuffProps) {
  const boxId = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [formAddState, formAddAction] = useActionState(addStuffAction, {
    data: null,
  });
  const [formEditState, formEditAction] = useActionState(editStuffAction, {
    data: null,
  });
  const [formStuffState, setFormStuffState] = useState<Stuff>({
    id: stuffData?.id || "",
    name: stuffData?.name || "",
    quantity: stuffData?.quantity || 0,
    merk: stuffData?.merk || "",
    detail: stuffData?.detail || "",
  });

  useEffect(() => {
    if (stuffData) {
      setFormStuffState({
        id: stuffData.id,
        name: stuffData.name,
        merk: stuffData.merk,
        quantity: stuffData.quantity,
        detail: stuffData.detail,
      });
    }
  }, [stuffData]);

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
    setFormStuffState((prevState) => ({
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
        action={stuffData ? formEditAction : formAddAction}
        onSubmit={() => setIsLoading(true)}
        className="outline-1 outline outline-zinc-400 h-full sm:w-[60vw] lg:w-[45vw] w-[95vw] py-4 px-7 rounded-md"
      >
        <h1 className="text-center font-poppins font-semibold text-xl my-4">
          {stuffData ? "Form Edit Stuff" : "Form Add Stuff"}
        </h1>
        {stuffData && (
          <input
            type="text"
            placeholder="Type here"
            name="id"
            className="input input-bordered w-full"
            value={formStuffState.id}
            onChange={handleInputChange}
            hidden
          />
        )}
        <input
          type="text"
          placeholder="Type here"
          name="boxId"
          className="input input-bordered w-full"
          value={boxId.id}
          onChange={handleInputChange}
          hidden
        />
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
            value={formStuffState.name}
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
            <span className="label-text text-zinc-900">Quantity</span>
          </div>
          <input
            min={0}
            id="quantity"
            name="quantity"
            type="number"
            value={formStuffState.quantity ? formStuffState.quantity : ""}
            onChange={handleInputChange}
            placeholder="10"
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.quantity ||
                formEditState?.zodErrors?.quantity
              }
            />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">Merk</span>
          </div>
          <input
            type="text"
            id="merk"
            name="merk"
            value={formStuffState.merk ? formStuffState.merk : ""}
            onChange={handleInputChange}
            placeholder="Type here..."
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.merk || formEditState?.zodErrors?.merk
              }
            />
          </div>
        </label>
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">Detail</span>
          </div>
          <input
            type="text"
            id="detail"
            name="detail"
            value={formStuffState.detail ? formStuffState.detail : ""}
            onChange={handleInputChange}
            placeholder="Type here..."
            className="input bg-white input-bordered w-full max-w-full text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.detail ||
                formEditState?.zodErrors?.detail
              }
            />
          </div>
        </label>
        <div className="flex flex-row gap-2 justify-between mt-5">
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
