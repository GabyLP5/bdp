import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PaginatorControlTopPeliculas from "@/components/paginator-control-top-peliculas"

async function getData(
  { pagina }: { pagina: string | string[] | undefined },
  { tipo_busqueda }: { tipo_busqueda: string | string[] | undefined }
) {
  let url
  url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-CL&sort_by=vote_average.desc&page=${pagina}`
  if (tipo_busqueda === "popular") {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=es-CL&page=${pagina}&sort_by=popularity.desc`
  } else if (tipo_busqueda === "vote_count") {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=es-CL&page=${pagina}&sort_by=vote_count.desc`
  }
  const res = await fetch(url)
  console.log(url)
  if (!res.ok) {
    //throw new Error("Recoleccion de datos fallida")
    console.error(url)
    return {
      total_pages: 0,
      message: "Recoleccion de datos fallida",
    }
  }
  console.log(url)
  return res.json()
}

export default async function Page({searchParams}: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  let data = await getData(
    { pagina: searchParams?.pagina || "1" },
    { tipo_busqueda: searchParams?.tipo_busqueda || "top_rated" }
  )

  if (data?.total_pages > 500) { //la api si bien puede decir que hay mas de 500 paginas, al momento de solicitarlas solo entrega 500
    data.total_pages = 500
  }
  const pagina = searchParams?.pagina || "1"
  const tipo_busqueda = searchParams?.tipo_busqueda || "top_rated"
  const TABLE_HEADERS = [
    "ID",
    "Idioma",
    "Titulo",
    "Descripción",
    "Popularidad",
    "Promedio de votos",
    "Votos",
  ]

  if (data.total_pages == 0) {
    return (
      <>
        <h1 className="m-7  text-center text-4xl text-destructive">
          {data.message}
        </h1>
        <p className="text-center transition hover:text-green-800">
          <a href="/">Volver</a>
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="m-7 cursor-default text-center text-4xl">Top peliculas</h1>

      {/* Tabla */}
      <div className="mx-6 sm:mx-20">
        <Table>
          <TableCaption>
            Pagina {pagina} de {data.total_pages}
          </TableCaption>
          <TableHeader>
            <TableRow>
              {TABLE_HEADERS.map((header) =>
                header == "Titulo" ? (
                  <TableHead
                    key={header}
                    className="cursor-default text-primary transition hover:scale-105 hover:animate-pulse"
                  >
                    {header}
                  </TableHead>
                ) :
                header == "Popularidad" ? (
                  <TableHead
                    key={header}
                    className={
                      tipo_busqueda === "popular"
                        ? "text-green-500 "
                        : "text-accent" +
                          `cursor-pointer transition hover:animate-pulse hover:scale-105`
                    }
                  >
                    <a
                      href={`/top-peliculas?pagina=1&tipo_busqueda=popular`}
                    >
                      {header}*
                    </a>
                  </TableHead>
                ) : header == "Promedio de votos" ? (
                  <TableHead
                    key={header}
                    className={
                      tipo_busqueda === "vote_average"
                        ? "text-green-500"
                        : "text-accent" +
                          `cursor-pointer text-primary transition hover:animate-pulse hover:scale-105`
                    }
                  >
                    <a
                      href={`/top-peliculas?pagina=1&tipo_busqueda=vote_average`}
                    >
                      {header}*
                    </a>
                  </TableHead>
                ) : header == "Votos" ? (
                  <TableHead
                    key={header}
                    className={
                      tipo_busqueda === "vote_count"
                        ? "text-green-500"
                        : "text-accent" +
                          `cursor-pointer text-primary transition hover:animate-pulse hover:scale-105`
                    }
                  >
                    <a
                      href={`/top-peliculas?pagina=1&tipo_busqueda=vote_count`}
                    >
                      {header}*
                    </a>
                  </TableHead>
                ) : (
                  <TableHead className="cursor-default" key={header}>
                    {header}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((movie: any) => (
              <TableRow key={movie.id}>
                <TableCell className="w-[100px]">{movie.id}</TableCell>
                <TableCell>{movie.original_language}</TableCell>
                <TableCell className="transition hover:scale-105 hover:animate-pulse"><a href={`/pelicula?idpelicula=${movie.id}`}>{movie.title}</a></TableCell>
                <TableCell>
                  {movie.overview == "" ? "Sin descripción" : movie.overview}
                </TableCell>
                <TableCell>{movie.popularity}</TableCell>
                <TableCell>{movie.vote_average}</TableCell>
                <TableCell>{movie.vote_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginador */}
      <PaginatorControlTopPeliculas
        pagina={Number(pagina)}
        total_pages={Number(data.total_pages)}
        tipo_busqueda={tipo_busqueda.toString()}/>
    </>
  )
}
