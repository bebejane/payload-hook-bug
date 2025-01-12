'use client'

import type React from 'react'

import { isDocumentEvent, isLivePreviewEvent, ready } from '@payloadcms/live-preview'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export const LivePreview: React.FC<{
  apiRoute?: string
  depth?: number
  refresh?: () => void
  slug?: string
  serverURL: string
}> = (props) => {
  const router = useRouter()
  const { apiRoute, depth } = props
  const serverURL = props.serverURL
  const hasSentReadyMessage = useRef<boolean>(false)

  const onMessage = useCallback(
    async (event: MessageEvent) => {
      const {
        data: { type, data },
      } = event

      console.log(type)
      if (isLivePreviewEvent(event, serverURL)) {
        const slug = data?.slug
        const pathname = `/posts/${slug}`
        console.log(pathname)
        router.replace(pathname)
      } else if (isDocumentEvent(event, serverURL)) {
        router.refresh()
      }
    },
    [router, serverURL],
  )

  useEffect(() => {
    window.addEventListener('message', onMessage)

    if (!hasSentReadyMessage.current) {
      hasSentReadyMessage.current = true
      ready({ serverURL })
    }

    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [serverURL, onMessage, depth, apiRoute])

  return null
}
