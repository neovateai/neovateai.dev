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
    title: <Separator>开始使用</Separator>,
    type: 'separator'
  },
  'overview': '',
  'installation': '',
  'quickstart': '',
  'common-workflows': '',
  'features': '',
  _2: {
    title: <Separator>配置</Separator>,
    type: 'separator'
  },
  'rules': '',
  'settings': '',
  'models': '',
  'providers': '',
  _3: {
    title: <Separator>功能</Separator>,
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
    title: <Separator>指南</Separator>,
    type: 'separator'
  },
  'create-your-own-code-agent': '',
  _5: {
    title: <Separator>参考</Separator>,
    type: 'separator'
  },
  'cli': '',
  'plugins': '',
  _6: {
    title: <Separator>支持</Separator>,
    type: 'separator'
  },
  'troubleshooting': '',
  _7: {
    title: <Separator>Resources</Separator>,
    type: 'separator'
  },
  'milestone': '',
}
