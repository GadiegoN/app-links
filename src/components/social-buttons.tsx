import { ReactNode } from "react"

interface SocialButtonProps {
    url: string
    children: ReactNode
}

export function SocialButton({ children, url }: SocialButtonProps) {
    return (
        <a target="_blank" href={url} rel="noreferrer noopener">
            {children}
        </a>
    )
}