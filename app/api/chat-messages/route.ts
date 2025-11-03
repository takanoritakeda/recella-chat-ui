import type { NextRequest } from 'next/server'
import { client, getInfo, checkReferer } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  // リファラーチェック（iframe制限）
  const refererError = checkReferer(request)
  if (refererError) {
    return refererError
  }

  const body = await request.json()
  const {
    inputs,
    query,
    files,
    conversation_id: conversationId,
    response_mode: responseMode,
  } = body
  const { user } = getInfo(request)
  const res = await client.createChatMessage(inputs, query, user, responseMode, conversationId, files)
  return new Response(res.data as any)
}
