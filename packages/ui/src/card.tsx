import { type JSX } from "react";

import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className=" p-4 rounded-2xl bg-white">
      <h1 className="text-xl border-b-2 border-slate-200 pb-2 mb-2">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
