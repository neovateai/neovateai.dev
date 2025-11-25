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
  _2: {
    title: <Separator>用户指南</Separator>,
    type: 'separator'
  },
  'rules': '',
  'headless': '',
  'mcp': '',
  _3: {
    title: <Separator>配置</Separator>,
    type: 'separator'
  },
  'settings': '',
  'models': '',
  'providers': '',
  _4: {
    title: <Separator>参考</Separator>,
    type: 'separator'
  },
  'cli': '',
  'interactive-mode': '',
  'slash-commands': '',
  'output-style': '',
  'plugins': '',
  _5: {
    title: <Separator>支持</Separator>,
    type: 'separator'
  },
  'troubleshooting': '',
}
