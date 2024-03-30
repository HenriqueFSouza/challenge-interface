'use client'
import { Input, Label, Form, Button, Error, Text } from '../styles'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { FieldValues, useForm } from 'react-hook-form';


export default function NewPassword() {

  const { handleSubmit, register, formState: { isSubmitting } } = useForm();

  const [error, setError] = useState('')
  const [step, setStep] = useState(0)

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL + '/recover-password'}`,
          {
            email: data.email,
          },
        )

        setStep(1)
      } catch (err) {
        setError('Email incorreto!')
      }
    }, [])

  return (
    <>
      {step === 0 && (
        <Form onSubmit={handleSubmit(onSubmit)}>

          <Label>Digite o seu email abaixo:</Label>
          <Input
            type='email'
            placeholder='exemplo@email.com'
            error={!!error}
            {...register('email')}
          />
          {error && (
            <Error>{error}</Error>
          )}

          <Button
            type='submit'
            disabled={isSubmitting}
          >
            Enviar
          </Button>
        </Form>
      )}
      {step === 1 && (
        <>
          <Text>
            Um email foi enviado com o link de recuperação de senha o email
          </Text>
        </>
      )}
    </>
  )
}
