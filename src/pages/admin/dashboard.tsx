import { FormEvent, useEffect, useState } from "react";
import { db } from "@/services/firebase-connection";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from "firebase/firestore"
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Trash } from "lucide-react";

interface LinksProps {
    id: string
    name: string
    url: string
    bg: string
    color: string
}

export function Dashboard() {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#1f1f1f")

    const [links, setLinks] = useState<LinksProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let list = [] as LinksProps[]

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                })
            })

            setLinks(list)
        })

        return () => {
            unsub()
        }

    }, [])

    function clearFields() {
        setNameInput("")
        setUrlInput("")
        setTextColorInput("#f1f1f1")
        setBackgroundColorInput("#1f1f1f")
    }

    function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (nameInput === "" || urlInput === "") {
            toast.info("Preencha todos os campos.")
            return
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: textColorInput,
            created: new Date()
        }).then(() => {
            clearFields()
            toast("Link adicionado com sucesso!")
        }).catch(() => {
            toast.error("Erro ao adicionar link!")
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)

        await deleteDoc(docRef)

        toast.error("Link removido com sucesso!")
    }

    return (
        <div className="px-10 flex flex-col justify-center items-center">

            <form className="flex flex-col mt-2 mb-2 w-full max-w-xl" onSubmit={handleRegister}>
                <Label className="mt-4 mb-2">Nome do link</Label>
                <Input
                    placeholder="Digite o nome do link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <Label className="mt-4 mb-2">URL do link</Label>
                <Input
                    type="url"
                    placeholder="Digite a URL"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <div className="flex gap-4 my-4">
                    <div className="flex flex-col justify-center items-center">
                        <Label className="mt-4 mb-2">Cor do texto</Label>
                        <Input
                            type="color"
                            placeholder="Digite a URL"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                        <Input value={textColorInput} onChange={(e) => setTextColorInput(e.target.value)} />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Label className="mt-4 mb-2">Cor do botão</Label>
                        <Input
                            type="color"
                            placeholder="Digite a URL"
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                        />
                        <Input value={backgroundColorInput} onChange={(e) => setBackgroundColorInput(e.target.value)} />
                    </div>
                </div>

                {
                    nameInput === "" && urlInput === ""
                        ? <></>
                        : <div className="flex flex-col mb-4 p-1 items-center justify-center border border-gray-100/25 rounded-lg">
                            <Label className="mt-4 mb-2">Veja como está ficando</Label>
                            <article
                                className="w-11/12 max-w-xl flex flex-col items-center justify-between rounded-lg px-1 py-3 cursor-pointer"
                                style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput, color: textColorInput }}
                            >
                                <p className="font-medium">{!nameInput ? "Nome exemplo" : nameInput}</p>
                            </article>
                        </div>
                }

                <Button type="submit">
                    Cadastrar
                </Button>
            </form>

            <h2 className="mt-8 font-bold mb-4 text-2xl">Meus Links</h2>

            {
                links.map((data) => (
                    <article
                        key={data.id}
                        className="w-11/12 max-w-xl flex items-center justify-between rounded-lg px-1 py-3 cursor-pointer select-none"
                        style={{ marginBottom: 8, marginTop: 8, backgroundColor: data.bg, color: data.color }}
                    >
                        <p className="font-medium">{data.name}</p>
                        <div>
                            <Button size="icon" variant="secondary" onClick={() => handleDeleteLink(data.id)}><Trash /></Button>
                        </div>
                    </article>
                ))
            }
        </div>
    )
}
