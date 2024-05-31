import { FormEvent, useEffect, useState } from "react"
import { db } from "@/services/firebase-connection"
import {
    doc,
    setDoc,
    getDoc
} from "firebase/firestore"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Loader } from "lucide-react"

export function Social() {
    const [loading, setLoading] = useState(false)

    const [github, setGithub] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")

    const [avatar, setAvatar] = useState("")
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

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

    useEffect(() => {
        function loadProfile() {
            const docRef = doc(db, "social", "profile")

            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setAvatar(snapshot.data()?.avatar)
                        setName(snapshot.data()?.name)
                        setTitle(snapshot.data()?.title)
                        setDescription(snapshot.data()?.description)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        loadProfile()
    }, [])

    function handleRegisterLinks(e: FormEvent) {
        e.preventDefault()

        setLoading(true)

        setDoc(doc(db, "social", "link"), {
            github: github,
            instagram: instagram,
            linkedin: linkedin
        })
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    function handleRegisterProfile(e: FormEvent) {
        e.preventDefault()
        setLoading(true)

        setDoc(doc(db, "social", "profile"), {
            avatar: avatar,
            name: name,
            title: title,
            description: description
        })
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })

    }

    return (
        <div className="px-10 flex flex-col justify-center items-center">
            <Accordion type="single" collapsible className="w-full max-w-xl ">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h1 className="text-2xl font-medium">Editar perfil</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <form className="flex flex-col mt-2 w-full max-w-xl mb-8" onSubmit={handleRegisterProfile}>
                            <Label className="mt-4 mb-2">URL do Avatar</Label>
                            <Input
                                placeholder="Digite a URL do Avatar"
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />

                            <Label className="mt-4 mb-2">Nome</Label>
                            <Input
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <Label className="mt-4 mb-2">Titulo (Profissão)</Label>
                            <Input
                                placeholder="Digite seu titulo"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <Label className="mt-4 mb-2">Bio</Label>
                            <Textarea
                                placeholder="Digite sua bio"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <Button variant="secondary" type="submit" disabled={loading ? true : false} className="mt-4">
                                {loading ? <Loader className="animate-spin" /> : "Salvar Perfil"}
                            </Button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <h1 className="text-2xl font-medium">Minhas redes sociais</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <form className="flex flex-col mt-2 mb-2 w-full max-w-xl" onSubmit={handleRegisterLinks}>
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

                            <Button variant="secondary" type="submit" disabled={loading ? true : false} className="mt-4">
                                {loading ? <Loader className="animate-spin" /> : "Salvar Links"}
                            </Button>
                        </form>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
