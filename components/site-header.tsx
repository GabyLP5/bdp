"use client"
import { useState } from 'react';

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteHeader() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event:any) => {
    event.preventDefault();
    if (searchText.trim() !== '') {
      window.location.href = `/busqueda?query=${encodeURIComponent(searchText)}&pagina=1`;
    } else {
      alert('El campo de búsqueda no puede estar vacío.');
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="grid grid-rows-2 gap-2 container items-center space-x-4 sm:flex sm:h-16 sm:justify-between sm:space-x-0 ">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4 mb-2">
        <div className="flex items-center space-x-2">
          <Input type="search" placeholder="Nombre pelicula" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <Button onClick={searchText != '' ? handleSearch : undefined}>Buscar</Button>
        </div>
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}