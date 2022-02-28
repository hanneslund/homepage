import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export default function A({ href, children }: Props) {
  return (
    <a
      href={href}
      className="border-b border-neutral-500 pb-px transition-colors hover:border-neutral-300 hover:text-neutral-200 hover:duration-300"
    >
      {children}
    </a>
  );
}
