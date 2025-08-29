import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface FeaturedCardProps {
  imageurl: string;
  title: string;
  buttonText: string;
  link: string;
}

export default function FeaturedCard({
  imageurl,
  title,
  buttonText,
  link,
}: FeaturedCardProps) {
  return (
    <Link
      href={link}
      className="relative flex w-full rounded-2xl bg-orange-500 p-4"
    >
      <picture className="w-[160px]">
        <Image
          src={imageurl}
          alt="Featured Card Image"
          width={170}
          height={170}
          className="absolute bottom-0 -left-8"
        />
      </picture>
      <div className="flex flex-col justify-end gap-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <Button className="text-md font-bold">{buttonText}</Button>
      </div>
    </Link>
  );
}
