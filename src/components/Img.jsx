import clsx from "clsx";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Img = ({ src, alt, className = "", ...rest }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={twMerge(clsx(`w-full h-fit ${className}`))}
      {...rest}
    />
  );
};

export default Img;
