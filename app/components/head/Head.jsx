import Head from 'next/head'
import icon from '../../assets/icons/favicon.ico'

export default function HeadBlock({title}) {
  return (
    <Head>
      {
        title !== 'none'
        ?
        <title>No-name - {title}</title>
        :
        <title>No-name</title>
      }
        <meta charset="utf-8" />
        <link rel="shortcut icon" href={'/favicon/favicon.ico'} />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;900&display=swap" rel="stylesheet"/>
    </Head>
  )
}
