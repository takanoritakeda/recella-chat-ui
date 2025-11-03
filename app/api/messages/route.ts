import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession, checkReferer } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  // リファラーチェック（iframe制限）
  const refererError = checkReferer(request)
  if (refererError) {
    return refererError
  }

  const { sessionId, user } = getInfo(request)
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get('conversation_id')
  const { data }: any = await client.getConversationMessages(user, conversationId as string)
  return NextResponse.json(data, {
    headers: setSession(sessionId),
  })
}
