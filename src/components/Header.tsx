import Link from "next/link"
import { MdMonitor } from "react-icons/md/index.js"
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5/index.js"

const Header = () => {
  return (
    <header className="w-full p-2">
      <div className="mx-auto max-w-5xl border-b-2 pb-3 border-slate-200">
        <nav className="px-2 text-base flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold font-mplus text-xl tracking-tight p-2"
          >
            <MdMonitor size={22} /> Generate Intro
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/Mel28vin/generate-intro"
              className="inline-flex gap-1 no-underline text-md items-center active:underline active:font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              <IoLogoGithub size={22} />
              <div className="hidden sm:block">Source</div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/melvin-jebasamuel/"
              className="inline-flex gap-1 no-underline text-md items-center active:underline active:font-semibold"
              target="_blank"
              rel="noreferrer"
            >
              <IoLogoLinkedin size={22} />{" "}
              <div className="hidden sm:block">About me</div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
