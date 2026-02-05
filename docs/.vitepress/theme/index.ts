import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 可以在这里注册全局组件或添加自定义逻辑
  }
}
