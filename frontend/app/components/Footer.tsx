import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-center md:h-20 h-16 mt-4 inset-x-0 bottom-0 w-full bg-blue-500 text-white p-4 items-center">
      <div className="flex md:flex-row flex-col items-center">
        <p className="text-center lg:text-lg md:text-md sm:text-sm text-xs">
          &copy; 2025 PT Sensor Teknologi Indonesia (Sensync).
        </p>
        <p className="lg:text-lg md:text-md sm:text-sm text-xs">All rights reserved.</p>
      </div>
    </div>
  );
}
