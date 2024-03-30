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
  email: z
    .string()
    .email('Email Inválido'),
  password: z
    .string()
})


export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  })

  const [error, setError] = useState('')
  const { signIn } = useUser()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL + '/sessions'}`,
          {
            email: data.email,
            password: data.password
          })

        const user = response.data
        signIn(user)
        router.push('/home')
      } catch (err: any) {
        if (err.response.status === 400) {
          setError('Dados inválidos')
        }
        if (err.response.status === 409) {
          setError('Confirme o código enviado para o seu email')
          router.push('/confirmar-conta')
        }
      }

    }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>Email:</Label>

      <Input
        type='email'
        placeholder='nome@exemplo.com.br'
        error={!!errors.email}
        {...register('email')}
      />
      {errors.email && (
        <Error>{String(errors['email']?.message)}</Error>
      )}
      {error && (
        <Error>{error}</Error>
      )}

      <Label>Senha:</Label>

      <Input
        type='password'
        placeholder='Digite sua senha'
        error={!!errors.password}
        {...register('password')}
      />
      {errors.password && (
        <Error>{String(errors['password']?.message)}</Error>
      )}


      <Button
        type='submit'
        disabled={isSubmitting}
      >
        Entrar
      </Button>
      <Box>
        <Ancor accentColor href='/recuperar-senha'>
          Esqueceu a senha?
        </Ancor>

        <Ancor href='/register'>
          Cadastre-se
        </Ancor>
      </Box>
    </Form>
  )
}
