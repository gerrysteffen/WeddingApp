import Head from 'next/head'
import Link from 'next/link'
import Styles from '../utils/styles'

export default function Home() {
  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name="description" content="Wedding app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='relative max-w-400 h-full w-auto flex flex-col justify-center items-left mx-auto'>
        <Link href='./login' className={Styles.landingPageTitle}>App</Link>
        <Link href='./rsvp'className={Styles.landingPageTitle}>RSVP</Link>
        <Link href='./event'className={Styles.landingPageTitle}>Events</Link>
      </div>
    </>
  )
}
