import { usePathname } from "next/navigation";
import React from "react";

const FOOTER_INFORMATION = [
  {
    title: "Workout Clothes & Gym Clothes",
    content:
      "Workout Clothes designed to help you become your personal best. Because when it comes to performing at your max, there should be no obstacles – least of all your workout clothes. \nFunctional and comfortable, we create workout clothing you'll sweat in. Since 2012, we've designed and created the workout clothes we want to wear, because training and its people are what we know best.",
  },
  {
    title: "Gym Clothes built in the weight room",
    content:
      "Our legacy was built in the weight room. Gymshark was founded with a love for training and that passion continues into all our gym clothes today. You'll find the latest innovation in gym clothing and accessories to help you perform at your best and recover in style. \nOur Men's Workout Clothes feature sweat wicking workout shirts and tank tops, gym shorts, sweatpants and more. Whilst our Women's Workout Clothes are designed for a range of movements and feature sophisticated seamless technology, clever contouring and durable, quick-dry sweat wicking fabrics on leggings, sports bras and more. \nAn obsession with lifting is what started this brand, and we haven't forgotten our roots. Our Women's and Men's Bodybuilding clothes feature classic styles, with modern cuts and innovative fabrics to help you raise the bar.",
  },
  {
    title: "Activewear & Athleisure",
    content:
      "We create the tools that help everyone become their personal best – no matter the sport. Our range of Activewear is designed to give you the support you need to perform at your best, whether that's on the track, on the gym floor or in the studio. \nWhilst our men's and women's athleisure elevates your workouts with the most comfortable gym hoodies, the most supportive gym leggings and the most innovatively designed workout shirts that are made to move when it matters most.",
  },
  {
    title: "More than your best workout clothing",
    content:
      "The Gymshark community is devoted to unlocking potential through conditioning and the things we do today to prepare for tomorrow. It's every setback, step-up and milestone along the way. Game-changing workout clothing, running clothes and loungewear essentials. It's not just in the designs, it's in the people who wear them.",
  },
];

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
