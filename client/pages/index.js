import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name="description" content="Wedding app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='max-w-400 h-full flex flex-col justify-center m-auto'>
        <a href='./login' className='text-48px mt-8'>Login</a>
        <a href='./register' className='text-48px mt-8'>Register</a>
        <a href='./rsvp'className='text-48px mt-8'>RSVP</a>
      </div>
    </>
  )
}
