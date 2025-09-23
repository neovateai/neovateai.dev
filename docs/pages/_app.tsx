import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import 'nextra-theme-docs/style.css'
import { useLocale } from '../hooks/useLocale'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { updateLocale } = useLocale()

  useEffect(() => {
    const detectAndStoreLocale = () => {
      const pathname = router.asPath

      if (pathname.startsWith('/en/')) {
        updateLocale('en')
      } else if (pathname.startsWith('/zh-CN/')) {
        updateLocale('zh-CN')
      }
    }

    detectAndStoreLocale()
  }, [router.asPath, updateLocale])

  return <Component {...pageProps} />
}
