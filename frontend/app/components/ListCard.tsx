"use client";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import FormBook from "./FormBox";
import { boxService } from "../data/services";
import { Box } from "../types/Box";
import { ApiError } from "../types/ApiError";
import Loading from "./Loader/Loading";
import EmptyPage from "./EmptyPage";
import ErrorToast from "./ErrorToast";
import Image from "next/image";

export default function ListCard() {
  const [isFormShow, setIsFormShow] = useState(false);
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
        code: response.code,
        message: response.message,
      });
      setIsToastOpen(true);
    }
    setIsLoading(false);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div className="w-full">
      <ErrorToast
        isOpen={isToastOpen}
        error={errorData}
        onClose={handleCloseToast}
      />
      {isFormShow ? (
        <FormBook getIsFormShowingState={handleBtnAddState} />
      ) : (
        <>
          <div className="flex justify-end px-4">
            <button
              onClick={() => handleBtnAddState(true)}
              className="btn btn-success btn-md text-white"
            >
              <AddIcon style={{ fontSize: 35 }} />
              <p className="font-poppins text-lg">Add</p>
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loading />
            </div>
          ) : boxesData.length == 0 && !isLoading ? (
            <div className="flex justify-center items-center p-8">
              <EmptyPage item="Book" image="/no-results.png" size={300} />
            </div>
          ) : (
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 gap-y-7 mt-10 px-4">
              {boxesData.map((item, index) => (
                <Link key={index} href={`/list-stuff/${item.id}`}>
                  <div className="card border-zinc-400 border rounded-xl shadow-2xl min-h-full w-fit">
                    <div className="card-body">
                      <div className="w-fit flex flex-row items-center justify-start gap-4 mb-4">
                        <Image
                          src={"/box.png"}
                          alt="box"
                          width={100}
                          height={100}
                        ></Image>
                        <div className="flex flex-col items-start justify-start">
                          <p className="card-title text-ellipsis overflow-hidden line-clamp-2">
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
                      <div className="flex flex-row justify-center gap-4 items-center">
                        <button className="btn btn-info btn-sm text-white">
                          <span className="md:inline hidden">Edit</span>
                        </button>
                        <button className="btn btn-error btn-sm text-white">
                          <span className="md:inline hidden">Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
