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
    title: <Separator>Overview</Separator>,
    type: 'separator'
  },
  'overview': '',
  'installation': '',
  'quickstart': '',
  _2: {
    title: <Separator>User Guide</Separator>,
    type: 'separator'
  },
  'rules': '',
  'headless': '',
  'mcp': '',
  _3: {
    title: <Separator>Configuration</Separator>,
    type: 'separator'
  },
  'settings': '',
  'models': '',
  'providers': '',
  _4: {
    title: <Separator>Reference</Separator>,
    type: 'separator'
  },
  'cli': '',
  'interactive-mode': '',
  'slash-commands': '',
  'output-style': '',
  'plugins': '',
  _5: {
    title: <Separator>Support</Separator>,
    type: 'separator'
  },
  'troubleshooting': '',
}
