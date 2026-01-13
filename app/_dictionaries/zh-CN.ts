import type { Dictionary } from './i18n-config'

export default {
  dark: '暗色',
  light: '亮色',
  system: '系统',
  backToTop: '回到顶部',
  lastUpdated: '最后更新于',
  poweredBy: '由',
  lightweight: '轻量',
  realtime: '实时',
  suspense: '悬念',
  pagination: '分页',
  typescript: 'TypeScript',
  remoteLocal: '远程 + 本地',
  editPage: '在 GitHub 上编辑此页面',
  by: '由',
  hero: {
    title: 'Code with Agents, Build with Neovate',
    subtitle: 'Code agent to enhance your development.',
    getStarted: '开始使用',
    viewDocs: '查看文档',
    experienceSubtitle: '先一步全新体验',
    buttonText: '开始体验 • New Experience',
    disclaimer: '免费使用，开源项目',
  },
  features: {
    open: {
      title: '开放',
      description: '开源、支持主流模型和模型供应商、插件体系、二开友好、支持 slash command 和 output type 扩展',
    },
    multiPlatform: {
      title: '多端',
      description: '目前有 CLI，Web 和 Desktop，Background Agent 和 VSCode Extension 等多端处于研发状态',
    },
    bestPractices: {
      title: '最佳实践',
      description: '快速迭代，紧跟社区 AI Coding 最新的最佳实践。Spec Driven、Parallel Code Agents 等',
    },
  },
  footer: {
    logoAlt: 'Neovate 标志',
    description: '建立前端智能协同研发新范式，Neovate 集成先进的大型语言模型 (LLM) 来提速开发工作流。',
    copyright: '© {{year}} Neovate. 保留所有权利。',
    products: '产品',
    resources: '资源',
    company: '公司',
    help: '帮助',
    // Products column
    neovateCode: 'Neovate Code',
    neovateChat: 'Neovate Chat',
    neovateAPI: 'Neovate API',
    pricing: '价格',
    // Resources column
    documentation: '文档',
    blog: '博客',
    tutorials: '教程',
    community: '社区',
    // Company column
    about: '关于',
    careers: '招聘',
    contact: '联系',
    privacy: '隐私政策',
    // Social column
    github: 'GitHub',
    twitter: 'Twitter',
    discord: 'Discord',
    linkedin: 'LinkedIn',
  }
} satisfies Dictionary
