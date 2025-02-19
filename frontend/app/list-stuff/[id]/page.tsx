/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BasePage from "@/app/components/BasePage";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DeleteModal from "@/app/components/DeleteModal";
import { boxService } from "@/app/data/services";
import { BoxDetail } from "@/app/types/Box";
import { ApiError } from "@/app/types/ApiError";
import ErrorToast from "@/app/components/ErrorToast";
import FormStuff from "@/app/components/FormStuff";
import { Stuff } from "@/app/types/Stuff";
import Loading from "@/app/components/Loader/Loading";

export default function DetailsPage() {
  const { id } = useParams();
  const [isFormShow, setIsFormShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedStuff, setEditedStuff] = useState<any>(null);
  const [deletedStuff, setDeletedStuff] = useState<any>(null);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });
  const [boxData, setBoxData] = useState<BoxDetail>({
    id: "",
    name: "",
    color: "",
    number: 0,
    stuff: [],
  });

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await boxService.getDetailsBox(id as string);
    if (response.data) {
      const boxData: BoxDetail = response.data;
      setBoxData(boxData);
      setIsLoading(false);
    } else {
      setErrorData({
        code: response.code,
        message: response.message,
      });
      setIsToastOpen(true);
    }
  };

  const handleBtnAddState = (state: boolean) => {
    setIsFormShow(state);
  };

  const handleBtnEditState = (editedStuff: Stuff) => {
    setEditedStuff(editedStuff);
    setIsFormShow(true);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const handleCloseForm = () => {
    setEditedStuff(null);
    setIsFormShow(false);
  };

  const handleBtnDelete = (deletedStuff: Stuff) => {
    setDeletedStuff(deletedStuff);
    (document.getElementById("delete_modal")! as HTMLDialogElement).showModal();
  };

  const removeStuffFromBox = (stuffId: string) => {
    setBoxData((prevBox) => ({
      ...prevBox,
      stuff: prevBox.stuff.filter((s) => s.id !== stuffId),
    }));
  };

  return (
    <BasePage>
      <div className="sm:w-[75vw] w-[100vw]">
        <ErrorToast
          isOpen={isToastOpen}
          error={errorData}
          onClose={handleCloseToast}
        />
        <DeleteModal stuffData={deletedStuff} onDelete={removeStuffFromBox} />
        {isFormShow ? (
          <div className="w-full">
            <FormStuff
              getIsFormShowingState={handleBtnAddState}
              stuffData={editedStuff}
              onCloseForm={handleCloseForm}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="lg:w-4/5 md:w-full w-full">
                <div className="flex flex-row items-center justify-between pl-4 sm:px-0 px-4">
                  <button>
                    <Link href={"/"} className="flex md:flex-row flex-col items-center text-blue-400">
                      <HomeIcon style={{ fontSize: 30 }} />
                      <p className="md:text-lg md:ml-1 text-sm font-bold">Home</p>
                    </Link>
                  </button>
                  <div>
                    <p className="md:text-xl text-md">
                      <span className="font-bold">{boxData.name}</span> /{" "}
                      <span>{boxData.number}</span> /{" "}
                      <span>{boxData.color}</span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-end my-4 sm:px-0 px-4">
                  <button
                    className="btn btn-success btn-sm sm:btn-md text-white"
                    onClick={() => handleBtnAddState(true)}
                  >
                    <AddIcon className="sm:inline !hidden" style={{ fontSize: 35 }} />
                    <p className="sm:hidden !inline">+</p>
                    <p className="font-poppins text-sm sm:text-lg">Add</p>
                  </button>
                </div>
              </div>
            </div>
            <>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loading />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr className="text-blue-400">
                        <th></th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Merk</th>
                        <th>Detail</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <tbody>
                        {boxData.stuff.map((stuff, index) => (
                          <tr key={index} className="text-xs sm:text-sm md:text-md lg:text-lg font-roboto">
                            <th>{index + 1}</th>
                            <td>{stuff.name || "-"}</td>
                            <td>{stuff.quantity || 0}</td>
                            <td>{stuff.merk || "-"}</td>
                            <td>{stuff.detail || "-"}</td>
                            <td className="flex flex-row gap-4">
                              {/* EDIT BUTTON */}
                              <button
                                className="tooltip tooltip-info"
                                data-tip="Edit"
                                onClick={() => handleBtnEditState(stuff)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6 text-blue-600"
                                >
                                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                              </button>
                              {/* DELETE */}
                              <button
                                className="tooltip tooltip-error"
                                data-tip="Delete"
                                onClick={() => handleBtnDelete(stuff)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6 text-error"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              )}
            </>
          </>
        )}
      </div>
    </BasePage>
  );
}
