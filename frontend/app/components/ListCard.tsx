/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import FormBox from "./FormBox";
import { boxService } from "../data/services";
import { Box, BoxDetail } from "../types/Box";
import { ApiError } from "../types/ApiError";
import Loading from "./Loader/Loading";
import EmptyPage from "./EmptyPage";
import ErrorToast from "./ErrorToast";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
import SearchResult from "./SearchResult";

export default function ListCard() {
  const [isFormShow, setIsFormShow] = useState(false);
  const [editedBox, setEditedBox] = useState<any>();
  const [deletedBox, setDeletedBox] = useState<any>();
  const [boxesData, setBoxesData] = useState<BoxDetail[]>([]);
  const [filteredBoxes, setFilteredBoxes] = useState<BoxDetail[]>([]);
  const [inputSearch, setInputSearch] = useState("");
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
      const boxResult: BoxDetail[] = response.data;
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();
    setInputSearch(searchText);

    if (!searchText) {
      setFilteredBoxes([]);
    } else {
      const filtered = boxesData
        .map((box) => {
          // Filter hanya stuff yang cocok
          const matchingStuff = box.stuff.filter((s) =>
            s.name.toLowerCase().includes(searchText)
          );

          return matchingStuff.length > 0
            ? { ...box, stuff: matchingStuff }
            : null;
        })
        .filter(Boolean) as BoxDetail[];

      setFilteredBoxes(filtered);
    }
  };

  return (
    <div className="w-[100vw] sm:w-full mb-8 mt-4">
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
          <div className="flex justify-center">
            <div className="flex flex-row justify-between items-center w-full max-w-4xl px-4">
              <label
                className="input bg-white input-bordered input-sm sm:input-md border-zinc-300 
                flex items-center gap-0 sm:gap-2 shadow-lg"
              >
                <input
                  type="text"
                  className="text-sm sm:text-base w-28 sm:w-48 bg-red-400"
                  placeholder="Cari barang"
                  onChange={handleSearch}
                  value={inputSearch}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 sm:h-6 sm:w-6 opacity-70 text-blue-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button
                onClick={() => handleBtnAddState(true)}
                className="btn btn-success btn-sm sm:btn-md text-white"
              >
                <p className="inline-block text-xl">+</p>
                <p className="font-poppins text-sm sm:text-lg hidden sm:inline">
                  Tambah
                </p>
              </button>
            </div>
          </div>
          {inputSearch ? (
            <SearchResult searchResult={filteredBoxes} />
          ) : isLoading ? (
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
