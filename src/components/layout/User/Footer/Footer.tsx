"use client";

import Link from "next/link";
import React from "react";
import FooterLink from "./FooterLink";
import { ChevronUp, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import FooterInformation from "./FooterInformation";

const aboutMore = [
  {
    title: "blog",
    img: "/footerBlog.avif",
  },
  {
    title: "email sign up",
    img: "/footerEmail.avif",
  },
  {
    title: "gymShark training",
    img: "/footerTraining.avif",
  },
];

const socialLinks = [
  {
    icon: <Facebook size={15} />,
    link: "/",
  },
  {
    icon: <Instagram size={15} />,
    link: "/",
  },
  {
    icon: <Youtube size={15} />,
    link: "/",
  },
  {
    icon: <Twitter size={15} />,
    link: "/",
  },
];

const policyLinks = [
  "Terms and Conditions",
  "Terms of Use",
  "Privacy Notice",
  "Cookie Policy",
  "Modern Slavery",
];

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mt-16 flex flex-col gap-4 px-4 lg:px-8 xl:px-12">
        {/* Footer information */}
        <FooterInformation />

        {/* Footer option contact */}
        <div className="flex flex-col lg:mt-12 lg:gap-8 lg:border-t">
          {/* Button back to top */}
          <span
            onClick={handleBackToTop}
            className="m-auto flex items-center gap-1 py-4 font-bold lg:hidden"
          >
            Back to top
            <ChevronUp size={15} />
          </span>

          <div className="block lg:hidden">
            <FooterLink isMobile />
          </div>

          <div className="justify-between lg:flex">
            <div className="hidden lg:block">
              <FooterLink />
            </div>

            {/* More about */}
            <div className="border-t pt-4 lg:border-none">
              <span className="font-bold uppercase">More about GymShark</span>
              <div className="scrollbar-hide mt-4 flex w-full gap-2 overflow-x-scroll">
                {aboutMore.map((item) => (
                  <div key={item.title}>
                    <div className="relative flex h-24 w-[45vw] flex-shrink-0 flex-col lg:w-44">
                      <Image
                        src={item.img}
                        alt=""
                        fill
                        sizes="(max-width: 1280px) 44vw, 45vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="w-full bg-gray-300 p-2">
                      <span className="text-sm font-bold uppercase">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:justify-between">
            {/* Social */}
            <div className="m-auto flex gap-2 lg:m-0">
              {socialLinks.map((link, index) => (
                <Link
                  href={link.link}
                  key={index}
                  className="rounded-full bg-black p-2 text-white"
                >
                  {link.icon}
                </Link>
              ))}
            </div>

            {/* Policy */}
            <div className="m-auto flex flex-col gap-2 text-center lg:m-0 lg:flex-row lg:gap-8">
              {policyLinks.map((link) => (
                <Link
                  href={link.toLowerCase().replace(" ", "-")}
                  key={link}
                  className="text-sm font-semibold opacity-60"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <span className="border-t py-6 text-center text-xs lg:text-base">
          &copy; 2024 | Gymshark Limited | All Rights Reserved. | We Do Gym.
        </span>
      </div>
    </>
  );
};

export default Footer;
