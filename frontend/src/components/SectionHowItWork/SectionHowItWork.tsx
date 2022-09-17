import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import HIW1img from "images/HIW1img.png";
import HIW2img from "images/HIW2img.png";
import HIW3img from "images/HIW3img.png";
import HIW4img from "images/HIW4img.png";
import VectorImg from "images/VectorHIW.svg";
import Badge from "shared/Badge/Badge";
import Heading from "components/Heading/Heading";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "Identify your item",
    desc: "Surf the internet and find the items that suit you best.",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "Purchase credits",
    desc: "Depending on our offers, choose the best for you.",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "Legit-check now",
    desc: "After buying credits, it's time to send the « legit check now",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "Get results",
    desc: "After posting our answer according to the delays you have purchased",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-SectionHowItWork  ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <Heading>HOW IT WORKS</Heading>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <img
          className="hidden md:block absolute inset-x-0 -top-1"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-5 sm:mb-10 lg:mb-20 max-w-[200px] mx-auto"
              src={item.img}
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`Step ${index + 1}`}
                color={
                  !index
                    ? "blue"
                    : index === 1
                    ? "pink"
                    : index === 2
                    ? "yellow"
                    : "green"
                }
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <span className="block text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;