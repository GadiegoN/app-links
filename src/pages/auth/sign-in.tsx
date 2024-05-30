import { Link, useNavigate } from "react-router-dom";

import { auth } from "@/services/firebase-connection"
import { signInWithEmailAndPassword } from "firebase/auth"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

export function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (email === '' || password === '') {
            alert('Email ou senha incorretos!')
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/painel')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="w-6/12 mx-auto mt-10 border border-black rounded-lg p-10">
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
                    <Button type="submit" className="w-full">Entrar</Button>
                </div>
            </form>

            <div className="flex w-full justify-between">
                <Button variant="link">Esqueceu a senha</Button>
                <Button variant="link"><Link to="/registrar">Criar conta</Link></Button>
            </div>
        </div>
    )
}
