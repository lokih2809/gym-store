"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const FOOTER_LINKS = [
  {
    title: "help",
    links: [
      "FAQ",
      "Delivery Information",
      "Returns Policy",
      "Make A Return",
      "Orders",
      "Submit a Fake",
    ],
  },
  {
    title: "My Account",
    links: ["Login", "Register"],
  },
  {
    title: "Pages",
    links: [
      "Gymshark Central",
      "Careers",
      "About Us",
      "Student Discount",
      "Factory List",
    ],
  },
];

interface Props {
  isMobile?: boolean;
}

const FooterLink = ({ isMobile }: Props) => {
  const [showLinks, setShowLinks] = useState<{ [key: string]: boolean }>({});

  const toggleLink = (title: string) => {
    if (isMobile)
      setShowLinks((prev) => ({
        ...prev,
        [title]: !prev[title],
      }));
  };

  return (
    <>
      <div className="flex flex-col gap-0 lg:flex-row lg:gap-8">
        {FOOTER_LINKS.map((item) => (
          <div key={item.title} className="border-t py-4 lg:border-none">
            <div
              onClick={() => toggleLink(item.title)}
              className="flex cursor-pointer justify-between"
            >
              <span className="font-bold uppercase">{item.title}</span>
              {isMobile && (showLinks[item.title] ? <Minus /> : <Plus />)}
            </div>
            <div className="flex flex-col gap-2">
              {item.links.map((link, index) => (
                <div
                  key={index}
                  className={`${showLinks[item.title] ? "block" : "hidden lg:block"} pl-4 text-sm opacity-70 first:mt-2 lg:pl-0`}
                >
                  <Link href={link.toLowerCase().replace(" ", "-")}>
                    {link}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FooterLink;
