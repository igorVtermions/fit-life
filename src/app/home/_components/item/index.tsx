import React from "react";

export default function Item() {
  return (
    <li className="rounded-sm py-1 pl-1 hover:bg-zinc-800">
      <span>{} - </span>
      {}
    </li>
  );
}
