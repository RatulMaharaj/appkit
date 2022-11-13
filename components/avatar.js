import Image from "next/image";
import React from "react";
import getFirstLetters from "../lib/getFirstLetter";

// TODO: Add ability to upload an avatar to S3 or similar

function Avatar({ name, surname, size, color, image, overlap }) {
  let css_class;
  let css_color = color ? color : `bg-gray-300`;

  if (size === `xs`) {
    css_class = `w-8 h-8 text-xs ${image ? "p-0" : "p-2"}`;
  } else if (size === `sm`) {
    css_class = `w-10 h-10 text-sm ${image ? "p-0" : "p-2"}`;
  } else if (size === `md`) {
    css_class = `w-12 h-12 text-md ${image ? "p-0" : "p-2"}`;
  } else if (size === `lg`) {
    css_class = `w-14 h-14 text-lg ${image ? "p-0" : "p-2"}`;
  } else if (size === `xl`) {
    css_class = `w-24 h-24 text-lg ${image ? "p-0" : "p-2"}`;
  }

  if (overlap) {
    css_class += ` -ml-1 `;
  }

  if (image) {
    return (
      <div
        className={`rounded-full ${css_class} text-white flex items-center justify-center uppercase object-cover`}
      >
        <Image
          src={image}
          className={`rounded-full`}
          alt="Landscape picture"
          width={500}
          height={500}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`rounded-full ${css_class} ${css_color} text-white flex items-center justify-center uppercase`}
      >
        {getFirstLetters(name) + getFirstLetters(surname)}
      </div>
    );
  }
}

export default Avatar;
