import React from "react";
import { BoxDetail } from "../types/Box";
import EmptyPage from "./EmptyPage";
import Link from "next/link";

export default function SearchResult({
  searchResult,
}: {
  searchResult: BoxDetail[];
}) {
  return (
    <div className="my-7 flex justify-center">
      <div className="overflow-x-auto sm:w-[70vw] w-[100vw]">
        {searchResult.length == 0 ? (
          <EmptyPage item="Barang" image="/no-results.png" size={300} />
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-blue-400">
                <th>Name</th>
                <th>Quantity</th>
                <th>Merk</th>
                <th>Detail</th>
                <th>Box Location</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((box, boxIndex) =>
                box.stuff.map((stuff, stuffIndex) => (
                  <tr
                    key={`${boxIndex}-${stuffIndex}`}
                    className="text-xs sm:text-sm md:text-md lg:text-lg font-roboto"
                  >
                    {/* <th>{boxIndex + 1}</th> */}
                    <td>{stuff.name || "-"}</td>
                    <td>{stuff.quantity || 0}</td>
                    <td>{stuff.merk || "-"}</td>
                    <td>{stuff.detail || "-"}</td>
                    <td>
                      <Link
                        className="text-blue-500 underline hover:font-bold"
                        href={`/list-stuff/${box.id}`}
                      >
                        {box.name || "-"} / {box.number || "-"} /{" "}
                        {box.color || "-"}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
