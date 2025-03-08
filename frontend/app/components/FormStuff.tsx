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
import ModalCamera from "./ModalCamera";
import Image from "next/image";

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
    img_url: stuffData?.img_url || "",
  });
  const [uploadedUrl, setUploadedUrl] = useState("");

  useEffect(() => {
    if (stuffData) {
      setUploadedUrl(stuffData.img_url);
      setFormStuffState({
        id: stuffData.id,
        name: stuffData.name,
        merk: stuffData.merk,
        quantity: stuffData.quantity,
        detail: stuffData.detail,
        img_url: stuffData.img_url,
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

  const getUploadedUrl = (url: string) => {
    setUploadedUrl(url);
  };

  const handleCameraBtn = () => {
    (document.getElementById("camera_modal")! as HTMLDialogElement).showModal();
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div className="flex justify-center mb-6">
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
          {stuffData ? "Form Edit Barang" : "Form Tambah Barang"}
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
        <label className="form-control w-full max-w-full">
          <div className="label">
            <span className="label-text text-zinc-900">Image</span>
          </div>
          <div className="join">
            <div className="w-full">
              <div className="w-full">
                <input
                  type="text"
                  value={uploadedUrl || ""}
                  name="img_url"
                  className="input join-item w-full bg-white input-bordered"
                  readOnly
                  placeholder="Image URL"
                />
              </div>
            </div>
            <div className="indicator">
              <button
                type="button"
                onClick={handleCameraBtn}
                className="btn btn-info text-white join-item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="label">
            <ZodErrors
              error={
                formAddState?.zodErrors?.img_url ||
                formEditState?.zodErrors?.img_url
              }
            />
          </div>
          {uploadedUrl && (
            <div>
              <div className="label">
                <span className="label-text text-zinc-900">Uploaded Image:</span>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src={uploadedUrl}
                  alt="Uploaded"
                  className="rounded-lg border w-2/3 h-1/2"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          )}
          {/* <CameraCapture getUploadedUrl={getUploadedUrl} /> */}
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
      <ModalCamera getUploadedUrl={getUploadedUrl} />
      <ModalLoadingLite isOpen={isLoading} />
    </div>
  );
}
