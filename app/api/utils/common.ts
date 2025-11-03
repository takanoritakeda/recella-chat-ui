import { type NextRequest, NextResponse } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import { API_KEY, API_URL, APP_ID, APP_INFO, ALLOWED_REFERERS } from '@/config'

const userPrefix = `user_${APP_ID}:`

// リファラーチェック：iframe制限
export const checkReferer = (request: NextRequest): NextResponse | null => {
  // 許可リファラーが設定されていない場合はチェックしない（開発環境用）
  if (ALLOWED_REFERERS.length === 0) {
    return null
  }

  const referer = request.headers.get('referer')

  // リファラーがない場合は拒否
  if (!referer) {
    return NextResponse.json(
      { error: 'Access denied: No referer header' },
      { status: 403 }
    )
  }

  // 許可されたリファラーかチェック
  const isAllowed = ALLOWED_REFERERS.some(allowed =>
    referer.startsWith(allowed.trim())
  )

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Access denied: Invalid referer' },
      { status: 403 }
    )
  }

  return null
}

export const getInfo = (request: NextRequest) => {
  const sessionId = request.cookies.get('session_id')?.value || v4()
  const user = userPrefix + sessionId
  return {
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site)
  { return { 'Set-Cookie': `session_id=${sessionId}; SameSite=None; Secure` } }

  return { 'Set-Cookie': `session_id=${sessionId}` }
}

export const client = new ChatClient(API_KEY, API_URL || undefined)
