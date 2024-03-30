import Image from 'next/image'
import { Container, Wrapper } from './styles'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Image
        src='/logo.png'
        alt='logo'
        height={60}
        width={250} />
      <Container>
        {children}
      </Container>
    </>
  )
}
