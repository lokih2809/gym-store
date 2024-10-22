import { FOOTER_INFORMATION } from "@/constants/data";
import { usePathname } from "next/navigation";
import React from "react";

const FooterInformation = () => {
  const pathName = usePathname();

  if (!pathName) return null;
  return (
    <>
      {FOOTER_INFORMATION.map((item) => (
        <div
          key={item.title}
          className={`space-y-4 ${pathName !== "/" ? "hidden" : "block"}`}
        >
          <h1 className={`text-2xl font-bold uppercase`}>{item.title}</h1>
          {item.content.split("\n").map((line, index) => (
            <p className="text-sm leading-8 lg:text-base" key={index}>
              {line}
              <br />
            </p>
          ))}
        </div>
      ))}
    </>
  );
};

export default FooterInformation;
