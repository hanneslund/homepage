import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
};

export default function A({ href, children }: Props) {
  return (
    <a
      href={href}
      className="pb-px border-b hover:border-gray-400 hover:text-gray-50 transition-colors hover:duration-300"
      target="_blank"
      rel="noreferrer"
    >
      {children}
      <style jsx>{`
        a {
          color: rgb(212, 212, 212);
          border-color: #404040;
        }
      `}</style>
    </a>
  );
}
