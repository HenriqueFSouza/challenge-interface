'use client'
import styled from 'styled-components'

type Props = {
  accentColor?: boolean
  error?: boolean
}

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #fff;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Container = styled.div`
  background-color: #FBFBFB;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  min-width: 400px;
  padding: 2rem;
  border-radius: 10px;
`
export const Title = styled.h2`
  color: #222D39;
  text-align: center;
  margin-bottom: 1rem;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const Label = styled.label`
  color: #222D39;
  font-size: 1rem;
  font-weight: 500;
`
export const Text = styled.p`
  color: #222D39;
  font-size: 1rem;
  font-weight: 500;
`
export const Input = styled.input<Props>`
  height: 2.5rem;
  padding: 1rem;
  
  border: 1px solid gray;
  border-color: ${({ error }) => error ? 'red' : 'gray'};

  border-radius: 10px;
  outline: none;

  font-size: 1rem;
  color: #000;
`
export const Button = styled.button`
  background-color: #00AD31;
  height: 2.5rem;
  padding: 1rem;
  margin-top: 1rem;

  border-radius: 10px;
  border: none;
  outline: none;

  font-size: 1rem;
  font-weight: 600;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover { 
    filter: opacity(0.95);
    cursor: pointer;
  }

  &:active { 
    filter: opacity(0.9);
  }

  &:disabled { 
    pointer-events: none;
    background-color: gray;
  }
`
export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`
export const Ancor = styled.a<Props>`
  color: gray;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  
  color: ${({ accentColor }) => accentColor ? '#0055FE' : '#222D39'};

  &:hover { 
    text-decoration: underline;
    cursor: pointer;
  }
`
export const Error = styled.p<Props>`
  color: red;
  font-size: 0.8rem;
  margin-top: -0.5rem;
`
