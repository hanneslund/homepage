import type { NextPage, PageConfig } from "next";
import Container from "../components/Container";
import Project from "../components/Project";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

const Home: NextPage = () => {
  return (
    <Container className="px-6 leading-relaxed py-14 md:py-20 antialiased">
      <main>
        <h1 className="font-bold">Hannes Bornö</h1>
        <p className="text-gray-300 mt-3">
          Frontend developer from Sweden. Building stuff for the web. Into
          TypeScript, Next.js and Tailwind.
        </p>
        <h2 className="mt-12 md:mt-14 font-semibold">Contact</h2>
        <div className="text-gray-300 mt-3 flex">
          <p className="w-32">Email</p>
          <a
            href="mailto:borno.hannes@gmail.com"
            className="h-6 border-b hover:border-gray-400 hover:text-gray-200 transition-colors hover:duration-300"
          >
            borno.hannes@gmail.com
          </a>
          <style jsx>{`
            a {
              color: rgb(212, 212, 212);
              border-color: #404040;
            }
          `}</style>
        </div>
        <div className="text-gray-300 mt-2 flex">
          <p className="w-32">Github</p>
          <a
            href="https://github.com/hanneslund"
            className="h-6 border-b hover:border-gray-400 hover:text-gray-200 transition-colors hover:duration-300"
            target="_blank"
            rel="noreferrer"
          >
            hanneslund
          </a>
          <style jsx>{`
            a {
              color: rgb(212, 212, 212);
              border-color: #404040;
            }
          `}</style>
        </div>

        <h2 className="mt-12 md:mt-14 font-semibold">Projects</h2>
        <div className="gap-5 md:gap-8 mt-6 grid grid-cols-1 md:grid-cols-2 justify-items-stretch">
          <Project
            href="https://github.com/hanneslund/homepage"
            name="borno.me"
            langs={
              <>
                <span className="text-gray-50">Next.js</span>
                <span className="text-[#06B6D4]">Tailwind</span>
              </>
            }
          >
            This page.
          </Project>
          <Project
            href="https://github.com/hanneslund/pizzadeg"
            name="Pizzadeg"
            langs={
              <>
                <span className="text-gray-50">Next.js</span>
                <span className="text-[#06B6D4]">Tailwind</span>
                <span className="text-[#3fcf8e]">Supabase</span>
              </>
            }
          >
            Website I use to track my pizza doughs.
          </Project>
          <Project
            href="https://github.com/hanneslund/myjam"
            name="myjam"
            langs={<span className="text-[#5c95d6]">TypeScript</span>}
          >
            Ever wanted to try something like Next.js, but worse? Well, then you
            {"'"}re in luck!
          </Project>
          <Project
            href="https://github.com/hanneslund/rolly-froggy"
            name="Rolly Froggy"
            langs={<span className="text-[#1193d7]">Elm</span>}
          >
            Flappy Bird inspired game. Instead of a bird you{"'"}re a rolling
            frog.
          </Project>
          <Project
            href="https://github.com/hanneslund/elm-dodgeball"
            name="Elm Dodgeball"
            langs={<span className="text-[#1193d7]">Elm</span>}
          >
            Help the ball escape from the squares.
          </Project>
        </div>
      </main>
    </Container>
  );
};

export default Home;
