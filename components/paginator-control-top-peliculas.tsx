import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
export default function PaginatorControlTopPeliculas({ pagina, total_pages, tipo_busqueda }: { pagina: number , total_pages: number, tipo_busqueda: string }) {
    return(
        <>
      {/* Control de paginación */}
      <Pagination className="my-7">
        <PaginationContent>
          {/* Boton Atras */}
          {
            pagina === 1 ? null : (
              <PaginationItem>
                <PaginationPrevious
                  href={`/top-peliculas?pagina=${pagina - 1}`}
                />
              </PaginationItem>
            )
          }

          {pagina < 4 ? null : (
            <>
              <PaginationItem className="hidden sm:block">
                <PaginationLink href={`/top-peliculas?pagina=1&tipo_busqueda=${tipo_busqueda}`}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationEllipsis className="hidden sm:flex"/>
            </>
          )}

          {/* 5 numeros de paginación, el primero debe ser el actual, y el resto son los siguientes en una tolerancia de 2. */}
          {[...Array(total_pages)].map((_, i) => {
            const numeroPagina = i + 1 // Actual
            if (
              numeroPagina >= pagina - 2 && // 2 menos que el actual
              numeroPagina <= pagina + 2 // 2 mas que el actual
            ) {
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    href={`/top-peliculas?pagina=${numeroPagina}&tipo_busqueda=${tipo_busqueda}`}
                    className={
                      numeroPagina === pagina ? "bg-accent" : ""
                    }
                  >
                    {numeroPagina}
                  </PaginationLink>
                </PaginationItem>
              )
            }
          })}

          {pagina > total_pages - 3 ? null : (
            <>
              <PaginationEllipsis className="hidden sm:flex" />
              <PaginationItem className="hidden sm:block">
                <PaginationLink
                  href={`/top-peliculas?pagina=${total_pages}&tipo_busqueda=${tipo_busqueda}`}
                >
                  {total_pages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          {/* Boton siguiente */}
          {
            pagina === total_pages ? null : (
              <PaginationItem>
                <PaginationNext
                  href={`/top-peliculas?pagina=${pagina + 1}&tipo_busqueda=${tipo_busqueda}`}
                />
              </PaginationItem>
            )
          }
        </PaginationContent>
      </Pagination>
      </>
    )
}