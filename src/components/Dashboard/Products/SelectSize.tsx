"use client";

import React, { forwardRef } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface Props {
  sizes: string[];
  className?: string;
}

const SizeSelector = forwardRef<HTMLDivElement, Props>(
  ({ sizes, className = "" }: Props, ref) => {
    const { control } = useFormContext();

    return (
      <>
        <div ref={ref} className={`flex items-center gap-4 ${className}`}>
          <p className="text-sm font-bold">Select Size:</p>
          <div className="flex flex-wrap items-center gap-4 p-2">
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
                      checked={field.value?.includes(size) || false} // Đảm bảo checked không gây lỗi
                      onChange={(e) => {
                        const selectedSizes = field.value || []; // Nếu field.value là undefined, sử dụng mảng rỗng
                        if (e.target.checked) {
                          field.onChange([...selectedSizes, size]); // Thêm size vào danh sách đã chọn
                        } else {
                          field.onChange(
                            selectedSizes.filter((s: string) => s !== size),
                          ); // Loại bỏ size khỏi danh sách
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
      </>
    );
  },
);

SizeSelector.displayName = "SizeSelector";

export default SizeSelector;
