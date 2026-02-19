"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoInstagramAlt } from "react-icons/bi";

interface SocialShareProps {
  url: string;
}

const socialIconsClass: string =
  "cursor-pointer hover:text-tertiary transition-colors duration-300";

export default function SocialShare({ url }: SocialShareProps) {
  const [encodedUrl, setEncodedUrl] = useState("");

  useEffect(() => {
    const currentDomain = window.location.origin;

    const fullUrl = `${currentDomain}${url}`;

    setEncodedUrl(encodeURIComponent(fullUrl));
  }, [url]);

  const shareTo = (platform: string) => {
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "instagram":
        navigator.clipboard
          .writeText(url)
          .then(() => {
            alert(
              "Link copied to clipboard!\n\n" +
                "To share on Instagram:\n" +
                "1. Open the Instagram app\n" +
                "2. Create a new post or story\n" +
                "3. Paste the link into the caption or use the Link sticker (for stories)\n\n" +
                "Tip: For stories, add a 'Link' sticker and paste the URL there.",
            );
          })
          .catch((err) => {
            console.error("Clipboard copy failed:", err);
            alert(
              "Couldn't copy automatically. Please copy this link manually: " +
                url,
            );
          });

        window.open(
          "https://www.instagram.com/",
          "_blank",
          "noopener,noreferrer",
        );
        return;
      default:
        return;
    }
    window.open(shareUrl, `${platform}-share`, "width=600,height=700");
  };

  return (
    <div className="pt-6 lg:pt-14">
      <span className="text-sm font-medium text-tertiary">Share:</span>

      <div className="flex items-center gap-3 pt-2">
        <button
          className={socialIconsClass}
          onClick={() => shareTo("facebook")}
          aria-label="Share on Facebook">
          <FaFacebookF size={18} />
        </button>

        <button
          className={socialIconsClass}
          onClick={() => shareTo("twitter")}
          aria-label="Share on X (Twitter)">
          <BsTwitterX size={18} />
        </button>

        <button
          className={socialIconsClass}
          onClick={() => shareTo("linkedin")}
          aria-label="Share on LinkedIn">
          <FaLinkedinIn size={20} />
        </button>

        <button
          className={socialIconsClass}
          onClick={() => shareTo("instagram")}
          aria-label="Share on Instagram">
          <BiLogoInstagramAlt size={22} />
        </button>
      </div>
    </div>
  );
}
