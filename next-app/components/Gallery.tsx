import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import { urlFor } from "@/lib/sanity";

const LAYOUT = [
  { col: "md:col-span-2", row: "lg:row-span-3" },
  { col: "md:col-span-2", row: "lg:row-span-2" },
  {},
  {},
  { col: "md:col-span-2", row: "lg:row-span-1" },
  { col: "md:col-span-2", row: "lg:row-span-3" },
  { col: "md:col-span-2", row: "lg:row-span-2" },
  { col: "md:col-span-1" },
  { col: "md:col-span-2", row: "lg:row-span-3" },
];
const items = [
  {
    _key: "1",
    _type: "textBlock",
    text: "Text Block 1",
  },
  {
    _key: "2",
    _type: "textBlock",
    text: "Text Block 2",
  },
  {
    _key: "3",
    _type: "textBlock",
    text: "Text Block 3",
  },
  {
    _key: "4",
    _type: "textBlock",
    text: "Text Block 4",
  },
  {
    _key: "5",
    _type: "textBlock",
    text: "Text Block 5",
  },
  {
    _key: "6",
    _type: "textBlock",
    text: "Text Block 6",
  },
  {
    _key: "7",
    _type: "textBlock",
    text: "Text Block 7",
  },
  {
    _key: "8",
    _type: "textBlock",
    text: "Text Block 8",
  },
  {
    _key: "9",
    _type: "textBlock",
    text: "Text Block 9",
  },
];
const Gallery = () => {
  return (
    <section className="section-spacing">
      <div className="container">
        <div className="section_title pb-3">
          <h2 className="font-heading">
            Maui <span className="text-tertiary">Gallery</span>
          </h2>
        </div>
        <div className="border-t pt-3 border-background-gray">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, index) => {
              const layout = LAYOUT[index] ?? {};

              return (
                <div
                  key={item._key}
                  className={`${layout.col ?? ""} ${layout.row ?? ""}`}>
                  {item._type === "textBlock" && (
                    <div className="flex items-center justify-center h-full">
                      <h3 className="text-center text-orange-600 italic font-serif text-xl whitespace-pre-line">
                        {item.text}
                      </h3>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 md:mt-14 flex justify-center">
          <AnimatedButton text="Explore Gallery" href="/subscribe" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
