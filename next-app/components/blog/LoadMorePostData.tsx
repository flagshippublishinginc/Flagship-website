"use client";

import RichTextContent from "./RichTextContent";
import SingleImage from "./SingleImage";
import TwoColumnTextWithImage from "./TwoColumnTextWithImage";
import { useState } from "react";

const LoadMorePostData = ({ content }: { content: any[] }) => {
  const [showContent, setShowContent] = useState(false);

  if (showContent === false) {
    return (
      <>
        <div className="flex justify-center py-3">
          <button
            className="cursor-pointer border border-tertiary py-3 px-7 font-semibold"
            onClick={() => setShowContent(true)}>
            Load More
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="prose-h2:text-tertiary prose-h2:m-0 prose-h2:mb-2 prose-h2:text-[20px] prose-h2:lg:text-[32px]">
      {content.map((module: any, index: number) => {
        switch (module._type) {
          case "richTextModule":
            return <RichTextContent key={index} {...module} />;
          case "singleImageModule":
            return <SingleImage key={index} {...module} />;
          case "twoColumnTextWithImage":
            return <TwoColumnTextWithImage key={index} {...module} />;
        }
      })}
    </div>
  );
};

export default LoadMorePostData;
