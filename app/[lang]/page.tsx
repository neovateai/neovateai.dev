import { getDictionary } from '../_dictionaries/get-dictionary'
import { i18n } from '../_dictionaries/i18n-config'
import { HomePage } from './home-page'

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

type PageProps = {
  params: Promise<{ lang: string }>
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return <HomePage lang={lang} dictionary={dictionary} />
}
