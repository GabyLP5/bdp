import { siteConfig } from "@/config/site"
import { FooterItems } from "@/types/nav"

interface FooterProps {
    links: FooterItems[]
}

export default function Footer({links}: FooterProps){
    return(
        <>
            <footer className="py-4 text-center">
                <ul className="flex justify-center gap-4">
                    {siteConfig.footerNav.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="text-sm text-muted-foreground transition-colors hover:text-primary "
                            >
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </footer>
        </>
    )
}