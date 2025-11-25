import type { Metadata } from "next";
import {
  Footer,
  LastUpdated,
  Layout,
  Link,
  LocaleSwitch,
  Navbar,
} from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { FC, ReactNode } from "react";
import { getDictionary, getDirection } from "../_dictionaries/get-dictionary";
import { Footer as CustomFooter } from "../_components/footer";
import type { Locale } from "../_dictionaries/i18n-config";
import "./styles.css";

export const metadata: Metadata = {
  description: "Code with agents, build with neovate",
  title: {
    absolute: "",
    template: "%s | Neovate",
  },
  metadataBase: new URL("https://neovateai.dev"),
  openGraph: {
    // images: "",
  },
  twitter: {
    // site: "@neovateai",
  },
  appleWebApp: {
    title: "Neovate",
  },
  other: {
    "msapplication-TileColor": "#fff",
  },
};

type LayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{
    lang: string;
  }>;
}>;

const NeovateLogo = () => {
  return (
    <>
      {/* Light mode logo */}
      <img
        src="https://mdn.alipayobjects.com/huamei_9rin5s/afts/img/UdphTJIBImUAAAAAQKAAAAgADiB8AQFr/original"
        alt="Neovate Code"
        style={{ height: "20px" }}
        className="dark:hidden"
      />
      {/* Dark mode logo */}
      <img
        src="https://mdn.alipayobjects.com/huamei_9rin5s/afts/img/kNnfQZcDGy0AAAAAQCAAAAgADiB8AQFr/original"
        alt="Neovate Code"
        style={{ height: "20px" }}
        className="hidden dark:block"
      />
    </>
  );
};

const RootLayout: FC<LayoutProps> = async ({ children, params }) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const pageMap = await getPageMap(`/${lang}`);
  const banner = (
    <Banner storageKey="neovate">
      Neovate Code is open sourced! <Link href="#">Read more →</Link>
    </Banner>
  );
  const navbar = (
    <Navbar
      logo={<NeovateLogo />}
      projectLink="https://github.com/neovateai/neovate-code"
    >
      <LocaleSwitch lite />
    </Navbar>
  );
  const footer = (
    <Footer />
  );
  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <Head
        backgroundColor={{
          dark: "rgb(15,23,42)",
          light: "rgb(254, 252, 232)",
        }}
        color={{
          hue: { dark: 338, light: 338 },
          saturation: { dark: 100, light: 100 },
        }}
      >
        <link
          rel="icon"
          href="https://mdn.alipayobjects.com/huamei_9rin5s/afts/img/0uIJQaelzccAAAAAQCAAAAgADiB8AQFr/original"
        />
      </Head>
      <body suppressHydrationWarning>
        <Layout
          // banner={banner}
          navbar={navbar}
          footer={footer}
          docsRepositoryBase="https://github.com/neovateai/neovateai.dev"
          i18n={[
            { locale: "en", name: "English" },
            { locale: "zh-CN", name: "简体中文" },
          ]}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true,
          }}
          toc={{
            backToTop: dictionary.backToTop,
            extraContent: null,
          }}
          editLink={dictionary.editPage}
          pageMap={pageMap}
          nextThemes={{ defaultTheme: "dark" }}
          lastUpdated={<LastUpdated>{dictionary.lastUpdated}</LastUpdated>}
          themeSwitch={{
            dark: dictionary.dark,
            light: dictionary.light,
            system: dictionary.system,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
