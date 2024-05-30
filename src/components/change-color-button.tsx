import { ButtonColor } from "@/components/ui/button-color"
import { ChangeEvent, useEffect, useState } from "react"

export function ChangeColorButton() {
    const [buttonColor, setButtonColor] = useState('')

    useEffect(() => {
        const savedColorButton = localStorage.getItem('buttonColor')

        if (savedColorButton) {
            setButtonColor(savedColorButton)
        }
    }, [])

    const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value
        setButtonColor(newColor)
        localStorage.setItem('buttonColor', newColor)
    }

    return (
        <>
            <input type="color" name="buttonColor" id="buttonColor" value={buttonColor} onChange={handleColorChange} />
            <ButtonColor color={buttonColor} onClick={() => window.location.reload()}>Alterar cor</ButtonColor>
        </>
    )
}
