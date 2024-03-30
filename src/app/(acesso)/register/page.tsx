'use client'
import { z } from 'zod'
import { Input, Label, Form, Button, Title, Error, Ancor } from '../styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useUser } from '@/contexts/user-context'
import { useRouter } from 'next/navigation'

type FieldValues = z.infer<typeof schema>

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Nome é obrigatório' }),
  email: z
    .string()
    .email('Email Inválido'),
  password: z
    .string()
    .min(6, { message: 'Senha muito curta' })
})
export default function Register() {

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
          `${process.env.NEXT_PUBLIC_API_URL + '/users'}`,
          {
            name: data.name,
            email: data.email,
            password: data.password
          })

        const { user } = response.data
        signIn(user)
        router.push('/confirmar-conta')

      } catch (err) {
        setError('Usuário já existe!')
      }
    }, [])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Cadastre-se grátis</Title>

      <Label>Nome Completo:</Label>

      <Input
        type='text'
        error={!!errors.name}
        {...register('name', { required: true })}
      />
      {errors.name && (
        <Error>{String(errors['name']?.message)}</Error>
      )}

      <Label>Email:</Label>

      <Input
        required
        type='email'
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
        required
        type='password'
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
        Criar conta
      </Button>

      <Ancor accentColor href='/login'>
        Já tenho cadastro
      </Ancor>
    </Form>
  )
}
