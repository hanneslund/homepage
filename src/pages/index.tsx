import type { NextPage, PageConfig } from "next";
import Container from "../components/Container";
import Project from "../components/Project";
import A from "../components/A";

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

const Home: NextPage = () => {
  return (
    <Container className="px-6 leading-relaxed py-16 md:py-20 antialiased">
      <main>
        <h1 className="font-semibold">Hannes Bornö</h1>
        <p className="text-gray-400 mt-5">
          Frontend developer from Sweden. Building stuff for the web. Into
          TypeScript, Next.js and Tailwind.
        </p>
        <p className="text-gray-400 mt-5">
          Currently enjoying Rust by working on{" "}
          <A href="https://emergentcss.vercel.app/">emergentcss</A>.
        </p>

        <h2 className="mt-14 md:mt-14 font-semibold">Contact</h2>
        <div className="text-gray-400 mt-3 flex">
          <p className="w-32">Email</p>
          <div>
            <A href="mailto:borno.hannes@gmail.com">borno.hannes@gmail.com</A>
          </div>
        </div>
        <div className="text-gray-400 mt-2 flex">
          <p className="w-32">Github</p>
          <div>
            <A href="https://github.com/hanneslund">hanneslund</A>
          </div>
        </div>

        <h2 className="mt-14 md:mt-14 font-semibold">Projects</h2>
        <div className="gap-6 md:gap-8 mt-6 grid grid-cols-1 md:grid-cols-2 justify-items-stretch">
          <Project
            href="https://github.com/hanneslund/emergentcss"
            name="emergentcss"
            langs={<span className="text-red-400">Rust</span>}
          >
            A compiler that generates CSS.
          </Project>
          <Project
            href="https://github.com/hanneslund/homepage"
            name="borno.me"
            langs={
              <>
                <span className="text-gray-50">Next.js</span>
                <span className="text-[#38bdf8]">Tailwind</span>
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
                <span className="text-[#38bdf8]">Tailwind</span>
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
