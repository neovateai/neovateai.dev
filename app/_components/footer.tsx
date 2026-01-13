import type { FC } from "react";
import { getDictionary } from "../_dictionaries/get-dictionary";
import type { Locale } from "../_dictionaries/i18n-config";

export const Footer: FC<{
  lang: Locale;
}> = async ({ lang }) => {
  const dictionary = await getDictionary(lang);

  const footerColumns = [
    {
      title: dictionary.footer.products,
      links: [
        { label: dictionary.footer.neovateCode, href: "https://github.com/neovateai/neovate-code" },
      ],
    },
    {
      title: dictionary.footer.help,
      links: [
        { label: "GitHub Discussions", href: "https://github.com/neovateai/neovate-code/discussions" },
        { label: dictionary.footer.contact, href: "mailto:sorrycc@gmail.com" },
      ],
    },
    {
      title: dictionary.footer.resources,
      links: [
        { label: dictionary.footer.documentation, href: `/${lang}/docs/overview/` },
        { label: dictionary.footer.blog, href: `/${lang}/blog/` },
        { label: "Changelog", href: "https://github.com/neovateai/neovate-code/releases" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Left side: Logo and Description */}
          <div className="lg:w-1/3">
            <div className="mb-6">
              {/* Light mode logo (hidden in dark theme preference but kept for structure) */}
              {/* <img
                src="https://mdn.alipayobjects.com/huamei_9rin5s/afts/img/Q48CQ7a8GLEAAAAAQBAAAAgADiB8AQFr/original"
                alt={dictionary.footer.logoAlt}
                className="h-8 w-auto dark:hidden"
              /> */}
              {/* Dark mode logo */}
              <img
                src="https://mdn.alipayobjects.com/huamei_h9478t/afts/img/q7dZTLOigq4AAAAAQCAAAAgADhqBAQFr/original"
                alt={dictionary.footer.logoAlt}
                className="h-8 w-auto"
              />
            </div>
            <p className="mb-8 max-w-xs text-sm leading-6 text-gray-400">
              {dictionary.footer.description}
            </p>
            <p className="text-xs leading-5 text-gray-500">
              {dictionary.footer.copyright.replace('{{year}}', String(new Date().getFullYear()))}
            </p>
          </div>

          {/* Right side: Footer Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  {column.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm leading-6 text-gray-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

