import { Button } from "@/components/ui/button";
import { db } from "@/services/firebase-connection";
import {
    getDocs,
    collection,
    orderBy,
    query,
    doc,
    getDoc
} from "firebase/firestore"
import { Github, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

interface LinksProps {
    id: string
    name: string
    url: string
    bg: string
    color: string
}

interface SocialLinksProps {
    github: string
    instagram: string
    linkedin: string
}

export function Home() {
    const [links, setLinks] = useState<LinksProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links")

            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
                .then((snapshot) => {
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
                    console.log(list)
                    setLinks(list)
                })
        }

        loadLinks()
    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            github: snapshot.data()?.github,
                            instagram: snapshot.data()?.instagram,
                            linkedin: snapshot.data()?.linkedin,
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        loadSocialLinks()
    }, [])

    return (
        <div className="px-10 flex flex-col justify-center items-center">
            <img src="https://github.com/gadiegon.png" className="w-4h-40 h-40 rounded-full border-2 border-red-500 hover:scale-110 mb-6" alt="" />
            <h1 className="text-2xl font-bold">Gadiego Nogueira</h1>

            <div className="flex flex-col mb-2 w-full max-w-xl gap-4 mt-8">
                {
                    links.map((data) => (
                        <Button
                            key={data.id}
                            onClick={() => window.open(data.url, '_blank')}
                            style={{ backgroundColor: data.bg, color: data.color }}
                            className="hover:brightness-125"
                        >
                            {data.name}
                        </Button>
                    ))
                }

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <div className="w-full flex justify-center">
                        {socialLinks.github !== "" && (
                            <Button variant="ghost" onClick={() => window.open(socialLinks.github, '_blank')}>
                                <Github />
                            </Button>
                        )}
                        {socialLinks.instagram !== "" && (
                            <Button variant="ghost" onClick={() => window.open(socialLinks.instagram, '_blank')}>
                                <Instagram />
                            </Button>
                        )}
                        {socialLinks.linkedin !== "" && (
                            <Button variant="ghost" onClick={() => window.open(socialLinks.linkedin, '_blank')}>
                                <Linkedin />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
