"use client";

import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { X } from "lucide-react";
import { apiUpdateImages } from "@/lib/actions/productActions";

interface InputImagesProps {
  label: string;
  name: string;
  type: string;
  error?: string;
  onChange: (images: string | string[]) => void;
  defaultImages?: string[];
  isArray?: boolean;
}

const InputImages: React.FC<InputImagesProps> = ({
  label,
  name,
  type,
  error,
  onChange,
  defaultImages = [],
  isArray = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState<string[]>(defaultImages);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const files = e.target.files;

    if (files) {
      setLoading(true);
      const promises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_ASSETS_NAME
            ? process.env.NEXT_PUBLIC_UPLOAD_ASSETS_NAME
            : "sozv4xcz",
        );

        try {
          const response = await apiUpdateImages(formData);
          if (response?.secure_url) {
            return response.secure_url;
          } else {
            console.error("Upload failed: ", response);
          }
        } catch (error) {
          console.error("Upload error: ", error);
        }

        return null;
      });

      const uploadedImages = (await Promise.all(promises)).filter(Boolean);

      if (isArray) {
        setImagesPreview((prev) => [...prev, ...uploadedImages]);
        onChange([...imagesPreview, ...uploadedImages]);
      } else {
        setImagesPreview([uploadedImages[0]]);
        onChange(uploadedImages[0]);
      }

      setLoading(false);
    }
  };

  const handleDeleteImage = (image: string) => {
    const updatedImages = imagesPreview.filter((item) => item !== image);
    setImagesPreview(updatedImages);
    onChange(updatedImages);
    if (updatedImages.length === 0) {
      const input = document.getElementById(name) as HTMLInputElement;
      if (input) input.value = "";
    }
  };

  return (
    <div className="flex items-end gap-4">
      <div
        className={`flex size-28 border-2 border-dashed border-blue-400 ${!isArray && imagesPreview.length > 0 ? "hidden" : ""}`}
      >
        <label
          htmlFor={name}
          className="flex size-28 cursor-pointer flex-col items-center justify-center text-center"
        >
          <div className="m-auto">
            {loading ? (
              <HashLoader color="blue" size={30} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <ImageIcon size={30} />
                <span className="text-xs font-bold">{label}</span>
              </div>
            )}
          </div>
        </label>
        <input
          id={name}
          type={type}
          onChange={handleFiles}
          hidden
          multiple={isArray}
        />
      </div>
      {error && <small className="text-red-500">{error}</small>}
      <div className="flex w-full flex-wrap">
        <div className="scrollbar-hide flex flex-wrap gap-4 overflow-x-scroll">
          {imagesPreview.map((item, index) => (
            <div className="relative" key={index}>
              <div
                className="absolute right-2 top-2 cursor-pointer rounded-full bg-black bg-opacity-50 p-1"
                onClick={() => handleDeleteImage(item)}
              >
                <X className="text-red-500" />
              </div>
              <Image
                src={item}
                alt="preview-images"
                width={80}
                height={80}
                className="size-32 border border-dashed border-gray-600 object-cover p-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputImages;
