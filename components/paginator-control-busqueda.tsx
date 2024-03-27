import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
export default function PaginatorControlBusqueda({ pagina, total_pages ,busqueda}: { pagina: number , total_pages: number, busqueda: string}) {
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
                  href={`/busqueda?query=${busqueda}&pagina=${pagina - 1}`}
                />
              </PaginationItem>
            )
          }

          {pagina < 4 ? null : (
            <>
              <PaginationItem>
                <PaginationLink href={`/busqueda?query=${busqueda}&pagina=1`}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationEllipsis />
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
                    href={`/busqueda?query=${busqueda}&pagina=${numeroPagina}`}
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
              <PaginationEllipsis />
              <PaginationItem>
                <PaginationLink
                  href={`/busqueda?query=${busqueda}&pagina=${total_pages}`}
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
                  href={`/busqueda?query=${busqueda}&pagina=${pagina + 1}`}
                />
              </PaginationItem>
            )
          }
        </PaginationContent>
      </Pagination>
      </>
    )
}