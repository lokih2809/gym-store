import { ProductInfo } from "@/types/common";
import { ChevronRight, X } from "lucide-react";
import React, { useState } from "react";

const Description = ({ productInfo }: { productInfo: ProductInfo }) => {
  const [showDesc, setShowDesc] = useState<boolean>(false);

  return (
    <>
      <div className="space-y-6">
        {/* Delivery */}
        <div className="flex flex-col bg-gray-100 p-4 text-sm">
          <b>Standard Delivery</b>
          <span>
            Prices & thresholds vary. Refer to our delivery information
          </span>
        </div>

        <hr />
        {/* Description */}
        <div className="lg:text-sm">
          <div
            className="ml-4 flex cursor-pointer justify-between px-2"
            onClick={() => setShowDesc(true)}
          >
            <span className="font-bold uppercase">Description</span>
            <ChevronRight />
          </div>

          {/*  */}
          {showDesc && (
            <div>
              <div className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black opacity-40"></div>
              <div className="fixed bottom-0 left-0 right-0 top-[20%] z-20 transform animate-slide-in rounded-t-lg bg-white lg:left-[60%] lg:top-0 lg:animate-slide-in-right">
                {/* Top */}
                <div className="flex items-center justify-between p-4 lg:py-10">
                  <span className="mx-auto font-bold uppercase lg:text-xl">
                    Description
                  </span>
                  <X
                    onClick={() => setShowDesc(false)}
                    className="cursor-pointer"
                  />
                </div>
                <hr className="lg:hidden" />

                {/* Content */}
                <div className="flex flex-col gap-4 px-4 py-6 lg:px-12">
                  <b>GRAPHIC IMAGES</b>
                  <span>
                    Versatile fits & authentic lifting graphics. Step up your
                    staples with our graphic styles.
                  </span>
                  <ul className="list-disc px-8">
                    {productInfo?.description
                      ?.split("-")
                      .slice(0, -1)
                      .map((desc: string) => <li key={desc}>{desc}</li>)}
                  </ul>

                  <b>SIZE & FIT</b>
                  <span className="px-4 capitalize">+ {productInfo.fit}</span>

                  <b>SKU: {productInfo.sku}</b>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Delivery & Returns */}
        <div>
          <div className="ml-4 flex justify-between px-2 lg:text-sm">
            <span className="font-bold uppercase">Delivery & Returns</span>
            <ChevronRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
