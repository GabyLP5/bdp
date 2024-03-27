export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "BDP",
  description:
    "Practica para mostrar peliculas de la api de TMDB",
  mainNav: [
    {
      title: "Top peliculas",
      href: "/top-peliculas?pagina=1&tipo_busqueda=vote_average",
    },
  ],
  footerNav: [
    {
      title: "TMDB",
      href: "https://www.themoviedb.org/?language=es",
    },
    {
      title: "Repo",
      href: "https://github.com/GabyLP5/bdp.git",
    },
    {
      title: "@GabyLP5",
      href: "https://github.com/GabyLP5",
    }
    ],
    links: {
    tmdb: "https://developer.themoviedb.org/",
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
    tailwind: "https://tailwindcss.com/",
    next: "https://nextjs.org",
    svg: "https://www.svgrepo.com"
  },
}
