"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type Props = {
  sizes: string[];
  className?: string;
};

const SizeSelector = ({ sizes, className }: Props) => {
  const { control } = useFormContext();

  return (
    <div className={`flex flex-col ${className}`}>
      <p className="text-sm font-bold">Select Size:</p>
      <div className="flex flex-wrap items-center gap-8 py-2">
        {sizes.map((size) => (
          <label
            key={size}
            className="flex items-center justify-center text-center"
          >
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  value={size}
                  checked={field.value?.includes(size)}
                  onChange={(e) => {
                    const selectedSizes = field.value || [];
                    if (e.target.checked) {
                      field.onChange([...selectedSizes, size]);
                    } else {
                      field.onChange(
                        selectedSizes.filter((s: string) => s !== size),
                      );
                    }
                  }}
                  className="mr-2 size-4"
                />
              )}
            />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
