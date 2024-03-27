import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

async function getData({ idPelicula }: { idPelicula: string | string[] | undefined }){
    const url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=${process.env.API_KEY}&language=es-CL`
    const res = await fetch(url)
    if (!res.ok) {
        //throw new Error("Recoleccion de datos fallida")
        console.error(url)
        return {
            message: "Recoleccion de datos fallida",
        }
    }
    console.log(url)
    return res.json()
}

export default async function Page({searchParams}: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const idPelicula = searchParams?.idpelicula || "1"
    let data = await getData(
        { idPelicula: idPelicula }
    )
    console.log(data)
    return (
        <>
            <Card className="mx-20 mt-7">
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>
                    ID TMDB: {data.id} || ID IMDB: {data.imdb_id}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{data.overview || 'No disponible'}</p>
                <div className="my-7 flex justify-center align-middle">
                    <Image src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.title} width={500} height={750} />
                </div>
                <div className="text-center">
                    <p>Duración:            {data.runtime || 'No disponible'} minutos</p>
                    <p>Fecha de estreno:    {data.release_date || 'No disponible'}</p>
                    <p>Idioma:              {data.original_language || 'No disponible'}</p>
                    <p>Estado:              {data.status || 'No disponible'}</p>
                    <p>Popularidad:         {data.popularity || 'No disponible'}</p>
                    <p>Promedio de votos:   {data.vote_average || 'No disponible'}</p>
                    <p>Votos:               {data.vote_count || 'No disponible'}</p>
                    <p>Ganancias:           ${data.revenue || 'No disponible'}</p>
                    <p>Presupuesto:         ${data.budget || 'No disponible'}</p>
                    <p>Generos:             {data.genres.map((genre: { id: number; name: string; }) => genre.name).join(', ') || 'No disponible'}</p>
                    <p>Producción:          {data.production_companies.map((company: { id: number; name: string; }) => company.name).join(', ') || 'No disponible'}</p>
                    <p>Países:              {data.production_countries.map((country: { iso_3166_1: string; name: string; }) => country.name).join(', ') || 'No disponible'}</p>
                    <p>Video:               {data.videos?.results.map((video: { id: string; name: string; }) => video.name).join(', ') || 'No disponible'}</p>
                    <p>Colecciones:         {data.belongs_to_collection?.name || 'No disponible'}</p>
                    <p>Imagenes:</p>
                    <div className="my-7 flex justify-center space-x-4 align-middle">
                        {data.backdrop_path === null ? null :
                            <div className="relative size-64 ">
                                <a href={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} target="_blank" rel="noopener noreferrer">
                                    <Image src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} alt={data.title} layout="fill" objectFit="contain" />
                                </a>
                            </div>
                        }
                        {
                            data.belongs_to_collection === null ? null:
                            data.belongs_to_collection?.poster_path === null ? null :
                            <div className="relative size-64 ">
                                <a href={`https://image.tmdb.org/t/p/w500${data.belongs_to_collection.poster_path}`} target="_blank" rel="noopener noreferrer">
                                    <Image src={`https://image.tmdb.org/t/p/w500${data.belongs_to_collection.poster_path}`} alt={data.title} layout="fill" objectFit="contain" />
                                </a>
                            </div>
                        }
                        {
                            data.belongs_to_collection === null ? null:
                            data.belongs_to_collection?.backdrop_path === null ? null :
                            <div className="relative size-64 ">
                                <a href={`https://image.tmdb.org/t/p/w500${data.belongs_to_collection.backdrop_path}`} target="_blank" rel="noopener noreferrer">
                                    <Image src={`https://image.tmdb.org/t/p/w500${data.belongs_to_collection.backdrop_path}`} alt={data.title} layout="fill" objectFit="contain" />
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </CardContent>
            </Card>
        </>
    )
}