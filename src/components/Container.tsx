import { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={clsx("container mx-auto max-w-[700px]", className)}>
      {children}
    </div>
  );
}
