import Link from 'next/link'
import s from './page.module.scss'

export default async function Post() {
  return (
    <>
      <article className={s.post}>
        <Link href="/admin">Admin</Link>
      </article>
    </>
  )
}
