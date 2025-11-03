import type { AppInfo } from '@/types/app'

// サーバーサイド専用（非公開）環境変数 - NEXT_PUBLIC_プレフィックスなし
export const APP_ID = `${process.env.DIFY_APP_ID}`
export const API_KEY = `${process.env.DIFY_API_KEY}`
export const API_URL = `${process.env.DIFY_API_URL}`

// iframe制限用の許可リファラー（カンマ区切り）
export const ALLOWED_REFERERS = process.env.ALLOWED_REFERERS?.split(',') || []

export const APP_INFO: AppInfo = {
  title: 'Recella スキンケアAIコンシェルジュ',
  description: 'AIがあなたの肌に最適なスキンケアプランを提案します',
  copyright: '© 2025 Recella. All rights reserved.',
  privacy_policy: '',
  default_language: 'ja',
  disable_session_same_site: true, // iframe埋め込みに対応
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
