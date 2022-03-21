//React import
import { FunctionComponent } from "react";

//NextJS import
import Image from "next/image";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number | string;
  height: number | string;
  layout: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
}

const CustomImage: FunctionComponent<CustomImageProps> = ({
  src,
  className,
  width,
  height,
  alt,
  layout ,
}) => {
  return (
    <Image
      src={`/api/imageproxy?url=${src}`}
      className={className}
      width={width}
      height={height}
      unoptimized
      alt={alt}
      layout={layout}
    />
  );
};

export default CustomImage;
