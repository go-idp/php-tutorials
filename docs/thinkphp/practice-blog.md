# 实战：博客系统

本章通过构建一个完整的博客系统来实践 ThinkPHP，从环境搭建到启动服务，一步步带你完成整个项目。

## 项目需求

- 用户注册和登录
- 文章发布和管理
- 文章列表和详情展示
- 评论功能

## 第一步：环境准备

### 1.1 检查 PHP 环境

确保已安装 PHP 7.2.5 或更高版本：

```bash
php -v
```

### 1.2 安装 Composer

如果还没有安装 Composer，请先安装：

```bash
# macOS/Linux
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Windows
# 下载并运行 Composer-Setup.exe
```

验证安装：

```bash
composer --version
```

### 1.3 准备数据库

创建 MySQL 数据库：

```sql
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 第二步：创建项目

### 2.1 使用 Composer 创建项目

```bash
composer create-project topthink/think blog
cd blog
```

### 2.2 查看项目结构

```bash
tree -L 2
```

项目结构：

```
blog/
├── app/                    # 应用目录
│   ├── controller/         # 控制器
│   ├── model/              # 模型
│   └── view/               # 视图
├── config/                 # 配置文件
├── public/                 # 入口文件
├── route/                  # 路由定义
├── runtime/                # 运行时文件
└── vendor/                 # 第三方库
```

## 第三步：配置数据库

### 3.1 编辑数据库配置

编辑 `config/database.php`：

```php
<?php
return [
    'default' => 'mysql',
    'connections' => [
        'mysql' => [
            'type' => 'mysql',
            'hostname' => '127.0.0.1',
            'database' => 'blog_db',
            'username' => 'root',
            'password' => 'your_password',
            'charset' => 'utf8mb4',
            'prefix' => '',
        ],
    ],
];
?>
```

### 3.2 创建数据表

在数据库中执行以下 SQL：

```sql
-- 用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 文章表
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 评论表
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_post_id (post_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 第四步：创建模型

### 4.1 创建用户模型

创建 `app/model/User.php`：

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    protected $table = 'users';
    protected $pk = 'id';
    
    // 隐藏密码字段
    protected $hidden = ['password'];
    
    // 关联文章
    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }
    
    // 关联评论
    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }
    
    // 密码加密
    public function setPasswordAttr($value)
    {
        return password_hash($value, PASSWORD_DEFAULT);
    }
}
?>
```

### 4.2 创建文章模型

创建 `app/model/Post.php`：

```php
<?php
namespace app\model;

use think\Model;

class Post extends Model
{
    protected $table = 'posts';
    protected $pk = 'id';
    
    // 关联用户
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    // 关联评论
    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }
}
?>
```

### 4.3 创建评论模型

创建 `app/model/Comment.php`：

```php
<?php
namespace app\model;

use think\Model;

class Comment extends Model
{
    protected $table = 'comments';
    protected $pk = 'id';
    
    // 关联文章
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }
    
    // 关联用户
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
?>
```

## 第五步：创建控制器

### 5.1 创建用户控制器

创建 `app/controller/User.php`：

```php
<?php
namespace app\controller;

use app\model\User as UserModel;
use think\Request;
use think\facade\Session;

class User
{
    // 注册页面
    public function register()
    {
        return view('user/register');
    }
    
    // 处理注册
    public function doRegister(Request $request)
    {
        $data = $request->post();
        
        // 验证
        if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
            return json(['code' => 400, 'message' => '请填写完整信息']);
        }
        
        // 检查用户名是否已存在
        if (UserModel::where('username', $data['username'])->find()) {
            return json(['code' => 400, 'message' => '用户名已存在']);
        }
        
        // 检查邮箱是否已存在
        if (UserModel::where('email', $data['email'])->find()) {
            return json(['code' => 400, 'message' => '邮箱已存在']);
        }
        
        // 创建用户
        $user = UserModel::create($data);
        
        // 设置会话
        Session::set('user_id', $user->id);
        Session::set('username', $user->username);
        
        return json(['code' => 200, 'message' => '注册成功', 'data' => $user]);
    }
    
    // 登录页面
    public function login()
    {
        return view('user/login');
    }
    
    // 处理登录
    public function doLogin(Request $request)
    {
        $username = $request->post('username');
        $password = $request->post('password');
        
        $user = UserModel::where('username', $username)->find();
        
        if (!$user || !password_verify($password, $user->password)) {
            return json(['code' => 400, 'message' => '用户名或密码错误']);
        }
        
        // 设置会话
        Session::set('user_id', $user->id);
        Session::set('username', $user->username);
        
        return json(['code' => 200, 'message' => '登录成功', 'data' => $user]);
    }
    
    // 退出登录
    public function logout()
    {
        Session::clear();
        return redirect('/user/login');
    }
}
?>
```

### 5.2 创建文章控制器

创建 `app/controller/Post.php`：

```php
<?php
namespace app\controller;

use app\model\Post as PostModel;
use app\model\Comment;
use think\Request;
use think\facade\Session;

class Post
{
    // 文章列表
    public function index()
    {
        $posts = PostModel::with(['user', 'comments'])->order('created_at', 'desc')->select();
        return view('post/index', ['posts' => $posts]);
    }
    
    // 文章详情
    public function show($id)
    {
        $post = PostModel::with(['user', 'comments.user'])->find($id);
        if (!$post) {
            return '文章不存在';
        }
        return view('post/show', ['post' => $post]);
    }
    
    // 创建文章页面
    public function create()
    {
        if (!Session::get('user_id')) {
            return redirect('/user/login');
        }
        return view('post/create');
    }
    
    // 处理创建文章
    public function store(Request $request)
    {
        if (!Session::get('user_id')) {
            return json(['code' => 401, 'message' => '请先登录']);
        }
        
        $data = $request->post();
        $data['user_id'] = Session::get('user_id');
        
        if (empty($data['title']) || empty($data['content'])) {
            return json(['code' => 400, 'message' => '请填写完整信息']);
        }
        
        $post = PostModel::create($data);
        return json(['code' => 200, 'message' => '发布成功', 'data' => $post]);
    }
    
    // 添加评论
    public function addComment(Request $request, $postId)
    {
        if (!Session::get('user_id')) {
            return json(['code' => 401, 'message' => '请先登录']);
        }
        
        $content = $request->post('content');
        if (empty($content)) {
            return json(['code' => 400, 'message' => '评论内容不能为空']);
        }
        
        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => Session::get('user_id'),
            'content' => $content
        ]);
        
        return json(['code' => 200, 'message' => '评论成功', 'data' => $comment]);
    }
}
?>
```

## 第六步：创建视图

### 6.1 创建布局文件

创建 `app/view/layout.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{block name="title"}博客系统{/block}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .header { background: #333; color: #fff; padding: 1rem; }
        .header nav { display: flex; justify-content: space-between; align-items: center; }
        .header a { color: #fff; text-decoration: none; margin: 0 10px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .post { border: 1px solid #ddd; padding: 1rem; margin: 1rem 0; }
        .post h2 { margin-bottom: 0.5rem; }
        .post-meta { color: #666; font-size: 0.9rem; }
        .btn { padding: 0.5rem 1rem; background: #007bff; color: #fff; border: none; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn:hover { background: #0056b3; }
        form { margin: 1rem 0; }
        input, textarea { width: 100%; padding: 0.5rem; margin: 0.5rem 0; }
    </style>
</head>
<body>
    <div class="header">
        <nav>
            <div>
                <a href="/">首页</a>
                <a href="/post/index">文章列表</a>
            </div>
            <div>
                {if condition="session('user_id')"}
                    <span>欢迎, {session('username')}</span>
                    <a href="/user/logout">退出</a>
                {else}
                    <a href="/user/login">登录</a>
                    <a href="/user/register">注册</a>
                {/if}
            </div>
        </nav>
    </div>
    <div class="container">
        {block name="content"}{/block}
    </div>
</body>
</html>
```

### 6.2 创建文章列表视图

创建 `app/view/post/index.html`：

```html
{extend name="layout" /}

{block name="title"}文章列表{/block}

{block name="content"}
<h1>文章列表</h1>

{if condition="session('user_id')"}
    <a href="/post/create" class="btn">发布文章</a>
{/if}

{volist name="posts" id="post"}
    <div class="post">
        <h2><a href="/post/show/{$post.id}">{$post.title}</a></h2>
        <div class="post-meta">
            作者: {$post.user.username} | 发布时间: {$post.created_at} | 评论数: {$post.comments|count}
        </div>
        <p>{$post.content|mb_substr=0,200}...</p>
        <a href="/post/show/{$post.id}" class="btn">阅读全文</a>
    </div>
{/volist}
{/block}
```

### 6.3 创建文章详情视图

创建 `app/view/post/show.html`：

```html
{extend name="layout" /}

{block name="title"}{$post.title}{/block}

{block name="content"}
<div class="post">
    <h1>{$post.title}</h1>
    <div class="post-meta">
        作者: {$post.user.username} | 发布时间: {$post.created_at}
    </div>
    <div style="margin: 1rem 0;">
        {$post.content|raw}
    </div>
</div>

<h2>评论</h2>

{if condition="session('user_id')"}
    <form id="commentForm">
        <input type="hidden" name="post_id" value="{$post.id}">
        <textarea name="content" rows="3" placeholder="写下你的评论..."></textarea>
        <button type="submit" class="btn">发表评论</button>
    </form>
{else}
    <p>请先 <a href="/user/login">登录</a> 后发表评论</p>
{/if}

<div id="comments">
    {volist name="post.comments" id="comment"}
        <div class="post" style="margin: 0.5rem 0;">
            <div class="post-meta">
                {$comment.user.username} | {$comment.created_at}
            </div>
            <p>{$comment.content}</p>
        </div>
    {/volist}
</div>

<script>
document.getElementById('commentForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/post/addComment/{$post.id}', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (result.code === 200) {
        location.reload();
    } else {
        alert(result.message);
    }
});
</script>
{/block}
```

### 6.4 创建发布文章视图

创建 `app/view/post/create.html`：

```html
{extend name="layout" /}

{block name="title"}发布文章{/block}

{block name="content"}
<h1>发布文章</h1>
<form id="postForm">
    <input type="text" name="title" placeholder="文章标题" required>
    <textarea name="content" rows="10" placeholder="文章内容" required></textarea>
    <button type="submit" class="btn">发布</button>
</form>

<script>
document.getElementById('postForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/post/store', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (result.code === 200) {
        alert('发布成功');
        window.location.href = '/post/index';
    } else {
        alert(result.message);
    }
});
</script>
{/block}
```

### 6.5 创建登录视图

创建 `app/view/user/login.html`：

```html
{extend name="layout" /}

{block name="title"}登录{/block}

{block name="content"}
<h1>用户登录</h1>
<form id="loginForm">
    <input type="text" name="username" placeholder="用户名" required>
    <input type="password" name="password" placeholder="密码" required>
    <button type="submit" class="btn">登录</button>
</form>
<p>还没有账号？<a href="/user/register">立即注册</a></p>

<script>
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/user/doLogin', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (result.code === 200) {
        alert('登录成功');
        window.location.href = '/post/index';
    } else {
        alert(result.message);
    }
});
</script>
{/block}
```

### 6.6 创建注册视图

创建 `app/view/user/register.html`：

```html
{extend name="layout" /}

{block name="title"}注册{/block}

{block name="content"}
<h1>用户注册</h1>
<form id="registerForm">
    <input type="text" name="username" placeholder="用户名" required>
    <input type="email" name="email" placeholder="邮箱" required>
    <input type="password" name="password" placeholder="密码" required>
    <button type="submit" class="btn">注册</button>
</form>
<p>已有账号？<a href="/user/login">立即登录</a></p>

<script>
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/user/doRegister', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    if (result.code === 200) {
        alert('注册成功');
        window.location.href = '/post/index';
    } else {
        alert(result.message);
    }
});
</script>
{/block}
```

## 第七步：配置路由

编辑 `route/app.php`：

```php
<?php
use think\facade\Route;

// 首页
Route::get('/', 'Post/index');

// 用户路由
Route::get('user/login', 'User/login');
Route::post('user/doLogin', 'User/doLogin');
Route::get('user/register', 'User/register');
Route::post('user/doRegister', 'User/doRegister');
Route::get('user/logout', 'User/logout');

// 文章路由
Route::get('post/index', 'Post/index');
Route::get('post/show/:id', 'Post/show');
Route::get('post/create', 'Post/create');
Route::post('post/store', 'Post/store');
Route::post('post/addComment/:postId', 'Post/addComment');
?>
```

## 第八步：配置应用

### 8.1 配置 Session

编辑 `config/app.php`，确保 Session 已启用：

```php
<?php
return [
    'app_name' => '博客系统',
    'app_debug' => true,
    'default_timezone' => 'Asia/Shanghai',
];
?>
```

### 8.2 设置权限

确保 `runtime` 目录可写：

```bash
chmod -R 777 runtime
```

## 第九步：启动服务

### 9.1 使用 ThinkPHP 内置服务器

```bash
php think run
```

服务器将在 `http://localhost:8000` 启动。

### 9.2 使用 PHP 内置服务器

```bash
php -S localhost:8000 -t public
```

## 第十步：访问应用

### 10.1 访问首页

在浏览器中打开：

```
http://localhost:8000
```

### 10.2 访问文章列表

```
http://localhost:8000/post/index
```

### 10.3 注册用户

访问注册页面：

```
http://localhost:8000/user/register
```

填写用户名、邮箱和密码，点击注册。

### 10.4 登录

访问登录页面：

```
http://localhost:8000/user/login
```

使用注册的账号登录。

### 10.5 发布文章

登录后，访问：

```
http://localhost:8000/post/create
```

填写文章标题和内容，点击发布。

### 10.6 查看文章详情

点击文章列表中的文章标题，查看详情并发表评论。

## 常见问题

### 问题 1：数据库连接失败

**解决方案：**
- 检查 `config/database.php` 中的数据库配置
- 确保数据库服务已启动
- 验证用户名和密码是否正确

### 问题 2：Session 不工作

**解决方案：**
- 检查 `runtime` 目录权限
- 确保 Session 配置正确

### 问题 3：页面 404

**解决方案：**
- 检查路由配置是否正确
- 确保 URL 重写已启用（如果使用 Apache）
- 检查控制器和方法是否存在

## 下一步

- 学习 API 开发 → [实战：API 开发](/thinkphp/practice-api)
- 学习后台管理 → [实战：后台管理](/thinkphp/practice-admin)
- 深入学习 → [PHP 进阶](/advanced/design-patterns)
