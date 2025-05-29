/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LLM_API_KEY: string
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_GEMINI_TTS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}