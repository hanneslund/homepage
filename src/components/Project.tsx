import { ReactNode } from "react";

type Props = {
  name: ReactNode;
  children: ReactNode;
  href: string;
  langs: ReactNode;
};

function Project({ name, children, href, langs }: Props) {
  return (
    <>
      <a
        href={href}
        className="border hover:border-gray-500 flex flex-col justify-between duration-300 transition-colors"
        target="_blank"
        rel="noreferrer"
      >
        <div className="p-4">
          <h3 className="font-medium text-sm">{name}</h3>
          <p className="text-gray-400 text-sm mt-2">{children}</p>
        </div>
        <div className="p-4 text-xs border-t border-gray-800 flex gap-5">
          {langs}
        </div>
      </a>
      <style jsx>{`
        a {
          border-color: #404040;
        }
        h3 {
          color: #fafafa;
        }
      `}</style>
    </>
  );
}

export default Project;
