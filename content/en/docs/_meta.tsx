import type { FC, ReactNode } from 'react'

export const Separator: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  )
}

export default {
  _: {
    title: <Separator>Getting Started</Separator>,
    type: 'separator'
  },
  'overview': '',
  'installation': '',
  'quickstart': '',
  'common-workflows': '',
  'features': '',
  _2: {
    title: <Separator>Configuration</Separator>,
    type: 'separator'
  },
  'rules': '',
  'settings': '',
  'models': '',
  'providers': '',
  _3: {
    title: <Separator>Features</Separator>,
    type: 'separator'
  },
  'interactive-mode': '',
  'headless': '',
  'slash-commands': '',
  'subagents': '',
  'skills': '',
  'spec-driven': '',
  'sdk': '',
  'mcp': '',
  'output-style': '',
  'ai-commit': '',
  'shell-command-generator': '',
  'session-log-viewer': '',
  _4: {
    title: <Separator>Guides</Separator>,
    type: 'separator'
  },
  'create-your-own-code-agent': '',
  _5: {
    title: <Separator>Reference</Separator>,
    type: 'separator'
  },
  'cli': '',
  'plugins': '',
  _6: {
    title: <Separator>Support</Separator>,
    type: 'separator'
  },
  'troubleshooting': '',
  _7: {
    title: <Separator>Resources</Separator>,
    type: 'separator'
  },
  'milestone': '',
}
