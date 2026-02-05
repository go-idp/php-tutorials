# 部署说明

## GitHub Pages 部署问题解决

如果遇到错误：`Branch "master" is not allowed to deploy to github-pages due to environment protection rules`

### 解决方案 1：在 GitHub 仓库设置中禁用环境保护（推荐）

1. 进入 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Environments**（环境）
4. 点击 **github-pages** 环境
5. 找到 **Deployment branches**（部署分支）部分
6. 选择 **All branches**（所有分支）或添加 **master** 分支到允许列表
7. 保存设置

### 解决方案 2：使用 gh-pages 分支部署

如果不想修改环境设置，可以修改工作流使用 gh-pages 分支：

```yaml
# 在 deploy.yml 中修改
deploy:
  runs-on: ubuntu-latest
  needs: build
  steps:
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./docs/.vitepress/dist
        publish_branch: gh-pages
```

### 解决方案 3：检查仓库 Pages 设置

1. 进入 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**（页面）
4. 确保 **Source**（源）设置为 **GitHub Actions**
5. 如果设置为分支，改为 **GitHub Actions**

## 当前配置

当前工作流使用 GitHub Actions 的 `deploy-pages` action，需要：

1. 仓库设置中启用 GitHub Actions 作为 Pages 源
2. 环境设置中允许 master 分支部署
3. 确保有正确的权限设置
