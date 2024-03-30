'use client'
import { z } from 'zod'
import { Input, Label, Form, Button, Error, Text } from '../styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'

type FieldValues = z.infer<typeof schema>

const schema = z.object({
  password: z
    .string()
    .min(6, 'Senha muito curta'),
  confirm_password: z
    .string()
}).refine((data) => data.password === data.confirm_password, {
  message: 'As senhas não são iguais!',
  path: ['confirm_password']
})

export default function NewPassword() {

  const params = useSearchParams()
  const token = params.get('token')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()
  const [error, setError] = useState<string | null>(null)


  const onSubmit = useCallback(
    async (data: FieldValues) => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL + '/update-user'}`,
          {
            password: data.password
          }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        router.push('/login')

      } catch (err) {
        setError('Erro inesperado. Tente novamente mais tarde!')
      }
    }, [])


  if (!token) {
    return (
      <Text>
        Link expirado. Por favor solicite um novo link!
      </Text>
    )
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <Label>
        Digete sua nova senha
      </Label>
      <Input
        type='text'
        placeholder='Nova senha'
        error={!!error}
        {...register('password')}
      />

      <Label>
        Confirme sua nova senha
      </Label>
      <Input
        type='text'
        placeholder='exemplo@email.com'
        error={!!error}
        {...register('confirm_password')}
      />

      {errors && (
        <Error>{String(errors['confirm_password']?.message)}</Error>
      )}

      {error && (
        <Error>{error}</Error>
      )}

      <Button
        type='submit'
        disabled={isSubmitting}
      >
        Salvar
      </Button>
    </Form>
  )
}
