import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export default function A({ href, children }: Props) {
  return (
    <a
      href={href}
      className="pb-px border-b hover:border-gray-300 hover:text-gray-200 transition-colors hover:duration-300"
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <style jsx>{`
        a {
          color: rgb(163, 163, 163);
          border-color: rgb(115, 115, 115);
        }
      `}</style>
    </a>
  );
}
