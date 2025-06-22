import React from "react";

export default function Card() {
  return (
    <div className="min-w-[340px] rounded-sm bg-zinc-900 p-2.5">
      <h2 className="text-xl font-bold uppercase">{}</h2>
      <ul className="flex flex-col gap-4">{}</ul>
    </div>
  );
}
