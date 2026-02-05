import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PHP 从入门到精通',
  description: '全面的 PHP 教程，涵盖基础语法、Web 开发、ThinkPHP 框架和进阶内容',
  lang: 'zh-CN',
  base: '/php-tutorials/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: 'PHP 基础', link: '/guide/getting-started' },
      { text: '开发者指南', link: '/guide/for-developers/frontend-developer' },
      { text: 'Web 开发', link: '/web/http-basics' },
      { text: 'ThinkPHP', link: '/thinkphp/introduction' },
      { text: '进阶内容', link: '/advanced/design-patterns' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'PHP 基础入门',
          items: [
            { text: '开始学习', link: '/guide/getting-started' },
            { text: '环境搭建', link: '/guide/environment' },
            { text: '语法基础', link: '/guide/syntax' },
            { text: '变量与数据类型', link: '/guide/variables' },
            { text: '运算符与表达式', link: '/guide/operators' },
            { text: '控制结构', link: '/guide/control-structures' },
            { text: '函数', link: '/guide/functions' },
            { text: '数组', link: '/guide/arrays' },
            { text: '面向对象编程', link: '/guide/oop' },
            { text: '命名空间', link: '/guide/namespaces' },
            { text: '文件操作', link: '/guide/file-operations' },
            { text: '错误处理', link: '/guide/error-handling' },
            { text: '日期时间', link: '/guide/datetime' },
            { text: '字符串处理', link: '/guide/strings' }
          ]
        },
        {
          text: '开发者指南',
          items: [
            { text: '前端开发者', link: '/guide/for-developers/frontend-developer' },
            { text: 'Node.js 开发者', link: '/guide/for-developers/nodejs-developer' },
            { text: 'Java 开发者', link: '/guide/for-developers/java-developer' },
            { text: 'Python 开发者', link: '/guide/for-developers/python-developer' },
            { text: 'Go 开发者', link: '/guide/for-developers/go-developer' }
          ]
        }
      ],
      '/guide/for-developers/': [
        {
          text: '开发者指南',
          items: [
            { text: '前端开发者', link: '/guide/for-developers/frontend-developer' },
            { text: 'Node.js 开发者', link: '/guide/for-developers/nodejs-developer' },
            { text: 'Java 开发者', link: '/guide/for-developers/java-developer' },
            { text: 'Python 开发者', link: '/guide/for-developers/python-developer' },
            { text: 'Go 开发者', link: '/guide/for-developers/go-developer' }
          ]
        }
      ],
      '/web/': [
        {
          text: 'Web 开发基础',
          items: [
            { text: 'HTTP 基础', link: '/web/http-basics' },
            { text: '请求与响应', link: '/web/request-response' },
            { text: 'Cookie 与 Session', link: '/web/cookie-session' },
            { text: '文件上传', link: '/web/file-upload' },
            { text: '数据库连接', link: '/web/database-connection' },
            { text: 'CRUD 操作', link: '/web/crud' },
            { text: '预处理语句', link: '/web/prepared-statements' },
            { text: '事务处理', link: '/web/transactions' },
            { text: 'cURL 扩展', link: '/web/curl' },
            { text: 'JSON 处理', link: '/web/json' },
            { text: '正则表达式', link: '/web/regex' }
          ]
        }
      ],
      '/thinkphp/': [
        {
          text: 'ThinkPHP 框架',
          items: [
            { text: '框架介绍', link: '/thinkphp/introduction' },
            { text: '安装与配置', link: '/thinkphp/installation' },
            { text: '目录结构', link: '/thinkphp/directory-structure' },
            { text: '路由系统', link: '/thinkphp/routing' },
            { text: '控制器', link: '/thinkphp/controllers' },
            { text: '模型', link: '/thinkphp/models' },
            { text: '视图', link: '/thinkphp/views' },
            { text: '数据库操作', link: '/thinkphp/database' },
            { text: '查询构造器', link: '/thinkphp/query-builder' },
            { text: 'ORM', link: '/thinkphp/orm' },
            { text: '验证器', link: '/thinkphp/validators' },
            { text: '中间件', link: '/thinkphp/middleware' },
            { text: '缓存系统', link: '/thinkphp/cache' },
            { text: '日志系统', link: '/thinkphp/logging' },
            { text: '多应用模式', link: '/thinkphp/multi-app' },
            { text: '命令行工具', link: '/thinkphp/console' },
            { text: '事件系统', link: '/thinkphp/events' },
            { text: '服务容器', link: '/thinkphp/container' },
            { text: '依赖注入', link: '/thinkphp/dependency-injection' },
            { text: '实战：博客系统', link: '/thinkphp/practice-blog' },
            { text: '实战：API 开发', link: '/thinkphp/practice-api' },
            { text: '实战：后台管理', link: '/thinkphp/practice-admin' }
          ]
        }
      ],
      '/advanced/': [
        {
          text: 'PHP 进阶',
          items: [
            { text: '设计模式', link: '/advanced/design-patterns' },
            { text: '单例模式', link: '/advanced/singleton' },
            { text: '工厂模式', link: '/advanced/factory' },
            { text: '观察者模式', link: '/advanced/observer' },
            { text: 'MVC 模式深入', link: '/advanced/mvc' },
            { text: '性能优化', link: '/advanced/performance' },
            { text: 'OPcache', link: '/advanced/opcache' },
            { text: '代码优化', link: '/advanced/code-optimization' },
            { text: '数据库优化', link: '/advanced/database-optimization' },
            { text: '缓存策略', link: '/advanced/caching-strategy' },
            { text: '安全实践', link: '/advanced/security' },
            { text: 'SQL 注入防护', link: '/advanced/sql-injection' },
            { text: 'XSS 防护', link: '/advanced/xss' },
            { text: 'CSRF 防护', link: '/advanced/csrf' },
            { text: '密码加密', link: '/advanced/password-encryption' },
            { text: '现代 PHP', link: '/advanced/modern-php' },
            { text: 'PHP 8.x 新特性', link: '/advanced/php8-features' },
            { text: '类型声明', link: '/advanced/type-declarations' },
            { text: '生成器', link: '/advanced/generators' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/go-zoox/php-tutorials' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024 PHP 教程'
    },

    editLink: {
      pattern: 'https://github.com/go-zoox/php-tutorials/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})
