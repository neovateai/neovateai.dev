import { DocsThemeConfig } from 'nextra-theme-docs';
import React from 'react';

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img
        src="https://mdn.alipayobjects.com/huamei_9rin5s/afts/img/UdphTJIBImUAAAAAQKAAAAgADiB8AQFr/original"
        alt="Neovate"
        style={{ height: '20px' }}
      />
    </div>
  ),
  project: {
    link: 'https://github.com/neovateai/neovate-code',
  },
  docsRepositoryBase:
    'https://github.com/neovateai/neovateai.dev/tree/master/docs',
  footer: {
    content: 'Neovate Documentation',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="NeovateAI Documentation" />
      <meta property="og:description" content="Documentation for NeovateAI" />
    </>
  ),
  i18n: [
    { locale: 'en', name: 'English' },
    { locale: 'zh-CN', name: '中文' },
  ],
};

export default config;
