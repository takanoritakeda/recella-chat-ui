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
  try {
    const { data }: any = await client.getConversations(user)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  }
  catch (error: any) {
    return NextResponse.json({
      data: [],
      error: error.message,
    })
  }
}
