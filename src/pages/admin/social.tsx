import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { db } from "@/services/firebase-connection"
import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore"
import { FormEvent, useEffect, useState } from "react"

export function Social() {
    const [github, setGithub] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setGithub(snapshot.data()?.github)
                        setInstagram(snapshot.data()?.instagram)
                        setLinkedin(snapshot.data()?.linkedin)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        loadLinks()
    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault()

        setDoc(doc(db, "social", "link"), {
            github: github,
            instagram: instagram,
            linkedin: linkedin
        })
            .then(() => {

            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="px-10 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-medium">Minhas redes sociais</h1>

            <form className="flex flex-col mt-2 mb-2 w-full max-w-xl" onSubmit={handleRegister}>
                <Label className="mt-4 mb-2">Link do GitHub</Label>
                <Input
                    placeholder="Digite a URL do link"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                />

                <Label className="mt-4 mb-2">Link do Instagram</Label>
                <Input
                    placeholder="Digite a URL do link"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <Label className="mt-4 mb-2">Link do LinkedIn</Label>
                <Input
                    placeholder="Digite a URL do link"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                />

                <Button variant="secondary" type="submit" className="mt-4">Salvar Links</Button>
            </form>
        </div>
    )
}
