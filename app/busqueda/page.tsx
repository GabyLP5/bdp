import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PaginatorControlBusqueda from "@/components/paginator-control-busqueda"

async function getData(
  { query }: { query: string | string[] | undefined },
  { pagina }: { pagina: string | string[] | undefined }
) {
  // https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=API_KEY
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.API_KEY}&language=es-CL&page=${pagina}`
  const res = await fetch(url)
  console.log(url);
  if (!res.ok) {
    //throw new Error("Recoleccion de datos fallida")
    console.error(url)
    return {
      total_pages: 0,
      message: "Recoleccion de datos fallida",
    }
  }
  const jsonData = await res.json();
  if (jsonData.total_pages == 0) {
    return {
      total_pages: 0,
      message: "No se encontraron resultados",
    };
  }
  return jsonData;
}

export default async function Page({searchParams: query,}: {params: { slug: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {
  const data = await getData({ query: query?.query || "" }, { pagina: query?.pagina || "1"})
  const busqueda = query?.query || ""
  const pagina = query?.pagina || "1"
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
      <h1 className="m-7 cursor-default text-center text-4xl">Busqueda</h1>


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
               (
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
      <PaginatorControlBusqueda
        pagina={Number(pagina)}
        total_pages={data.total_pages}
        busqueda={busqueda.toString()}/>
    </>
  )
}
