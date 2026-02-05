# 环境搭建

在开始学习 PHP 之前，我们需要搭建一个开发环境。本章将介绍如何安装和配置 PHP 开发环境。

## PHP 安装

### Windows

1. 下载 PHP
   - 访问 [PHP 官网](https://www.php.net/downloads.php)
   - 下载最新稳定版本（推荐 PHP 8.x）
   - 选择 Thread Safe 版本

2. 解压安装
   ```bash
   # 解压到 C:\php
   # 将 C:\php 添加到系统 PATH 环境变量
   ```

3. 验证安装
   ```bash
   php -v
   ```

### macOS

使用 Homebrew 安装：

```bash
brew install php
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install php php-cli php-fpm
```

## 开发工具推荐

### VS Code

推荐安装以下扩展：

- PHP Intelephense
- PHP Debug
- PHP DocBlocker

### PhpStorm

JetBrains 出品的专业 PHP IDE，功能强大但需要付费。

## Composer 包管理器

Composer 是 PHP 的依赖管理工具，类似于 Node.js 的 npm。

### 安装 Composer

**Windows:**
下载并运行 [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)

**macOS/Linux:**
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### 验证安装

```bash
composer --version
```

### 基本使用

```bash
# 初始化项目
composer init

# 安装依赖
composer install

# 添加依赖包
composer require vendor/package
```

## 本地开发服务器

PHP 内置了开发服务器，无需配置 Apache 或 Nginx：

```bash
# 启动开发服务器
php -S localhost:8000

# 指定文档根目录
php -S localhost:8000 -t public
```

## 第一个 PHP 程序

创建 `hello.php` 文件：

```php
<?php
echo "Hello, PHP!";
?>
```

运行：

```bash
php hello.php
```

或在浏览器中访问：`http://localhost:8000/hello.php`

## 下一步

环境搭建完成后，让我们开始学习 PHP 语法基础 → [语法基础](/guide/syntax)
