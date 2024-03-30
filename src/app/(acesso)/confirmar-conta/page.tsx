'use client'
import { z } from 'zod'
import { Input, Label, Form, Button, Box, Ancor, Error } from '../styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useUser } from '@/contexts/user-context'
import { useRouter } from 'next/navigation'

type FieldValues = z.infer<typeof schema>

const schema = z.object({
  code: z
    .string()
    .min(6, 'Código obrigatório')
})


export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const { user } = useUser()
  const [error, setError] = useState('')


  const onSubmit = useCallback(
    async (data: FieldValues) => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL + '/check-code'}`,
          {
            email: user?.email,
            code: data.code
          })

        router.push('/home')

      } catch (err) {
        setError('Código inválido')
      }
    }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>Digite o código que foi enviado para o email:
        <br />
        <strong>{user?.email}</strong></Label>

      <Input
        type='text'
        placeholder='X X X X X X'
        error={!!error}
        {...register('code')}
      />
      {error && (
        <Error>{error}</Error>
      )}

      <Button
        type='submit'
        disabled={isSubmitting}
      >
        Confirmar código
      </Button>
    </Form>
  )
}
