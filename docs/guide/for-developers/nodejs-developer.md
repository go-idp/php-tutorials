# Node.js 开发者学习 PHP 指南

如果你是一名 Node.js 开发者，本指南将帮助你快速理解 PHP 的差异和相似之处。

## 快速对比表

| 概念 | Node.js | PHP | 说明 |
|------|---------|-----|------|
| 包管理 | `npm` / `yarn` | `Composer` | 不同的包管理器 |
| 模块系统 | `require()` / `import` | `require()` / `use` | PHP 使用命名空间 |
| 异步 | `async/await` / Promise | 同步（PHP 8.1+ Fiber） | PHP 传统同步执行 |
| 框架 | Express.js, Koa | ThinkPHP, Laravel | 不同的框架生态 |
| 路由 | `app.get('/path')` | `Route::get('/path')` | 语法不同但概念相同 |
| 中间件 | `app.use(middleware)` | `Route::middleware()` | 概念相同 |
| 数据库 | Sequelize, TypeORM | Eloquent, ThinkPHP ORM | ORM 概念相同 |
| 环境变量 | `process.env` | `$_ENV` / `getenv()` | 访问方式不同 |

## 共同点

### 1. 服务器端开发

两者都是服务器端语言，处理 HTTP 请求：

**Node.js：**
```javascript
const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.json({users: []});
});
```

**PHP：**
```php
<?php
use think\facade\Route;

Route::get('users', function() {
    return json(['users' => []]);
});
?>
```

### 2. 包/依赖管理

**Node.js：**
```json
{
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

**PHP (Composer)：**
```json
{
  "require": {
    "topthink/framework": "^6.0"
  }
}
```

### 3. MVC 架构

两者都支持 MVC 模式，概念完全相同。

### 4. 中间件概念

**Node.js：**
```javascript
app.use((req, res, next) => {
    // 中间件逻辑
    next();
});
```

**PHP：**
```php
<?php
class AuthMiddleware
{
    public function handle($request, \Closure $next)
    {
        // 中间件逻辑
        return $next($request);
    }
}
?>
```

## 主要差异

### 1. 异步 vs 同步

**Node.js（异步）：**
```javascript
async function fetchUser(id) {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    const posts = await db.query('SELECT * FROM posts WHERE user_id = ?', [id]);
    return {user, posts};
}
```

**PHP（同步）：**
```php
<?php
function fetchUser($id) {
    $user = Db::table('users')->where('id', $id)->find();
    $posts = Db::table('posts')->where('user_id', $id)->select();
    return ['user' => $user, 'posts' => $posts];
}
?>
```

**注意：** PHP 8.1+ 支持 Fiber（协程），可以实现类似异步的效果。

### 2. 回调 vs 直接执行

**Node.js：**
```javascript
fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

**PHP：**
```php
<?php
$data = file_get_contents('file.txt');
echo $data;
?>
```

### 3. 模块系统

**Node.js：**
```javascript
// CommonJS
const express = require('express');

// ES Modules
import express from 'express';
```

**PHP：**
```php
<?php
// 使用命名空间和 use
namespace App\Controllers;

use think\facade\Route;
use App\Models\User;
?>
```

### 4. 错误处理

**Node.js：**
```javascript
try {
    await riskyOperation();
} catch (error) {
    console.error(error);
}
```

**PHP：**
```php
<?php
try {
    riskyOperation();
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
```

### 5. 环境变量

**Node.js：**
```javascript
const dbHost = process.env.DB_HOST || 'localhost';
```

**PHP：**
```php
<?php
$dbHost = $_ENV['DB_HOST'] ?? 'localhost';
// 或
$dbHost = getenv('DB_HOST') ?: 'localhost';
?>
```

## 快速上手路径

### 第一步：理解同步执行模型

1. **PHP 基础语法** → [语法基础](/guide/syntax)
2. **理解 PHP 的同步特性**：与 Node.js 的异步思维不同

### 第二步：包管理

1. **学习 Composer** → [环境搭建](/guide/environment)
2. **理解 autoload**：类似 Node.js 的模块加载

### 第三步：Web 框架

1. **ThinkPHP 入门** → [ThinkPHP 介绍](/thinkphp/introduction)
2. **路由系统** → [路由系统](/thinkphp/routing)
3. **中间件** → [中间件](/thinkphp/middleware)

### 第四步：数据库操作

1. **ORM 概念** → [ORM](/thinkphp/orm)
2. **查询构造器** → [查询构造器](/thinkphp/query-builder)

## 常见陷阱

### 1. 回调地狱 vs 同步执行

**Node.js 可能遇到的问题：**
```javascript
// 回调地狱
getUser(id, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            // 嵌套过深
        });
    });
});
```

**PHP 的优势：**
```php
<?php
// 同步执行，代码更清晰
$user = getUser($id);
$posts = getPosts($user->id);
$comments = getComments($posts[0]->id);
?>
```

### 2. 变量作用域

**Node.js：**
```javascript
let x = 1;
function test() {
    console.log(x);  // 可以访问
}
```

**PHP：**
```php
<?php
$x = 1;
function test() {
    global $x;  // 需要 global 关键字
    echo $x;
}
?>
```

### 3. 数组操作

**Node.js：**
```javascript
const arr = [1, 2, 3];
arr.push(4);
arr.map(x => x * 2);
```

**PHP：**
```php
<?php
$arr = [1, 2, 3];
$arr[] = 4;  // 或 array_push($arr, 4)
array_map(function($x) { return $x * 2; }, $arr);
?>
```

## 实战对比

### 示例 1：Express.js vs ThinkPHP

**Node.js (Express.js)：**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});

app.listen(3000);
```

**PHP (ThinkPHP)：**
```php
<?php
use think\facade\Route;
use app\model\User;

Route::get('users', function() {
    $users = User::select();
    return json($users);
});

Route::post('users', function() {
    $user = User::create(input('post.'));
    return json($user, 201);
});
?>
```

### 示例 2：中间件

**Node.js：**
```javascript
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    next();
};

app.get('/protected', authMiddleware, (req, res) => {
    res.json({message: 'Protected route'});
});
```

**PHP：**
```php
<?php
class AuthMiddleware
{
    public function handle($request, \Closure $next)
    {
        if (!$request->header('authorization')) {
            return json(['error' => 'Unauthorized'], 401);
        }
        return $next($request);
    }
}

Route::get('protected', 'Index/protected')
    ->middleware(AuthMiddleware::class);
?>
```

### 示例 3：数据库查询

**Node.js (Sequelize)：**
```javascript
const User = require('./models/User');

// 查询
const users = await User.findAll({
    where: { status: 'active' },
    include: [{ model: Post }]
});

// 创建
const user = await User.create({
    name: 'John',
    email: 'john@example.com'
});
```

**PHP (ThinkPHP)：**
```php
<?php
use app\model\User;

// 查询
$users = User::where('status', 'active')
    ->with('posts')
    ->select();

// 创建
$user = User::create([
    'name' => 'John',
    'email' => 'john@example.com'
]);
?>
```

## 学习建议

1. **接受同步思维**：PHP 是同步执行的，不需要处理回调或 Promise
2. **学习 Composer**：这是 PHP 的包管理器，类似 npm
3. **理解命名空间**：PHP 使用命名空间组织代码，类似 Node.js 的模块
4. **掌握框架**：ThinkPHP 提供了类似 Express.js 的功能
5. **利用同步优势**：代码更直观，没有回调地狱

## 性能考虑

- **Node.js**：适合 I/O 密集型应用，异步处理并发请求
- **PHP**：每个请求独立进程/线程，适合传统 Web 应用
- **PHP-FPM**：进程管理器，类似 Node.js 的集群模式

## 下一步

- 开始学习 → [PHP 基础入门](/guide/getting-started)
- 学习框架 → [ThinkPHP 介绍](/thinkphp/introduction)
- 理解差异 → [Web 开发基础](/web/http-basics)
