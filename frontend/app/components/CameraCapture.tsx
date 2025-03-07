"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function CameraCapture({
  getUploadedUrl,
}: {
  getUploadedUrl: (url: string) => void;
}) {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Menangkap gambar dari kamera
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

  // Upload gambar ke Cloudinary
  const uploadImage = async () => {
    if (!image) return;

    setUploading(true);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", uploadPreset!);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      getUploadedUrl(data.secure_url); // Simpan URL dari Cloudinary
      (document.getElementById("camera_modal") as HTMLDialogElement).close();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg border"
      />
      <button
        type="button"
        onClick={capture}
        className="mt-2 px-4 py-2 btn btn-info text-white"
      >
        Capture
      </button>

      {image && (
        <>
          <div className="divider"></div>
          <div className="mt-2 flex flex-col w-full bg-red-50 justify-center">
            <Image
              src={image}
              alt="Captured"
              className="rounded-lg border w-full h-full"
              width={100}
              height={100}
            />
            <button
              onClick={uploadImage}
              className="mt-2 px-4 py-2 btn btn-success text-white"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
