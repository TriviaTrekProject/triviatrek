/// <référence types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_URL_BACK : string
    readonly VITE_URL_WS : string
}

interface ImportMeta {
    readonly env : ImportMetaEnv
}