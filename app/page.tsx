import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-xs sm:max-w-2xl flex-col items-start gap-2">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Pagina hecha con propositos <br className="hidden" />
          educacionales para consumir Recursos de TMDB.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Los recursos utilizados para el desarrollo de la página son
        </p>
        <ul> 
            <li>Shad UI</li>
            <li>TMBD Api</li>
            <li>Tailwind CSS</li>
            <li>Next.js</li>
            <li>SVG Repo</li>
          </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:flex">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.tmdb}
          className={buttonVariants()}
        >
          TMBD Api
        </Link>
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          Shad UI
        </Link>
        <Link
          href={siteConfig.links.tailwind}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          Tailwind CSS
        </Link>
        <Link
          href={siteConfig.links.next}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          Next.js
        </Link>
        <Link
          href={siteConfig.links.svg}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: "outline" })}
        >
          SVG Repo
        </Link>
      </div>
    </section>
  )
}
