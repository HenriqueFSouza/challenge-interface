'use client'

import { useUser } from "@/contexts/user-context"
import { Title } from "../styles"

export default function Home() {
  const { user } = useUser()

  return (
    <Title>Parabéns {user?.name}, você está logado na aplicação!</Title>
  )
}