/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import FormBox from "./FormBox";
import { boxService } from "../data/services";
import { Box } from "../types/Box";
import { ApiError } from "../types/ApiError";
import Loading from "./Loader/Loading";
import EmptyPage from "./EmptyPage";
import ErrorToast from "./ErrorToast";
import Image from "next/image";
import DeleteModal from "./DeleteModal";

export default function ListCard() {
  const [isFormShow, setIsFormShow] = useState(false);
  const [editedBox, setEditedBox] = useState<any>();
  const [deletedBox, setDeletedBox] = useState<any>();
  const [boxesData, setBoxesData] = useState<Box[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const handleBtnAddState = (state: boolean) => {
    setIsFormShow(state);
  };

  useEffect(() => {
    loadBoxes();
  }, []);

  const loadBoxes = async () => {
    setIsLoading(true);
    const response = await boxService.getListBox();
    if (response.data) {
      const boxResult: Box[] = response.data;
      setBoxesData(boxResult);
    } else {
      setErrorData({
        code: response.statusCode,
        message: response.message,
      });
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const handleEditBtn = (editedBox: Box) => {
    setEditedBox(editedBox);
    setIsFormShow(true);
  };

  const handleDeleteBtn = (deletedBox: Box) => {
    setDeletedBox(deletedBox);
    (document.getElementById("delete_modal")! as HTMLDialogElement).showModal();
  };

  const handleCloseForm = () => {
    setEditedBox(null);
    setIsFormShow(false);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  const removeDataFromState = (id: string) => {
    setBoxesData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="w-[100vw] sm:w-full">
      <ErrorToast
        isOpen={isToastOpen}
        error={errorData}
        onClose={handleCloseToast}
      />
      <DeleteModal boxData={deletedBox} onDelete={removeDataFromState} />
      {isFormShow ? (
        <FormBox
          getIsFormShowingState={handleBtnAddState}
          boxData={editedBox}
          onCloseForm={handleCloseForm}
        />
      ) : (
        <>
          <div className="flex justify-end px-4 lg:w-4/5 md:w-full w-full">
            <button
              onClick={() => handleBtnAddState(true)}
              className="btn btn-success btn-sm sm:btn-md text-white"
            >
              <AddIcon className="md:inline !hidden" style={{ fontSize: 35 }} />
              <p className="md:hidden !inline">+</p>
              <p className="font-poppins text-sm sm:text-lg">Add</p>
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loading />
            </div>
          ) : boxesData.length == 0 && !isLoading ? (
            <div className="flex justify-center items-center p-8">
              <EmptyPage item="Box" image="/no-results.png" size={300} />
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10 px-4">
                {boxesData.map((item, index) => (
                  <div
                    key={index}
                    className="card border-zinc-400 border rounded-lg shadow-2xl min-h-full xl:w-64 md:w-56 sm:w-52 w-full
                     transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
                  >
                    <div className="card-body">
                      <Link href={`/list-stuff/${item.id}`}>
                        <div className="w-full flex flex-row items-center justify-center gap-6 mb-4">
                          <Image
                            src={"/box.png"}
                            alt="box"
                            width={70}
                            height={70}
                          ></Image>
                          <div className="flex flex-col items-start justify-start">
                            <p className="card-title text-lg text-ellipsis overflow-hidden line-clamp-2">
                              {item.name}
                            </p>
                            <p className="line-clamp-2">
                              {item.number ? item.number : "N/A"}
                            </p>
                            <p className="line-clamp-2">
                              {item.color ? item.color : "N/A"}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="card-actions flex flex-row justify-center gap-4 items-center">
                        <button
                          className="btn btn-info btn-sm text-white"
                          onClick={() => handleEditBtn(item)}
                        >
                          <span className="">Edit</span>
                        </button>
                        <button
                          className="btn btn-error btn-sm text-white"
                          onClick={() => handleDeleteBtn(item)}
                        >
                          <span className="">Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
