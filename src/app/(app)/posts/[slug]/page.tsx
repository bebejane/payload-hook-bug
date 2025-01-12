import s from './page.module.scss'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CollectionSlug, getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { LivePreview } from './LivePreview'
import { Posts } from '../../../../collections/Posts'

export const metadata: Metadata = {
  title: 'Payload test',
  description: 'Payload',
}

type Props = { params: Promise<{ slug: string }> }

export default async function Post({ params }: Props) {
  const payload = await getPayload({ config: configPromise })
  const { slug } = await params
  const draft = (await draftMode()).isEnabled

  const { docs: posts } = await payload?.find({
    collection: Posts.slug as CollectionSlug,
    where: {
      slug: { equals: slug },
    },
    draft,
  })

  const post = posts[0] as any
  if (!post) return notFound()

  return (
    <>
      <article className={s.post}>
        <h1>{post.title}</h1>
        Slug: {post.slug}
        <p>{post.text}</p>
      </article>
      <LivePreview serverURL={'http://localhost:3000'} slug={slug} />
    </>
  )
}

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise })
  const { docs: posts } = await payload.find({
    collection: Posts.slug as CollectionSlug,
    limit: 100,
  })

  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}
