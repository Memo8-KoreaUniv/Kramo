import React from 'react'

import { useRouter } from 'next/dist/client/router'

import { Main } from '../src/components/main'

export default function Index() {
  const router = useRouter()
  const { categoryId } = router.query as { categoryId: string | undefined }
  return <Main categoryId={categoryId} />
}
