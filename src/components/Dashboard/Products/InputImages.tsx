"use client";

import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import { X } from "lucide-react";
import { apiUpdateImages } from "@/lib/actions/productActions";

interface InputImagesProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  type: string;
  error?: string;
  onChange: (images: string[]) => void;
  defaultImages?: string[];
}

const InputImages: React.FC<InputImagesProps> = ({
  icon,
  label,
  name,
  type,
  error,
  onChange,
  defaultImages = [],
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
      setImagesPreview((prev) => [...prev, ...uploadedImages]);
      setLoading(false);

      onChange([...imagesPreview, ...uploadedImages]);
    }
  };

  const handleDeleteImage = (image: string) => {
    const updatedImages = imagesPreview.filter((item) => item !== image);
    setImagesPreview(updatedImages);
    onChange(updatedImages);
  };

  return (
    <>
      <div className="mt-6 flex h-28 w-full flex-col gap-2 border-2 border-dashed border-blue-400">
        <label
          htmlFor={name}
          className="mt-4 flex cursor-pointer items-center justify-center text-xl"
        >
          {loading ? (
            <span className="mt-4">
              <HashLoader color="blue" />
            </span>
          ) : (
            <span className="flex flex-col items-center">
              {icon}
              {label}
            </span>
          )}
        </label>
        <input id={name} type={type} onChange={handleFiles} hidden multiple />
      </div>
      {error && <small className="text-red-500">{error}</small>}
      <div className="w-full">
        <h3 className="py-4 font-bold">Preview</h3>
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
    </>
  );
};

export default InputImages;
