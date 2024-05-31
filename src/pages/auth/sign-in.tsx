import { useNavigate } from "react-router-dom";

import { auth } from "@/services/firebase-connection"
import { signInWithEmailAndPassword } from "firebase/auth"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (email === '' || password === '') {
            toast.error('Preencha todos os campos!')

            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                toast.success("Logado com sucesso!")
                navigate('/painel')
            })
            .catch(() => {
                toast.error("Email ou senha incorretos!")
            })
    }

    return (
        <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto mt-10 border border-black rounded-lg p-10">
            <h1>Bem vindx ;)</h1>
            <p>Entre com seu e-mail e senha!</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <div>

                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>

                    <Label htmlFor="password">Senha</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Button type="submit" className="w-full mt-4">Entrar</Button>
                </div>
            </form>
        </div>
    )
}
